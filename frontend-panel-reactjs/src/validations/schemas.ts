import * as yup from "yup";
import msg from "./messages";

export const loginSchema = yup.object().shape({
  email: yup.string().email(msg.email()).required(msg.required("ایمیل")),
  password: yup
    .string()
    .min(8, msg.min("رمز عبور", 8))
    .required(msg.required("رمز عبور")),
});

export const createArticleSchema = yup.object().shape({
  title: yup.string().required(msg.required("عنوان")),
  content: yup.string(),
  categories: yup.array().of(yup.number()),
  thumbnail: yup.string(),
});

export const updateArticleSchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
  content: yup.string(),
  categories: yup.array().of(yup.number()),
  thumbnailId: yup.number(),
});

export const createCategorySchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
});

export const updateCategorySchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
});

export const createPermissoinSchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
});

export const updatePermissoinSchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
});

export const createRoleSchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
  label: yup
    .string()
    .required(msg.required("برچسب"))
    .max(128, msg.max("برچسب", 128)),
  permissions: yup.array().of(yup.number()),
});

export const updateRoleSchema = yup.object().shape({
  title: yup
    .string()
    .required(msg.required("عنوان"))
    .max(128, msg.max("عنوان", 128)),
  label: yup
    .string()
    .required(msg.required("برچسب"))
    .max(128, msg.max("برچسب", 128)),
  permissions: yup.array().of(yup.number()),
});

export const updateProfileSchema = yup.object().shape({
  email: yup.string().email(msg.email()).required(msg.required("ایمیل")),
  firstName: yup.string().required(msg.required("نام")),
  lastName: yup.string().required(msg.required("نام خانوادگی")),
  descriptoin: yup.string(),
});
