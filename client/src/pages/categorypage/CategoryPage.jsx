// import { useEffect, useState } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import VideoCard from "../../components/videocard/VideoCard";

import "./CategoryPage.css";

export default function CategoryPage() {
  const currentCategory = useParams();
  const categoriesData = useLoaderData();

  return (
    <>
      <Link to="/categories">
        <button type="button" className="backButton">
          <ArrowLeftIcon size={18} />
          Categories
        </button>
      </Link>
      <h1 className="cTitle">{currentCategory.name.replaceAll("-", " ")}</h1>
      <div className="categoryCards">
        {categoriesData && categoriesData[0].id !== null ? (
          categoriesData.map((v) => <VideoCard video={v} key={v.id} />)
        ) : (
          <h2>There are no videos associated with this category</h2>
        )}
      </div>
    </>
  );
}
