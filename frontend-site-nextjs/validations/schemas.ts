import "reflect-metadata";
import { IsEmail, MinLength, IsNotEmpty } from "class-validator";
import msg from "./messages";

export class LoginSchema {
  @IsEmail({ message: msg.email() })
  @IsNotEmpty({ message: msg.required("ایمیل") })
  email: string;

  @MinLength(8, { message: msg.min("رمز عبور", 8) })
  @IsNotEmpty({ message: msg.required("رمز عبور") })
  password: string;
}
