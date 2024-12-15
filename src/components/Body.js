import React, { useEffect, useState } from 'react';
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import NumberGuessingGame from './NumberGuessingGame';

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.55180&lng=81.52430&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const data = await response.json();
      const restaurants = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return (
    <div>
      <h1>You are offline</h1>
      <NumberGuessingGame />
    </div>
  );

  return listOfRestaurants.length === 0 ? <Shimmer /> : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setListOfRestaurant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => {
          // Promotion logic based on totalRatingsString
          const totalRatings = parseInt(restaurant.info.totalRatingsString.replace("+", ""), 10) || 0;
          const isPromoted = totalRatings > 100;

          return (
            <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
              {isPromoted ? (
                <RestaurantCardPromoted restaurant={restaurant.info} />
              ) : (
                <RestaurantCard restaurant={restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
