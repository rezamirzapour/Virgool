import { useState, useEffect, ReactElement, Children, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks';

interface IProps {
    auth?: 'true' | 'false',
    children: ReactElement
}

export default function AuthWrapper({ auth, children }: IProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const { isAuthenticated } = useAuth()
    const mounted = useRef<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        mounted.current = true
        const authenticated = isAuthenticated()
        if (auth === 'true' && !authenticated)
            router.push("/auth/login")
        else if (auth === 'false' && authenticated)
            router.push("/")

        mounted.current && setLoading(false)
        return () => { mounted.current = false }
    }, [])

    if (loading)
        return <div className="flex items-center justify-center h-screen w-full">
            <p className="text-3xl">درحال بارگداری...</p>
        </div>
    return Children.only(children)
}