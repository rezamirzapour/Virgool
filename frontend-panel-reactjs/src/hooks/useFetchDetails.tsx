import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';

export default function useFetchDetails<T>() {
    const { enqueueSnackbar } = useSnackbar();
    const [response, setResponse] = useState<T>({} as T);
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async (fetcherFn: () => Promise<AxiosResponse<T>>) => {
        try {
            const res = await fetcherFn();
            setResponse(res.data)
        } catch (error) {
            enqueueSnackbar("خطایی وجود دارد", { variant: 'error' })
        } finally {
            setLoading(false)
        }
    }
    return { fetchData, loading, response } as const;
}