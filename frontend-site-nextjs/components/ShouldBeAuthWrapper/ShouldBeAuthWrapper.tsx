import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks';

export default function ShouldBeAuthWrapper({ children }) {
    const [loading, setLoading] = useState<boolean>(true)
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated())
            router.push("/auth/login")
        else setLoading(false)
    }, [])

    if (loading)
        return <div className="flex items-center justify-center h-screen w-full">
            <p className="text-3xl">درحال بارگداری...</p>
        </div>
    return React.Children.only(children)
}