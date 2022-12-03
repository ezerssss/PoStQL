import Head from 'next/head';

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
            <h1 className="text-xl">Hello world</h1>z
        </div>
    );
}
