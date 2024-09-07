import { useEffect } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import SearchBar from "../../components/searchbar/SearchBar";
import Filter from "../../components/filter/Filter";
import CategoriesList from "../../components/categorieslist/CategoriesList";

import setPageTitle from "../../utils/setPageTitle";
import "./CategoriesPage.css";

export default function CategoriesPage() {
  const categoriesData = useLoaderData();

  useEffect(() => {
    setPageTitle("Categories");
  });

  return (
    <div className="categories-container">
      <div className="search-bar-categories">
        <SearchBar />
      </div>

      <div className="filter-categories">
        <Filter category={categoriesData} />
      </div>

      {categoriesData.map((c) => (
        <div key={c.id}>
          <h1 className="title-categories">
            <NavLink to={`/categories/${c.name.replaceAll(" ", "-")}`}>
              {c.name}
            </NavLink>
          </h1>
          <CategoriesList category={c} key={c.id} />
        </div>
      ))}
    </div>
  );
}
