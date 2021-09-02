import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'hooks'

export default function useAuth() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const { navigate } = useRouter()

    const isAuthenticated = () => {
        const accessToken = localStorage.getItem('access_token')
        return Boolean(accessToken);
    }

    const getLoginedUser = () => user;

    const logout = () => {
        localStorage.removeItem("access_token")
        dispatch({ type: "auth/logout" })
        navigate("auth.login")
    }

    useEffect(() => {
        if (!user && isAuthenticated())
            dispatch({ type: "FETCH_PROFILE_SAGA" })
    }, [user])

    return { isAuthenticated, getLoginedUser, logout } as const;
}