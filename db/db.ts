import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.DB_HOST,
        port: 3306,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
});

export default db;
