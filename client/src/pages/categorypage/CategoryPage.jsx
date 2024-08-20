import { useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import VideoCard from "../../components/videocard/VideoCard";
import Filter from "../../components/filter/Filter";

import setPageTitle from "../../utils/setPageTitle";
import "./CategoryPage.css";

export default function CategoryPage() {
  const currentCategory = useParams();
  const LoaderData = useLoaderData();
  const thisCategoryData = LoaderData[0];
  const categoriesData = LoaderData[1];

  const categoryName = currentCategory.name.replaceAll("-", " ");

  useEffect(() => {
    setPageTitle(categoryName);
  });

  return (
    <>
      <Link to="/categories">
        <button type="button" className="backButton">
          <ArrowLeftIcon size={18} />
          Categories
        </button>
      </Link>
      <h1 className="cTitle">{categoryName}</h1>
      <div className="categoryCards">
        {thisCategoryData && thisCategoryData[0].id !== null ? (
          thisCategoryData.map((v) => <VideoCard video={v} key={v.id} />)
        ) : (
          <h2>There are no videos associated with this category</h2>
        )}
      </div>

      <Filter category={categoriesData} />
      <style>
        {
          "div.filter-wrapper { display: flex; align-items: center; flex-direction: column; }"
        }
      </style>
    </>
  );
}
