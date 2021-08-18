import { createSlice } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { AuthServices, MeServices, LoginDto } from 'services';
import { ProviderContext } from 'notistack';
import { NextRouter } from 'next/router';

interface InitialState {
    access_token: null | string,
    loginLoading: boolean;
    fetchProfileLoading: boolean;
    auth: boolean;
    user: null | {
        email: string;
        avatar: null | string;
        firstName: string;
        lastName: string;
    }
}

interface IFetchProfileSagaAction {
    payload: { enqueueSnackbar: ProviderContext['enqueueSnackbar'] },
}

interface ILoginSagaAction {
    payload: {
        enqueueSnackbar: ProviderContext['enqueueSnackbar'],
        data: LoginDto,
        router: NextRouter
    },
}

const initialState: InitialState = {
    access_token: null,
    loginLoading: false,
    auth: false,
    fetchProfileLoading: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLogin: (state) => {
            state.loginLoading = true
        },
        setToken: (state, actoin) => {
            state.access_token = actoin.payload;
        },
        finalLogin: (state) => {
            state.loginLoading = false
        },
        startFetchProfile: (state) => {
            state.fetchProfileLoading = false;
        },
        successFetchProfile: (state, action) => {
            state.user = action.payload;
        },
        finalFetchProfile: (state) => {
            state.fetchProfileLoading = false;
        },
    }
});

export const { startFetchProfile, successFetchProfile, finalFetchProfile, startLogin, setToken, finalLogin } = authSlice.actions;

export function* loginSaga(action: ILoginSagaAction) {
    try {
        yield put(startLogin())
        const res = yield call(() => AuthServices.login(action.payload.data))
        const accessToken = res.data.access_token;
        yield localStorage.setItem("access_token", accessToken);
        yield action.payload.enqueueSnackbar("با موفقیت وارد شدید", { variant: 'success' })
        yield put(setToken(accessToken))
        yield put({ type: 'AFTER_LOGIN_SAGA', payload: { enqueueSnackbar: action.payload.enqueueSnackbar } })
        action.payload.router.push("/home")
    } catch (error) {
        action.payload.enqueueSnackbar(error?.response?.message ?? "خطایی وجود دارد", { variant: 'error' })
    } finally {
        yield put(finalLogin())
    }
}

export function* fetchProfileSaga(action: IFetchProfileSagaAction) {
    try {
        yield put(startFetchProfile())
        const res = yield call(() => MeServices.getProfile())
        yield put(successFetchProfile(res.data))
    } catch (error) {
        yield action.payload.enqueueSnackbar(error?.response?.message ?? 'حطایی وجود دارد', { variant: 'error' })
    } finally {
        yield put(finalFetchProfile())
    }
}

export default authSlice.reducer;
