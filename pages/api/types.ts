import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';
import { PostType, PostTypeAPI } from '../../interfaces/api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PostTypeAPI>,
) {
    try {
        const types = (await db.query('SELECT * FROM post_type')) as PostType[];
        res.status(StatusCodes.OK).json({ types });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ types: [] });
    }
}
