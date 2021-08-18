import Head from 'next/head';
export default function AuthLayout({ title, children }) {
    return (<>
        <Head>
            <title>{title}</title>
        </Head>
        <div id="auth-page" className="flex justify-center items-center h-screen w-full global__rtl">
            {children}
        </div>
    </>
    )
}