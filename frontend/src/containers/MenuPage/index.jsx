import { useState, useEffect } from "react";
import { AUTH_BACKEND_URL } from "@/src/utils/api";
import useLogin from "@/src/utils/useLogin";
import axios from "axios";

export default function MenuContainer() {
  const [role, setRole] = useState(null);
  const { detail } = useLogin();
  const [loading, setLoading] = useState(true);

  const allCategories = [
    "Seafood",
    "Salad",
    "Dessert",
    "Drink",
    "Western",
    "Mexican",
    "Asian",
    "Fast Food",
    "Italian",
    "Vegan",
  ];
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    try {
      const user = detail();
      setRole(user["role"]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${AUTH_BACKEND_URL}/menu`);
        setMenu(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenu();
  }, []);

  const menuToDisplay = selectedCategory
    ? menu.filter(
        (item) =>
          item.category.toLowerCase() ===
          selectedCategory.toLowerCase().replace(/\s/g, "")
      )
    : menu;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen px-20 py-10">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 w-full max-w-md p-4 bg-stone-200 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-3xl font-bold leading-none text-gray-900">
              Categories
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list">
              {allCategories.map((category, index) => (
                <li
                  key={index}
                  className={`py-3 sm:py-4 hover:bg-gray-300 ${
                    selectedCategory === category ? "bg-gray-300 rounded" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {category}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="text-2xl text-black font-semibold">Popular Menu</h1>
          <div>
            <ul className="grid grid-cols-4 gap-4">
              {menuToDisplay.map((menuItem, index) => (
                <li key={index} className="p-4 border border-gray-200 rounded-lg shadow sm:p-8">
                  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="p-4">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {menuItem.category}
                      </div>
                      <a
                        href="#"
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                      >
                        {menuItem.name}
                      </a>
                      <p className="mt-2 text-gray-500">{menuItem.description}</p>
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">Rp{menuItem.price}</span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={
                            menuItem.availability
                              ? "text-sm text-green-500"
                              : "text-sm text-red-500"
                          }
                        >
                          {menuItem.availability ? "Available" : "Not Available"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
