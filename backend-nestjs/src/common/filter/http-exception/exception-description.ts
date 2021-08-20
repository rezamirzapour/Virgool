/* eslint-disable prettier/prettier */
export enum ExceptionDescription {
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
    NOT_ACCEPTABLE = 'Not Acceptable',
    REQUEST_TIMEOUT = 'Request Timeout',
    CONFLICT = 'Conflict',
    GONE = 'Gone',
    PRECONDITION_FAILED = 'Precondition Failed',
    PAYLOAD_TOO_LARGE = 'Payload Too Large',
    UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type',
    I_AM_A_TEAPOT = "I'm a teapot",
    MISDIRECTED = 'Misdirected',
    UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    NOT_IMPLEMENTED = 'Not Implemented',
    BAD_GATEWAY = 'Bad Gateway',
    SERVICE_UNAVAILABLE = 'Service Unavailable',
    GATEWAY_TIMEOUT = 'Gateway Timeout',
    HTTP_VERSION_NOT_SUPPORTED = 'HTTP Version Not Supported'
}


export enum ExceptionDescription_FA {
    BAD_REQUEST = 'درخواست اشتباه',
    UNAUTHORIZED = 'عدم احراز هویت',
    FORBIDDEN = 'ممنوع',
    NOT_FOUND = 'چیزی یافت نشد',
    METHOD_NOT_ALLOWED = 'متد HTTP موردنظر مجاز نمی‌باشد',
    NOT_ACCEPTABLE = 'غبرقایل پذیرش',
    REQUEST_TIMEOUT = 'زمان درخواست بیش از حد طولانی شد',
    CONFLICT = 'نداخل',
    GONE = 'رفته',
    PRECONDITION_FAILED = 'شرط اولیه برقرار نشد',
    PAYLOAD_TOO_LARGE = 'حجم محتوا بیش از حد زیاد است',
    UNSUPPORTED_MEDIA_TYPE = 'نوع محتوا پشتیبانی نمی‌شود',
    I_AM_A_TEAPOT = 'من یک قوری ام',
    MISDIRECTED = 'دایرکت اشتباه',
    UNPROCESSABLE_ENTITY = 'ورودی قایل پردازش نمی‌باشد',
    INTERNAL_SERVER_ERROR = 'مشکل داخلی سرور',
    NOT_IMPLEMENTED = 'اجرا نشد',
    BAD_GATEWAY = 'درگاه غیرمجاز',
    SERVICE_UNAVAILABLE = 'سیستم قادر به سرویس دهی نمی‌باشد',
    GATEWAY_TIMEOUT = 'وقفه درگاه',
    HTTP_VERSION_NOT_SUPPORTED = 'نسخه HTTP پشتیبانی نمی‌شود',
}
