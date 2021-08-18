import { ReactNode } from 'react';
import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';

interface IProps {
    loading?: boolean;
    color?: 'primary' | 'secondary';
    type?: "button" | 'submit' | 'reset';
    children: ReactNode
}

export default function Button({ loading, color = "primary", type = 'button', children }: IProps) {
    return <button
        type={type}
        disabled={loading}
        className={clsx(
            "text-base font-medium py-2.5 w-full rounded flex justify-center items-center transition-1"
            , { "bg-gray-50 cursor-none": loading }
            , { "text-gray-10 bg-blue-50 hover:bg-blue-40": !loading && color == "primary" }
            , { "text-gray-80 bg-yellow-50 hover:bg-yellow-30": !loading && color == "secondary" }
        )}>
        {children} {loading && <CircularProgress size={20} style={{ marginRight: '.25em', color: 'white' }} />}
    </button>
}