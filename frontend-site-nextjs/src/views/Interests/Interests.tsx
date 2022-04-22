import { Card } from "./components";
import { useQuery } from "react-query";
import { CategoriesServices } from "src/services";

export default function Interests() {
  const { data, isLoading } = useQuery("categories", () =>
    CategoriesServices.findAll({ paginate: false }).then(({ data }) => data)
  );

  const renderedCategories = () => {
    if (isLoading) return <div>درحال بارگذاری</div>;
    if (data?.result.length > 0)
      return (
        <div className="grid grid-cols-5 gap-4">
          {data?.result.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>
      );
    return <div>موردی یافت نشد</div>;
  };

  return (
    <div>
      <h2 className="text-lg font-bold">
        چند موضوع که به آن‌ها علاقه دارید را انتخاب کنید
      </h2>
      <p className="mt-2">
        به کمک این اطلاعات، پست‌هایی که بیشتر دوست دارید به شما پیشنهاد داده
        می‌شود.
      </p>
      <div className="mt-8">{renderedCategories()}</div>
    </div>
  );
}
