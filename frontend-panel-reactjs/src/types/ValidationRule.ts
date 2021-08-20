import { ControllerProps } from 'react-hook-form';
export type ValidationRule<T = string> =
    Partial<
        Record<T extends string ? string : keyof T, ControllerProps<'input'>['rules']>
    >