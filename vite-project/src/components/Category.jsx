import React from "react";
import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast, MdOutlineSoupKitchen, MdOutlineFastfood } from "react-icons/md";
import { GiFullPizza, GiNoodles } from "react-icons/gi";
import { FaHamburger, FaUtensils } from "react-icons/fa";

const Category = ({ selectedType, setSelectedType }) => {
  const categories = [
    { id: 1, name: "All", image: <TiThSmallOutline className="size-[50px] text-green-600" /> },
    { id: 2, name: "Breakfast", image: <MdOutlineFreeBreakfast className="size-[50px] text-green-600" /> },
    { id: 3, name: "Soup", image: <MdOutlineSoupKitchen className="size-[50px] text-green-600" /> },
    { id: 4, name: "Pasta", image: <GiNoodles className="size-[50px] text-green-600" /> },
    { id: 5, name: "Main Course", image: <FaUtensils className="size-[50px] text-green-600" /> },
    { id: 6, name: "Pizza", image: <GiFullPizza className="size-[50px] text-green-600" /> },
    { id: 7, name: "Burger", image: <FaHamburger className="size-[50px] text-green-600" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => setSelectedType(cat.name)}
          className={`flex flex-col items-center justify-center cursor-pointer w-[120px] h-[130px] rounded-md shadow-md transition-transform duration-200 ${
            selectedType === cat.name ? "bg-green-300 scale-105" : "bg-white hover:scale-105 hover:bg-green-100"
          }`}
        >
          {cat.image}
          <p className="mt-2 text-lg font-semibold capitalize">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
