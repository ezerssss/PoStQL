import Head from 'next/head';
import { CreatePost } from '../components/CreatePost';
import { PostList } from '../components/PostList';
export default function Home() {
    return (
        <div>
            <Head>
                <title>PoStQL</title>
                <meta
                    name="description"
                    content="Simple Post Feed powered by MySQL"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CreatePost />
            <PostList />
        </div>
    );
}
