import React, { useContext } from 'react'
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from '../context/UserContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {input,setInput,showCart,setShowCart}=useContext(dataContext);
  let items=useSelector(state=>state.cart);
  console.log(items);
  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
      {/* Logo */}
      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-md'>
        <MdFastfood className="w-[30px] h-[30px] text-green-500" />
      </div>

      {/* Search Bar */}
      <form 
      onSubmit={(e)=>e.preventDefault()}
      className='w-[45%] md:w-[70%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md'>
        <IoSearch className="text-green-500 size-[20px]" />
        <input
          type="text"
          onChange={(e)=>setInput(e.target.value)}
          placeholder='Search Items....'
          value={input}
          className='w-full outline-none text-[15px] md:text-[20px]'
        />
      </form>

      {/* Shopping Bag */}
      <div className='relative w-[60px] h-[60px] cursor-pointer bg-white flex justify-center items-center rounded-md shadow-md'>
        <LuShoppingBag className="w-[30px] h-[30px] text-green-500"
        onClick={()=>setShowCart(true)}
        />
        <span className='absolute -top-1 right-2 text-green-500 font-bold text-[18px]'>
        {items.length}
        </span>
      </div>
    </div>
  )
}

export default Navbar
