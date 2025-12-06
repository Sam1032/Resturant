import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { incrementItem, decrementItem, removeItem } from "../redux/cartSlice";
import { GiStarSwirl } from "react-icons/gi";

const Cart2 = ({ id, image, title, price, quantity }) => {
  console.log(price);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-[150px] p-2 shadow-lg flex justify-between items-center">
      {/* Left: Image + Title + Quantity */}
      <div className="w-[60%] h-full flex gap-[20px]">
        <div className="w-[40%] h-full overflow-hidden">
          <img src={image} alt={title} className="object-cover rounded-lg h-full w-full" />
        </div>
        <div className="w-[20%] h-full flex flex-col gap-3 justify-center">
          <div className="text-lg text-gray-600 font-semibold">{title}</div>

          {/* Quantity selector */}
          <div className="w-[110px] h-[50px] flex rounded-lg overflow-hidden shadow-lg font-bold border-2 border-green-400 text-xl">
            <button
              className="w-[30%] text-green-400 h-full bg-white flex justify-center items-center hover:bg-gray-200"
              onClick={() => dispatch(decrementItem(id))}
            >
              -
            </button>
            <span className="w-[40%] h-full bg-slate-200 flex justify-center items-center">
              {quantity}
            </span>
            <button
              className="w-[30%] h-full text-green-400 bg-white flex justify-center items-center hover:bg-gray-200"
              onClick={() => dispatch(incrementItem(id))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right: Price + Delete */}
      <div className="flex flex-col justify-start items-end gap-4">
        <span className="text-xl text-green-400 font-semibold">Rs: {price}</span>
        <RiDeleteBin6Line
          className="text-red-500 text-2xl cursor-pointer"
          onClick={() => dispatch(removeItem(id))}
        />
      </div>
    </div>
  );
};

export default Cart2;
