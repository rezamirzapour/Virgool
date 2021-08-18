import { UseFormReturn } from 'react-hook-form';

interface IProps {
    label: string;
    name: string;
    placeholder?: string;
    align?: 'left' | 'right';
    methods: UseFormReturn<any>,
    type?: string,
    required?: boolean
}

export default function Input({ label, name, placeholder, align, methods, type, required = false }: IProps) {
    return (
        <div className="mt-4">
            <label htmlFor={`input-${name}`} className="text-base font-normal mobile-input leading-8 text-gray-80">
                {label}</label>
            <input id={`input-${name}`}
                name={name}
                type={type}
                placeholder={placeholder ?? ""}
                className={`text-base placeholder-gray-60 font-normal border border-gray-50 rounded px-4 py-2.5 w-full text-${align === 'left' ? 'left' : 'right'} mt-1`}
                {...methods.register(name, {
                    required,
                })}
            />
        </div>
    )
}