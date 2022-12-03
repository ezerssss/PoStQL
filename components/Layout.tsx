import React from 'react';

interface PropsInterface {
    children: JSX.Element | JSX.Element[];
}

function Layout(props: PropsInterface) {
    const { children } = props;

    return (
        <div className="px-5 sm:px-20 md:px-32 xl:px-72 py-10">
            <h1 className="text-5xl my-5">PoStQL test</h1>
            <main>{children}</main>
        </div>
    );
}

export default Layout;
