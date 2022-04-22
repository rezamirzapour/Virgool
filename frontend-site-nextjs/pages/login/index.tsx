import AuthLayout from "src/layouts/auth";
import { Input, Button } from "src/components";
import { useForm, FormProvider } from "react-hook-form";
import { LoginSchema } from "src/validations";
import { useLoginMutation } from "src/hooks";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

const defaultValues = new LoginSchema();

export default function Login() {
  const methods = useForm({
    defaultValues,
    resolver: classValidatorResolver(LoginSchema),
  });
  const { isLoading: isSubmitting, mutate } = useLoginMutation();
  const onSubmit = async (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <AuthLayout title="ورود">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            id="register-and-login-wrapper"
            className="p-8 border border-gray-40 rounded-md"
          >
            <div className="text-center mt-9">
              <h1 className="text-lg font-medium ml-1 text-gray-600">ورود</h1>
            </div>
            <Input
              label="ایمیل"
              name="email"
              align="left"
              placeholder="example@gmail.com"
            />
            <Input
              label="رمز عبور"
              name="password"
              align="left"
              type="password"
            />
            <div className="mt-4">
              <div className="flex items-center relative">
                <input id="remember_me_checkbox" type="checkbox" />
                <label
                  htmlFor="remember_me_checkbox"
                  className="text-base font-normal mr-2 text-gray-80 leading-8"
                >
                  مرا به‌خاطر بسپار
                </label>
              </div>
              <span className="text-gray-80 text-xs font-medium mr-5 leading-5">
                اگر از دستگاه عمومی استفاده می کنید تیک را بردارید
              </span>
            </div>
            <Button color="primary" loading={isSubmitting} type="submit">
              ورود
            </Button>
            <p className="text-xs font-medium text-gray-80 leading-5 mt-4">
              با ورود و ثبت نام در سایت شما شرایط و قوانین استفاده از سرویس های
              سایت و قوانین حریم خصوصی آن را می پذیرید
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
