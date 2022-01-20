import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("فرمت ایمیل معتبر نمی‌باشد")
      .required("ایمیل اجباری است"),
    password: yup
      .string()
      .min(8, "طول رمز عبور حداقل ۸ می‌باشد")
      .required("رمز عبور اجباری است"),
  });

  
export const createArticleSchema = yup.object().shape({
  title: yup.string().required("عنوان اجباری می‌باشد"),
  content: yup.string(),
  categories: yup.array().of(yup.number()),
  thumbnailId: yup.number(),
});

export const updateArticleSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان نباید بیشتر از ۱۲۸ کاراکتر باشد"),
  content: yup.string(),
  categories: yup.array().of(yup.number()),
  thumbnailId: yup.number(),
});

export const createCategorySchema = yup.object().shape({
  title: yup.string()
      .required("عنوان اجباری می‌باشد")
      .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})

export const updateCategorySchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
});


export const createPermissoinSchema = yup.object().shape({
  title: yup.string()
      .required("عنوان اجباری می‌باشد")
      .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})

export const updatePermissoinSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
});

export const createRoleSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
  label: yup
    .string()
    .required("برچسب اجباری می‌باشد")
    .max(128, "طول برچسب حداکثر ۱۲۸ کاراکتر می‌باشد"),
  permissions: yup.array().of(yup.number()),
});

export const updateRoleSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری می‌باشد")
    .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
  label: yup
    .string()
    .required("برچسب اجباری می‌باشد")
    .max(128, "طول برچسب حداکثر ۱۲۸ کاراکتر می‌باشد"),
  permissions: yup.array().of(yup.number()),
});
