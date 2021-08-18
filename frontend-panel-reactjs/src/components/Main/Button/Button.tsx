import React from 'react'
import { Button as MaterialButton, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
export default function Button({ children, primary, secondary, ...rest }: any) {
    const classes = useStyle()
    return <MaterialButton variant="contained" className={clsx('text-white', {
        [classes.primary]: primary,
        [classes.secondary]: secondary
    })} {...rest}>{children}</MaterialButton>
}

const useStyle = makeStyles(() => ({
    primary: {
        backgroundColor: '#107abe',
    },
    secondary: {
        backgroundColor: 'red',
    },
}))