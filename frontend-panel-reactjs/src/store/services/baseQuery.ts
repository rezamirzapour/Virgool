import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { AxiosError, AxiosResponse } from 'axios'

type REQUEST_TYPE = 'FIND_ALL' | 'PAGINATE' | 'FIND_ONE' | 'CREATE' | 'DELETE' | 'UPDATE'

const baseQuery = (): BaseQueryFn<{ httpService: () => Promise<AxiosResponse<any>>, type: REQUEST_TYPE }> => async ({ httpService, type }) => {
    try {
        const response = await httpService()
        switch (type) {
            case 'FIND_ALL':
                return { data: response.data?.result ?? [] }
            case 'FIND_ONE':
                return { data: response.data?.result ?? {} }
            default:
                return { data: null }
        }

    } catch (error) {
        const err = error as AxiosError
        console.log(error)
        return { error: { status: err.response?.status, data: err.response?.data } }
    }
}
export default baseQuery()