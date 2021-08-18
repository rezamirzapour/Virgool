import React, { useMemo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { formValidator } from 'utils'
import { Star as StarIcon } from '@material-ui/icons'


interface TextFieldProps {
  name: string,
  label?: string,
  placeholder?: string,
  rules?: any[],
  type?: string,
  textarea?: boolean,
  rows?: number,
  defaultValue?: any,
  onChange?: (ev: any) => void,
  methods: any,
  margin?: string;
  required?: boolean;
  id?: string;
  autoComplete?: string;
}
export default function CustomTextField({ name, label, placeholder, methods, rules, type = "text", textarea = false, rows = 5, defaultValue, onChange, margin, id, ...props }: TextFieldProps) {
  const [value, setValue] = useState(defaultValue)

  const getRules = useMemo(() => {
    const validate = formValidator(rules as any[], label ?? '')
    return validate ? { validate } : {}
  }, [rules, label])

  const onInputChange = useCallback((ev) => {
    ev.persist?.()
    const val = ev.target.value
    setValue(val)
    onChange?.(ev)
  }, [onChange, setValue])



  const classes = useStyles()
  return <div>
    <label>{rules?.includes('required') && <StarIcon className={classes.requiredIcon} />}{label}</label>
    {
      textarea
        ? <textarea rows={rows} name={name} placeholder={placeholder} className={clsx(classes.input, "w-full p-2 mt-1 border rounded focus:outline-none focus:ring")} value={value} ref={methods.register(getRules)} onChange={onInputChange} autoComplete="off" {...props} />
        : <input name={name} placeholder={placeholder} type={type} className={clsx(classes.input, "w-full p-2 mt-1 border rounded focus:outline-none focus:ring")} ref={methods.register(getRules)} onChange={onInputChange} autoComplete="off" {...props} />
    }
    <p className={clsx("text-red-500 text-xs mt-1 mb-3", classes.errorMessage)}>{methods?.errors?.[name]?.message}</p>
  </div>
}

const useStyles = makeStyles(() => ({
  input: {
    '&:focus': {
      border: '1px solid #e5e7eb'
    },
  },
  requiredIcon: {
    color: 'red', width: '.3em', height: '.3em', marginRight: '.2em'
  },
  errorMessage: {
    minHeight: '16px'
  }
}))