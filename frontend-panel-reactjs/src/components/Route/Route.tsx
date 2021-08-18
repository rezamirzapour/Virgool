import { Route as ReactRoute } from 'react-router-dom';
import { RouteType } from 'routes';
import { useRouter } from 'hooks';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

export default function RouteWrapper(props: RouteType) {
    const [loading, setLoading] = useState(true)
    const mounted = useRef<boolean>(false)
    const { navigate } = useRouter()
    const { auth, name, show, title, ...rest } = props
    const dispatch = useDispatch()
    useEffect(() => {
        mounted.current = true
        if (mounted) {
            const token = localStorage.getItem("access_token")
            if (props.auth && !token) {
                dispatch({ type: 'auth/logout' })
                navigate("auth.login")
            }

            else if (props.auth && token)
                mounted && setLoading(false)
        }
        return () => {
            setLoading(true)
            mounted.current = false
        }
    }, [])

    return loading ? <>Loading...</> : <ReactRoute {...rest} />
}