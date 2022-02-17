import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import classnames from "classnames";
interface IProps extends InputHTMLAttributes<any> {
  label: string;
  name: string;
  align?: "left" | "right";
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export default function Input({
  label,
  name,
  align,
  inputClassName,
  labelClassName,
  errorClassName,
  ...rest
}: IProps) {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div className="mt-4">
      <label
        htmlFor={`input-${name}`}
        className={classnames(
          "text-base font-normal mobile-input leading-8 text-gray-600",
          labelClassName
        )}
      >
        {label}
      </label>
      <input
        id={`input-${name}`}
        name={name}
        className={classnames(
          `text-base placeholder:text-gray-300 font-normal border rounded px-4 py-2.5 w-full mt-1${
            align === "left" ? "text-left" : "text-right"
          } ${
            errors?.[name]?.message
              ? "border-red-300 focus:outline-red-400"
              : "border-gray-300 focus:outline-blue-400"
          }`,
          inputClassName
        )}
        {...rest}
        {...register(name)}
      />
      <p className={classnames("text-red-400 text-xs mt-1", errorClassName)}>
        {errors?.[name]?.message}
      </p>
    </div>
  );
}
