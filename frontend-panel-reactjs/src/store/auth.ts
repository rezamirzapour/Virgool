import { createSlice } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects';
import { AuthServices, MeServices, LoginDto } from 'services';
import { ProviderContext } from 'notistack';
import { History } from 'history';

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
        hsitory: History
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

export function* loginSaga(action: any): Generator<any, any, any> {
    try {
        yield put(startLogin())
        const res: any = yield call(() => AuthServices.login(action.payload.data))
        const accessToken = res.data.access_token;
        localStorage.setItem("access_token", accessToken);
        action.payload.enqueueSnackbar("با موفقیت وارد شدید", { variant: 'success' })
        yield put(setToken(accessToken))
        action.payload.hsitory.push("/home")
    } catch {
        action.payload.enqueueSnackbar("خطایی وجود دارد", { variant: 'error' })
    } finally {
        yield put(finalLogin())
    }
}

export function* fetchProfileSaga(action: any): Generator<any, any, any> {
    try {
        yield put(startFetchProfile())
        const res: any = yield call(() => MeServices.getProfile())
        yield put(successFetchProfile(res.data))
    } catch {
        yield action.payload.enqueueSnackbar('حطایی وجود دارد', { variant: 'error' })
    } finally {
        yield put(finalFetchProfile())
    }
}

export default authSlice.reducer
