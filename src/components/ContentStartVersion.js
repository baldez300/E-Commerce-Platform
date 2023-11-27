
import React from "react";
import "../css/content.css";
import "./SaleContainer/saleContainer.css";
import SaleContainer from "./SaleContainer/SaleContainer";
import MenuMain from "./MenuMain/MenuMain";
import MostPopular from "./MostPopular/MostPopular";

export const Content = () => {
    return (
        <div className="content">
            <MenuMain />
            <SaleContainer/> 
            <MostPopular/>     


        </div>
    );
};

