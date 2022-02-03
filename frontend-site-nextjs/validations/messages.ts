export const messages = {
    required: (label: string) => `${label} نباید خالی باشد`,
    email: (label = 'ایمیل') => `${label} را صحیح وارد نمایید`,
    phone: (label = 'شماره همراه') => `${label} را صحبح وارد نمایید`,
    min: (label: string, value: number) => `حداقل طول ${label} باید ${value} باشد`,
    max: (label: string, value: number) => `حداکثر طول ${label} باید ${value} باشد`,
} as const

export default messages;