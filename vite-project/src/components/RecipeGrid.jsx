// RecipeGrid.jsx
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { FaLeaf, FaDrumstickBite, FaStar } from "react-icons/fa";
import { dataContext } from '../context/UserContext';
import {useDispatch} from 'react-redux'
import {AddItem} from "../redux/cartSlice"

export default function RecipeGrid({ selectedType }) {
  const [recipes, setRecipes] = useState([]);
  const [hovered, setHovered] = useState(null);
  const { input } = useContext(dataContext);

  let dispatch=useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine API URL based on input or category
        let url = input
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
          : selectedType && selectedType !== "All"
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedType}`
          : "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        const res = await axios.get(url);
        let meals = res.data.meals || [];

        // If using filter.php, fetch full details for each meal
        if (!input && selectedType && selectedType !== "All") {
          const detailedMeals = await Promise.all(
            meals.map(async (meal) => {
              const detailRes = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              return detailRes.data.meals[0];
            })
          );
          meals = detailedMeals;
        }

        setRecipes(meals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [input, selectedType]); // Added input as dependency

  function isVeg(category, title) {
    const nonVegKeywords = [
      "meat", "chicken", "pork", "beef", "fish", "lamb", "mutton", "shrimp", "bacon", "turkey"
    ];
    return !nonVegKeywords.some(
      (word) =>
        category?.toLowerCase().includes(word) ||
        title?.toLowerCase().includes(word)
    );
  }

  function handleText(title) {
    return title.length > 15 ? title.slice(0, 15) + "..." : title;
  }

  function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing) ingredients.push(`${measure} ${ing}`);
    }
    return ingredients;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 relative">
      {recipes.length===0  &&  <div className="text-3xl text-center pt-9 flex text-red-500">No Dish Found</div>}
      {recipes.map((item) => {
        const veg = isVeg(item.strCategory, item.strMeal);
        const price = (Math.random() * 20 + 5).toFixed(2);
        const rating = (Math.random() * 5).toFixed(1);
        const ingredients = getIngredients(item);

        return (
          <div
            key={item.idMeal}
            className="relative group"
            onMouseEnter={() => setHovered(item.idMeal)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-md p-3 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-2 border-green-300">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-30 md:w-full md:h-50 object-cover rounded-lg"
              />

              <div className="flex items-center justify-between mt-2">
                <h2 className="text-sm font-bold">{handleText(item.strMeal)}</h2>
                {veg ? (
                  <FaLeaf className="text-green-600 text-lg" title="Vegetarian" />
                ) : (
                  <FaDrumstickBite className="text-red-600 text-lg" title="Non-Veg" />
                )}
              </div>

              <div className="flex justify-between items-center mt-1.5 mb-1.5 text-green-500">
                <p className="text-xs text-gray-600">{item.strCategory}</p>
              <p className="text-sm font-semibold">${price}</p>
              </div>
             <button
  onClick={() =>
  {
    dispatch(
      AddItem({
        id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        image: item.strMealThumb,
        price: price || (Math.random() * 20 + 5).toFixed(2),
        rating: rating,
      })
    )
    toast.success(`${item.strMeal} added`)
  }
  }
  className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg shadow-md transition-colors cursor-pointer"
>
  Add to Cart
</button>
            </div>

            {/* Floating Preview Card */}
            {hovered === item.idMeal && (
              <div
                className="absolute -top-44 left-1/2 -translate-x-1/2 w-64 
                bg-white/95 backdrop-blur-xl border border-gray-200 
                shadow-2xl rounded-xl p-3 z-50 
               opacity-0 group-hover:opacity-100 
                transition-all duration-300 ease-out"
              >
                {/* Video Preview */}
                {item.strYoutube ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.strYoutube.split("v=")[1]}`}
                    title="Cooking Video"
                    className="w-full h-28 rounded-lg mb-3"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-sm italic mb-2">No Video Available</p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold">{rating}/5</span>
                </div>

                {/* Ingredients */}
                <p className="text-xs text-gray-700 leading-snug line-clamp-2">
                  {ingredients.slice(0, 5).join(", ") || "N/A"}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
