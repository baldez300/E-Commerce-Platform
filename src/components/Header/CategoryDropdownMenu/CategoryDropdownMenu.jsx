import { signal } from "@preact/signals-react";
import { allCategoriesActive } from "..";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import "./CategoryDropdownMenu.css";
import {Link} from "react-router-dom";

const solarPanelsActive = signal(false);
const energyStorageActive = signal(false);
const evChargingActive = signal(false);
const energyEfficientAppliancesActive = signal(false);
const windTurbinesActive = signal(false);

const CategoryDropdownMenu = ({ className }) => {





  console.log("Render: CategoryDropdownMenu");

  return (
    <div className={className}>
      <div
        className={
          allCategoriesActive.value
            ? "category-dropdown-menu category-dropdown-menu-active"
            : "category-dropdown-menu category-dropdown-menu-disabled"
        }
      >
        <div className="category-item-wrapper">
          <div className="primary-categories">
            <div
              className={
                solarPanelsActive.value
                  ? "primary-category primary-category-active"
                  : "primary-category"
              }
              onMouseEnter={() => {
                if (window.innerWidth > 800) solarPanelsActive.value = true;
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 800) solarPanelsActive.value = false;
              }}
            >
              <Link to="/solar-panels"
                className="primary-text"
                onMouseEnter={() => {
                  if (window.innerWidth < 801)
                    solarPanelsActive.value = !solarPanelsActive.value;
                }}
              >
                Solar Panels
              </Link>
              <MdKeyboardArrowRight className="arror-right-icon" />
              <MdKeyboardArrowDown className="arrow-down-icon" />
              <div
                className={
                  solarPanelsActive.value
                    ? "sub-category"
                    : "sub-category-hidden"
                }
              >
                <Link
                  state={{ subcategory: 1, category: 2, description: "Monocrystalline solar panels" }}
                  to="/solar-panels/mono-crystalline-panels" 
                  className="sub-text">Monocrystalline</Link>
                <Link 
                  state={{ subcategory: 2, category: 2, description: "Polycrystalline solar panels" }}
                  to="/solar-panels/poly-crystalline-panels"
                  className="sub-text">Polycrystalline</Link>
                <Link
                  state={{ subcategory: 3, category: 2, description: "Thin film solar panels" }}
                  to="/solar-panels/thin-film-panels" 
                  className="sub-text">Thin Film</Link>
              </div>
            </div>
            <div
              className={
                energyStorageActive.value
                  ? "primary-category primary-category-active"
                  : "primary-category"
              }
              onMouseEnter={() => {
                if (window.innerWidth > 800) energyStorageActive.value = true;
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 800) energyStorageActive.value = false;
              }}
            >
              <Link to="/energy-storage-solutions"
                className="primary-text"
                onMouseEnter={() => {
                  if (window.innerWidth < 801)
                    energyStorageActive.value = !energyStorageActive.value;
                }}
              >
                Energy Storage Solutions
              </Link>
              <MdKeyboardArrowRight className="arror-right-icon" />
              <MdKeyboardArrowDown className="arrow-down-icon" />
              <div
                className={
                  energyStorageActive.value
                    ? "sub-category"
                    : "sub-category-hidden"
                }
              >
                <Link
                  state={{ category: 3, subcategory: 1, description: "Storage batteries"}}
                  to="/energy-storage-solutions/storage-batteries"
                  className="sub-text">Batteries</Link>
                <Link
                  state={{ category: 3, subcategory: 2, description: "Flywheels"}}
                  to="/energy-storage-solutions/flywheels"
                  className="sub-text">Flywheels</Link>
                <Link
                  state={{ category: 3, subcategory: 3, description: "Thermal energy storage"}}
                  to="/energy-storage-solutions/thermal-energy-storage"
                  className="sub-text">Thermal</Link>
              </div>
            </div>
            <div
              className={
                evChargingActive.value
                  ? "primary-category primary-category-active"
                  : "primary-category"
              }
              onMouseEnter={() => {
                if (window.innerWidth > 800) evChargingActive.value = true;
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 800) evChargingActive.value = false;
              }}
            >
              <Link to="/ev-charges"
                className="primary-text"
                onMouseEnter={() => {
                  if (window.innerWidth < 801)
                    evChargingActive.value = !evChargingActive.value;
                }}
              >
                EV Charging Stations
              </Link>
              <MdKeyboardArrowRight className="arror-right-icon" />
              <MdKeyboardArrowDown className="arrow-down-icon" />
              <div
                className={
                  evChargingActive.value
                    ? "sub-category"
                    : "sub-category-hidden"
                }
              >
                <Link
                  state={{ category: 1, subcategory: 1, description: "Home charging stations" }}
                  to="/ev-charges/home-charging" 
                  className="sub-text">Home Charging</Link>
                <Link 
                  state={{ category: 1, subcategory: 2, description: "Public charging stations" }}
                  to="/ev-charges/public-charging" 
                  className="sub-text">Public Charging</Link>
                <Link 
                  state={{ category: 1, subcategory: 3, description: "Super charging stations" }}
                  to="/ev-charges/super-charging"
                  className="sub-text">Super Charging</Link>
              </div>
            </div>
            <div
              className={
                energyEfficientAppliancesActive.value
                  ? "primary-category primary-category-active"
                  : "primary-category"
              }
              onMouseEnter={() => {
                if (window.innerWidth > 800)
                  energyEfficientAppliancesActive.value = true;
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 800)
                  energyEfficientAppliancesActive.value = false;
              }}
            >
              <Link to="/energy-efficient-appliances"
                className="primary-text"
                onMouseEnter={() => {
                  if (window.innerWidth < 801)
                    energyEfficientAppliancesActive.value =
                      !energyEfficientAppliancesActive.value;
                }}
              >
                Energy-efficient Appliances
              </Link>
              <MdKeyboardArrowRight className="arror-right-icon" />
              <MdKeyboardArrowDown className="arrow-down-icon" />
              <div
                className={
                  energyEfficientAppliancesActive.value
                    ? "sub-category"
                    : "sub-category-hidden"
                }
              >
                <Link
                  state={{ category: 4, subcategory: 1, description: "Energy saving light bulbs" }}
                  to="/energy-efficient-appliances/energy-saving-light-bulbs"
                  className="sub-text">Energy Saving Light Bulbs</Link>
                <Link 
                  state={{ category: 4, subcategory: 2, description: "Efficient refrigerators" }}
                  to="/energy-efficient-appliances/efficient-refrigerators"
                  className="sub-text">Efficient Refrigerators</Link>
                <Link 
                  state={{ category: 4, subcategory: 3, description: "Efficient washing machines" }}
                  to="/energy-efficient-appliances/efficient-washing-machines"
                  className="sub-text">Efficient Washing Machines</Link>
              </div>
            </div>
            <div
              className={
                windTurbinesActive.value
                  ? "primary-category primary-category-active"
                  : "primary-category"
              }
              onMouseEnter={() => {
                if (window.innerWidth > 800) windTurbinesActive.value = true;
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 800) windTurbinesActive.value = false;
              }}
            >
              <Link to="/wind-turbines"
                className="primary-text"
                onMouseEnter={() => {
                  if (window.innerWidth < 801)
                    windTurbinesActive.value = !windTurbinesActive.value;
                }}
              >
                Wind Turbines
              </Link>
              <MdKeyboardArrowRight className="arror-right-icon" />
              <MdKeyboardArrowDown className="arrow-down-icon" />
              <div
                className={
                  windTurbinesActive.value
                    ? "sub-category"
                    : "sub-category-hidden"
                }
              >
                <Link
                  state={{ category: 5, subcategory: 1, description: "Horizontal axis wind turbines" }}
                  to="/wind-turbines/horizontal-axis-turbines"
                  className="sub-text">Horizontal Axis Turbines</Link>
                <Link
                  state={{ category: 5, subcategory: 2, description: "Vertical axis wind turbines" }}
                  to="/wind-turbines/vertical-axis-turbines" 
                  className="sub-text">Vertical Axis Turbines</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdownMenu;
