import AuthLayout from 'layouts/auth';
import { ShouldNotAuthWrapper, Input, Button } from 'components';
import { useForm } from 'react-hook-form';
import { LoginDto } from 'services';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const defaultValues: LoginDto = {
    email: "",
    password: ""
}

export default function Login() {
    const methods = useForm({ defaultValues })
    const { enqueueSnackbar } = useSnackbar()
    const { loginLoading } = useSelector((state: any) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()

    const onSubmit = async (data: LoginDto) => {
        dispatch({ type: 'LOGIN_SAGA', payload: { data, enqueueSnackbar, router } })
    }

    return (
        <ShouldNotAuthWrapper>
            <AuthLayout title="ورود">
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div id="register-and-login-wrapper" className="p-8 border border-gray-40 rounded-md">
                        <div className="text-center mt-9">
                            <h1 className="text-lg font-medium ml-1 text-gray-80">ورود</h1>
                        </div>
                        <Input label="ایمیل" name="email" align="left" placeholder="example@gmail.com" methods={methods} />
                        <Input label="رمز عبور" name="password" align="left" type="password" methods={methods} />
                        <div className="mt-4">
                            <div className="flex items-center relative">
                                <input id="remember_me_checkbox" type="checkbox" />
                                <label htmlFor="remember_me_checkbox" className="text-base font-normal mr-2 text-gray-80 leading-8">مرا
                                    به‌خاطر
                                    بسپار</label>
                            </div>
                            <span className="text-gray-80 text-xs font-medium mr-5 leading-5">اگر از دستگاه عمومی استفاده می کنید
                                تیک را بردارید</span>
                        </div>
                        <Button color="primary" loading={loginLoading} type="submit">
                            ورود
                        </Button>
                        <p className="text-xs font-medium text-gray-80 leading-5 mt-4">
                            با ورود و ثبت نام در سایت شما شرایط و قوانین
                            استفاده از سرویس های سایت و قوانین حریم خصوصی آن را می پذیرید
                        </p>
                    </div>
                </form>
            </AuthLayout>
        </ShouldNotAuthWrapper>
    )
}