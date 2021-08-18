import { createSlice } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import { RolesServices, PermissionsServices, CategoriesServices } from 'services';

interface EntitiesState {
    roles: {
        id: number,
        title: string,
        label: string;
    }[] | null,
    permissions: {
        id: number,
        title: string
    }[] | null,
    categories: {
        id: number,
        title: string
    }[] | null
}

const initialState: EntitiesState = {
    roles: null,
    permissions: null,
    categories: null
}
const entitiesSlice = createSlice({
    name: "entities",
    initialState,
    reducers: {
        fetchRoles: (state, action) => {
            state.roles = action.payload
        },
        fetchPermissions: (state, action) => {
            state.permissions = action.payload
        },
        fetchCategories: (state, action) => {
            state.categories = action.payload
        },
    }
});

const { fetchRoles, fetchPermissions, fetchCategories } = entitiesSlice.actions;

export function* fetchRolesSaga(): Generator<any, any, any> {
    try {
        const res = yield call(() => RolesServices.findAll({ paginate: false }))
        yield put(fetchRoles(res.data.result))
    } catch (error) {
        console.log(error)
    }
}

export function* fetchPermissoinsSaga(): Generator<any, any, any> {
    try {
        const res = yield call(() => PermissionsServices.findAll({ paginate: false }))
        yield put(fetchPermissions(res.data.result))
    } catch (error) {
        console.log(error)
    }
}

export function* fetchCategoriesSaga(): Generator<any, any, any> {
    try {
        const res = yield call(() => CategoriesServices.findAll({ paginate: false }))
        yield put(fetchCategories(res.data.result))
    } catch (error) {
        console.log(error)
    }
}

export default entitiesSlice.reducer;