import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
interface IProps extends InputHTMLAttributes<any> {
  label: string;
  name: string;
  align?: "left" | "right";
}

export default function Input({ label, name, align, ...rest }: IProps) {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div className="mt-4">
      <label
        htmlFor={`input-${name}`}
        className="text-base font-normal mobile-input leading-8 text-gray-600"
      >
        {label}
      </label>
      <input
        id={`input-${name}`}
        name={name}
        className={`text-base placeholder-gray-300 font-normal border border-gray-300 rounded px-4 py-2.5 w-full text-${
          align === "left" ? "left" : "right"
        } mt-1`}
        {...rest}
        {...register(name)}
      />
      <p className="text-red-400">{errors?.[name]?.message}</p>
    </div>
  );
}
