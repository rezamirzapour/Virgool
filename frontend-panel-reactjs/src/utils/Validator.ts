interface ValidatoinMessages {
    required: string | ((label: string, options?: any) => any),
    isEmail: string | ((label: string, options?: any) => any),
    isNumeric: string | ((label: string, options?: any) => any),
    isInteger: string | ((label: string, options?: any) => any),
    isEnglishCharsOrNumbers: string | ((label: string, options?: any) => any),
    maxLength: string | ((label: string, options?: any) => any),
    minLength: string | ((label: string, options?: any) => any),
    maxValue: string | ((label: string, options?: any) => any),
    minValue: string | ((label: string, options?: any) => any),
}
const validationMessages: ValidatoinMessages = {
    required: 'فیلد :label اجباری است',
    isEmail: 'فرمت وارد شده باید به صورت ایمیل باشد',
    isNumeric: 'فیلد :label باید عددی باشد',
    isInteger: 'فیلد :label باید عدد صحیح باشد',
    isEnglishCharsOrNumbers: 'فیلد :label باید فقط شامل حروف یا اعداد انگلیسی باشد',
    maxLength: 'طول فیلد :label میتواند حداکثر :option باشد',
    minLength: 'طول فیلد :label باید حداقل :option باشد',
    maxValue: 'فیلد :label باید کمتر از :option باشد',
    minValue: 'فیلد :label باید بیشتز از :option باشد',
}

const validationExpress = {
    required: /([^\s])/,
    isEmail: /^(([^<>\[\]\.,:;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    isNumeric: /^\d+$/,
    isInteger: '^[0-9]$',
    isEnglishCharsOrNumbers: /^[A-Za-z][A-Za-z0-9]*$/,
}

const messageNormalizer = (label: string, message: string) => message.replace(':label', label)
const validate = (label: string, rule: keyof ValidatoinMessages, value: string, express: string) => {
    return !new RegExp(express).test(value)
        ? messageNormalizer(label, validationMessages[rule].toString())
        : true
}

const validate2 = (test = true, rule: keyof ValidatoinMessages, label: string, option: any) => {
    return !test
        ? (validationMessages[rule] as string).replace(':label', label).replace(':option', option)
        : true
}
const validator: ValidatoinMessages = {
    required: (label: string) => (value: string) => validate(label, 'required', value, validationExpress.required.toString()),
    isEmail: (label: string) => (value: string) => validate(label, 'isEmail', value, validationExpress.isEmail.toString()),
    isNumeric: (label: string) => (value: string) => validate(label, 'isNumeric', value, validationExpress.isNumeric.toString()),
    isInteger: (label: string) => (value: string) => validate(label, 'isInteger', value, validationExpress.isInteger.toString()),
    maxLength: (label: string, option: any) => (value: string) => validate2(value.length <= Number(option), 'maxLength', label, option),
    minLength: (label: string, option: any) => (value: string) => validate2(value.length >= Number(option), 'minLength', label, option),
    maxValue: (label: string, option: any) => (value: number) => validate2(value <= Number(option), 'maxValue', label, option),
    minValue: (label: string, option: any) => (value: number) => validate2(value >= Number(option), 'minValue', label, option),
    isEnglishCharsOrNumbers: (label: string) => (value: string) => validate(label, 'isEnglishCharsOrNumbers', value, validationExpress.isEnglishCharsOrNumbers.toString()),
}

const formValidator = (rules: keyof ValidatoinMessages[] | any[] | string, label: string) => {
    const validate: any = {} as any
    (rules as string[]).forEach?.(r => {
        if (r.includes('|')) {
            let [basicRule, option] = r.split('|')
            validate[basicRule] = (validator[basicRule as keyof ValidatoinMessages] as CallableFunction)(label, option)
        } else
            validate[r] = (validator[r as keyof ValidatoinMessages] as CallableFunction)(label)
    })
    return validate;
}


export { formValidator }