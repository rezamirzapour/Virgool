import type { FC } from "react";
import { useQuery } from "react-query";
import { CategoriesServices } from "src/services";
import Link from "next/link";

const Categories: FC = () => {
  const { data: categories, isLoading } = useQuery("categories", () =>
    CategoriesServices.findAll({ paginate: false }).then(({ data }) => data)
  );

  const renderCategories = () => {
    if (!isLoading)
      return categories.result?.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <a className="text-gray-80 hover:text-gray-60 ml-3 last:ml-0">
            {category.title}
          </a>
        </Link>
      ));
    return null;
  };

  return <nav className="mt-8">{renderCategories()}</nav>;
};

export default Categories;
