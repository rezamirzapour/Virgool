import { createSlice } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { AuthServices, MeServices, LoginDto } from 'services';
import { NextRouter } from 'next/router';
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
        yield toast("با موفقیت وارد شدید", { variant: 'success' })
        yield put(setToken(accessToken))
        yield put({ type: 'AFTER_LOGIN_SAGA' })
        action.payload.router.push("/")
    } catch (error) {
        toast.error(error?.response?.message ?? "خطایی وجود دارد")
    } finally {
        yield put(finalLogin())
    }
}

export function* fetchProfileSaga() {
    try {
        yield put(startFetchProfile())
        const res = yield call(() => MeServices.getProfile())
        yield put(successFetchProfile(res.data))
    } catch (error) {
        yield toast.error(error?.response?.message ?? 'حطایی وجود دارد')
    } finally {
        yield put(finalFetchProfile())
    }
}

export default authSlice.reducer;
