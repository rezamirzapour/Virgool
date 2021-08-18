import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function useAuth() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const isAuthenticated = () => {
        const accessToken = localStorage.getItem('access_token')
        return Boolean(accessToken);
    }

    const getLoginedUser = () => user

    const logout = () => {
        localStorage.removeItem("access_token")
        dispatch({ type: "auth/logout" })
        router.push("/login")
    }

    useEffect(() => {
        if (!user && isAuthenticated())
            dispatch({ type: "FETCH_PROFILE_SAGA", payload: { enqueueSnackbar } })
    }, [user])

    return { isAuthenticated, getLoginedUser, logout } as const
}