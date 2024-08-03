import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/searchbar/SearchBar";
import VideoCard from "../../components/videocard/VideoCard";
import "./ResultPage.css";

export default function ResultPage() {
  const [result, setResult] = useState();
  const { q } = useParams();

  useEffect(() => {
    const express = import.meta.env.VITE_API_URL;
    const fetchVideo = async () => {
      const response = await fetch(`${express}/api/videos/q/${q}`);
      const data = await response.json();
      setResult(data);
    };
    fetchVideo();
  }, [q]);

  return (
    <>
      <h1 className="sTitle">
        {result && result.length === 0
          ? `no result for '${q}'`
          : `${result && result.length} result${result && result.length > 1 ? "s" : ""} for '${q}'`}
      </h1>
      <SearchBar />
      <div className="resultCards">
        {result?.map((v) => (
          <VideoCard video={v} key={v.id} />
        ))}
      </div>
    </>
  );
}
