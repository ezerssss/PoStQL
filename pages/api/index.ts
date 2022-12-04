import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { POSTS_PER_PAGE } from '../../constants/page';
import db from '../../db/db';
import { Post } from '../../interfaces/post';

async function get(
    req: NextApiRequest,
    res: NextApiResponse<{ posts: Post[] }>,
) {
    try {
        const { page, type, order = 'ASC' } = req.query;
        let offset = 0;
        if (page && typeof page === 'string') {
            offset = (parseInt(page) - 1) * POSTS_PER_PAGE;
        }

        let types = [''];
        if (type && typeof type == 'string') {
            types = type.split(',');
        }

        const response = (await db.query(
            `SELECT content, date, name AS type FROM posts JOIN post_type USING (post_type_id) WHERE name IN (?) ORDER BY date ${order} LIMIT ?, ${POSTS_PER_PAGE}`,
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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ posts: Post[] }>,
) {
    if (req.method === 'GET') await get(req, res);
}
