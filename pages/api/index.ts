import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { POSTS_PER_PAGE } from '../../constants/page';
import db from '../../db/db';
import { GetAPI, PostAPI, PostType } from '../../interfaces/api';
import { Post } from '../../interfaces/post';

async function get(req: NextApiRequest, res: NextApiResponse<GetAPI>) {
    try {
        const { page, type, order = 'ASC' } = req.query;
        let offset = 0;
        if (page && typeof page === 'string') {
            offset = (parseInt(page) - 1) * POSTS_PER_PAGE;
        }

        let types = [''];
        let hasTypes = false;
        if (type && typeof type == 'string') {
            types = type.split(',');
            hasTypes = true;
        }

        const response = (await db.query(
            `SELECT content, date, name AS type FROM posts LEFT JOIN post_type USING (post_type_id) WHERE name ${
                !hasTypes ? 'NOT' : ''
            } IN (?) ORDER BY date ${order} LIMIT ?, ${POSTS_PER_PAGE}`,
            [types, offset],
        )) as Post[];
        await db.end();

        const posts = response.map(({ content, type, date }) => ({
            content,
            type,
            date,
        }));

        res.status(StatusCodes.OK).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ posts: [] });
    }
}

async function post(req: NextApiRequest, res: NextApiResponse<PostAPI>) {
    try {
        let { post_type_id, content } = req.body;

        if (!post_type_id || !content) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: 'Missing params (post_type_id, content)' });
        }

        if (typeof content === 'string') {
            content = content.slice(0, 2000);
        }

        const result = (await db.query(
            'SELECT post_type_id FROM post_type pt WHERE pt.post_type_id = ?',
            [post_type_id],
        )) as PostType[];
        if (!result.length) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: 'Post type id not found.',
            });
        }

        await db.query(
            'INSERT INTO posts (post_type_id, content) VALUES (?, ?)',
            [post_type_id, content],
        );

        res.status(StatusCodes.CREATED).json({ msg: 'Successfully posted' });
    } catch (error) {
        console.error(error);
        let msg = 'Something went wrong';
        if (error instanceof Error) {
            msg = error.message;
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetAPI | PostAPI>,
) {
    if (req.method === 'GET') await get(req, res);
    else if (req.method === 'POST') await post(req, res);
}
