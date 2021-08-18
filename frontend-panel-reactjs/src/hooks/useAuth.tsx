import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useRouter } from 'hooks'

export default function useAuth() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const { enqueueSnackbar } = useSnackbar()
    const { navigate } = useRouter()
    const [trigered, setTrigered] = useState(false)
    const isAuthenticated = () => {
        const accessToken = localStorage.getItem('access_token')
        return Boolean(accessToken);
    }

    const getLoginedUser = () => {
        if (!user && isAuthenticated() && !trigered) {
            dispatch({ type: "FETCH_PROFILE_SAGA", payload: { enqueueSnackbar } })
            setTrigered(true)
        }
        return user;
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        dispatch({ type: "auth/logout" })
        navigate("auth.login")
    }

    return { isAuthenticated, getLoginedUser, logout } as const;
}