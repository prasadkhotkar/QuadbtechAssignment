import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/showList.css";

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h1>SHOW LIST</h1>
      <ul className="showList">
        {shows.map((show) => (
          <li key={show.show.id} className="showItem">
            <Link to={`/show/${show.show.id}`} className="showLink">
              {show.show.image ? (
                <img src={show.show.image.medium} alt={show.show.name} />
              ) : (
                <div className="noImage">No Image Available</div>
              )}
              <span>{show.show.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
