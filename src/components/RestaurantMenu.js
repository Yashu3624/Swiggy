import Shimmer from "./Shimmer";
import React from 'react';
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";


const RestaurantMenu = () => {

    const {resId} = useParams() ; 
    const resInfo = useRestrauntMenu(resId);



   
    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};
    const itemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];
    console.log(resInfo)
    console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card)
   


    if(resInfo==null) return <Shimmer/> ;

    return  (
        <div className="menu">
            
            <h1>{name}</h1>
            <h3>{cuisines.join(",")}</h3>
            <h3>{costForTwoMessage}</h3>

            <ul>
                {itemCards.map((item) =>(
                <li key = {item.card.info.id}>{item.card.info.name} -{"Rs."}{item.card.info.price/100}</li>))}
            </ul>

        </div>
    );
};
export default RestaurantMenu ; 