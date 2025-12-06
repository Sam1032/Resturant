import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import RecipeGrid from '../components/RecipeGrid';
import { dataContext } from '../context/UserContext';
import { useContext } from 'react';
import Cart from '../components/Cart';

const Home = () => {
  const [selectedType, setSelectedType] = useState("All");
  const { input,setShowCart,showCart } = useContext(dataContext);
  return (
    <div className='bg-slate-200 w-full min-h-[100vh]'>
      <Cart />
      <Navbar />
      {!input && <Category selectedType={selectedType} setSelectedType={setSelectedType} />}
      <RecipeGrid selectedType={selectedType} />
    </div>
  );
};

export default Home;
