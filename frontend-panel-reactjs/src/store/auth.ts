import { createSlice } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects';
import { AuthServices, MeServices } from 'services';
import type { LoginDto } from 'types'
import { History } from 'history';
import { toast } from 'material-react-toastify';
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

interface ILoginSagaAction {
    payload: {
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
        toast.success("با موفقیت وارد شدید")
        yield put(setToken(accessToken))
        action.payload.hsitory.push("/home")
    } catch {
        toast.error("خطایی وجود دارد")
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
        yield toast.error('حطایی وجود دارد')
    } finally {
        yield put(finalFetchProfile())
    }
}

export default authSlice.reducer
