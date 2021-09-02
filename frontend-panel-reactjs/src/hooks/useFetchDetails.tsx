import { useState } from 'react';
import { toast } from 'material-react-toastify'
import { AxiosResponse } from 'axios';

export default function useFetchDetails<T>() {
    const [response, setResponse] = useState<T>({} as T);
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async (fetcherFn: () => Promise<AxiosResponse<T>>) => {
        try {
            const res = await fetcherFn();
            setResponse(res.data)
        } catch (error) {
            toast.error("خطایی وجود دارد")
        } finally {
            setLoading(false)
        }
    }
    return { fetchData, loading, response } as const;
}