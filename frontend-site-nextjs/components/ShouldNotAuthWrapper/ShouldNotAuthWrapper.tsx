import { useState, useEffect, Children } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks';

export default function ShouldNotAuthWrapper({ children }) {
    const [loading, setLoading] = useState(true)
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated())
            router.push("/home")
        else setLoading(false)
    }, [])

    if (loading)
        return <div className="flex items-center justify-center h-screen w-full">
            <p className="text-3xl">درحال بارگداری...</p>
        </div>
    return Children.only(children)
}