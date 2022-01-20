import {createSlice} from '@reduxjs/toolkit';
import type {IPageInfo} from 'types';

const initialState: IPageInfo = {
    title: '',
    description: ''
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState,
    reducers: {
        setTitle(state, action) {
            return  {
                title: action.payload,
                description: ''
            }
        },
        setDescription(state, action) {
            return  {
                title: '',
                description: action.payload,
            }
        },
        setPageInfo(state, action) {
            return {
                title: action.payload.title,
                description: action.payload.description,
            }
        }, 
    }
})

export const { reducer, actions: {setTitle, setDescription, setPageInfo }} = pageInfoSlice
export default reducer;