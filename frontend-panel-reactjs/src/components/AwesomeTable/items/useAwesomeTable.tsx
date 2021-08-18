import { useState, useReducer } from 'react';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

interface IPagination {
    size: number,
    offset: number,
    page: number
}

const initialPagination: IPagination = {
    size: 10,
    offset: 0,
    page: 1
}

type IAction = {
    type: 'RESET',
} | {
    type: 'SET_PAGE',
    payload: number;
} | {
    type: 'SET_SIZE',
    payload: number
}

const paginationReducer = (state: IPagination = initialPagination, action: IAction): IPagination => {
    switch (action.type) {
        case 'RESET': return { ...state, offset: 0, page: 1 };
        case 'SET_PAGE': {
            const offset = state.size * action.payload
            return { ...state, offset, page: action.payload }
        }
        case 'SET_SIZE': {
            return { ...state, page: action.payload }
        }
        default: return state || initialPagination;
    }
}

export function useAwesomeTable<ResponseType>() {
    const [response, setResponse] = useState<ResponseType>({} as ResponseType)
    const [loading, setLoading] = useState<boolean>(true)
    const [pagination, dispatchPagination] = useReducer(paginationReducer, initialPagination)
    const { enqueueSnackbar } = useSnackbar()
    const resetPage = (): void => void dispatchPagination({ type: 'RESET' })
    const setPage = (page: number): void => void dispatchPagination({ type: 'SET_PAGE', payload: page })
    const setSize = (size: number): void => void dispatchPagination({ type: 'SET_SIZE', payload: size })
    const fetchData = async (fetcherFn: () => Promise<AxiosResponse<ResponseType>>): Promise<void> => {
        setLoading(true)
        try {
            const res = await fetcherFn();
            setResponse(res.data);

        }
        catch (error) {
            enqueueSnackbar("خطایی وجود دارد", { variant: 'error' });
        }
        finally {
            setLoading(false);
        }
    }

    return { response, fetchData, loading, pagination, resetPage, setPage, setSize } as const;
}