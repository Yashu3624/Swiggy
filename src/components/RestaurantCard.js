import React from 'react';
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ restaurant = {} }) => {
  const {
    name = '',
    cuisines = [],
    costForTwo = '',
    avgRating = 0,
    sla = {},
    cloudinaryImageId = ''
  } = restaurant;

  return (
    <div className="m-2 p-4 w-[250px] h-[350px] bg-gray-50 hover:bg-gray-200 overflow-hidden border border-gray-300 rounded-lg">
      <img
        className="w-full h-[150px] object-cover rounded-t-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="py-4">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <h4 className="text-sm truncate">{cuisines.join(", ")}</h4>
        <h4 className="text-sm">{costForTwo}</h4>
        <h4 className="text-sm">{avgRating} Stars</h4>
        <h4 className="text-sm">{sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

// Higher Order Component
export const withPromotedLabel = (Component) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <Component {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
