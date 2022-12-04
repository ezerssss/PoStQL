// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        const results = await db.query(
            'SELECT * FROM posts JOIN post_type USING (post_type_id)',
        );
        await db.end();
        console.log(results);
        res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ name: 'Ezra Magbanua' });
    }
}
