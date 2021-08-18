import { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { http } from '../utils';

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await http.get("categories");
    return {
        props: {
            categories: res.data.result
        }
    }
}

export default function Index(props) {
    useEffect(() => { console.log(props) }, [])
    return (
        <>
            <Head>
                <title>صفحه اصلی</title>
            </Head>
            {props.categories?.map?.(c => <div key={c.id}>
                <h6>{c.title}</h6>
                <span>{c.id}</span>
            </div>)}
        </>
    )
}