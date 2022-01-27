import { toast } from "material-react-toastify";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  ArticleServices,
  CategoriesServices,
  PermissionsServices,
  RolesServices,
  UsersServices,
  MeServices,
  AuthServices,
} from "services";
import {
  useUpdateMutation,
  useCreateMutation,
  useDeleteMutation,
} from "./common";

// Article
export function useGetArticlesQuery() {
  return useQuery("articles", () =>
    ArticleServices.findAll().then((res) => res.data?.result)
  );
}

export function useGetArticleQuery(id: number) {
  return useQuery(["article", id], () =>
    ArticleServices.findOne(id).then((res) => res.data?.result)
  );
}

export function useUpdateArticleMutation(id: number) {
  return useUpdateMutation(id, ArticleServices.update);
}

export function useCreateArticleMutation() {
  return useCreateMutation(ArticleServices.create);
}

export function useDeleteArticleMutation() {
  return useDeleteMutation(ArticleServices.remove);
}

// Category
export function useGetCategoriesQuery() {
  return useQuery("categories", () =>
    CategoriesServices.findAll().then((res) => res.data?.result)
  );
}

export function useGetCategoryQuery(id: number) {
  return useQuery(["category", id], () =>
    CategoriesServices.findOne(id).then((res) => res.data?.result)
  );
}

export function useUpdateCategoryMutation(id: number) {
  return useUpdateMutation(id, CategoriesServices.update);
}

export function useCreateCategoryMutation() {
  return useCreateMutation(CategoriesServices.create);
}

export function useDeleteCategoryMutation() {
  return useDeleteMutation(CategoriesServices.remove);
}

// Role
export function useGetRolesQuery() {
  return useQuery("roles", () =>
    RolesServices.findAll().then((res) => res.data?.result)
  );
}

export function useGetRoleQuery(id: number) {
  return useQuery(["role", id], () =>
    RolesServices.findOne(id).then((res) => res.data?.result)
  );
}

export function useUpdateRoleMutation(id: number) {
  return useUpdateMutation(id, RolesServices.update);
}

export function useCreateRoleMutation() {
  return useCreateMutation(RolesServices.create);
}

export function useDeleteRoleMutation() {
  return useDeleteMutation(CategoriesServices.remove);
}

// Permission
export function useGetPermissionsQuery() {
  return useQuery("permissions", () =>
    PermissionsServices.findAll().then((res) => res.data?.result)
  );
}

export function useGetPermissionQuery(id: number) {
  return useQuery(["permission", id], () =>
    PermissionsServices.findOne(id).then((res) => res.data?.result)
  );
}

export function useUpdatePermissionMutation(id: number) {
  return useUpdateMutation(id, PermissionsServices.update);
}

export function useCreatePermissionMutation() {
  return useCreateMutation(PermissionsServices.create);
}

export function useDeletePermissionMutation() {
  return useDeleteMutation(CategoriesServices.remove);
}

// User
export function useGetUsersQuery() {
  return useQuery("users", () =>
    UsersServices.findAll().then((res) => res.data?.result)
  );
}

export function useGetUserQuery(id: number) {
  return useQuery(["user", id], () =>
    UsersServices.findOne(id).then((res) => res.data?.result)
  );
}

export function useGetProfileQuery() {
  return useQuery("profile", () =>
    MeServices.getProfile().then((res) => res.data)
  );
}

export function useLoginMutation() {
  const naviagate = useNavigate();
  return useMutation(AuthServices.login, {
    onSuccess: (data) => {
      toast.success("با موفقیت وارد شدید");
      localStorage.setItem("token", data.access_token);
      naviagate("/dashboard");
    },
    onError: () => {
      toast.error("مشکلی وجود دارد");
    },
  });
}
