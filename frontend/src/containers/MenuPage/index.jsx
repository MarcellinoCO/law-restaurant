import { useState, useEffect } from "react";
import useLogin from "@/src/utils/useLogin";
import axios from "axios";

export default function MenuContainer(){
    const [role, setRole] = useState(null);
    const { detail } = useLogin();
    const [loading, setLoading] = useState(true); 

    const allCategories = ["Seafood", "Salad", "Dessert", "Drink", "Western", "Mexican", "Asian", "Fast Food", "Italian", "Vegan"];
    const [categories, setCategories] = useState([]);
    const [menu, setMenu] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleViewMore = () => {
        setCategories(allCategories);
        setViewMore(true);
    }
    
    useEffect(() => {
        try {
            const user = detail();
            setRole(user["role"]);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    });

    const menuToDisplay = selectedCategory ? menu.filter(item => item.category === selectedCategory) : menu;

    if (loading) { 
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="min-h-screen px-20 py-10">
            <div className="grid grid-cols-3 gap-1">
                <div className="col-span-1 w-full max-w-md p-4 bg-stone-200 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-3xl font-bold leading-none text-gray-900">Categories</h5>
                        {!viewMore && <button onClick={handleViewMore} className="text-sm font-medium text-blue-600 hover:no-underline dark:text-blue-500">View more</button>}
                    </div>
                    <div className="flow-root">
                        <ul role="list">
                            {categories.map((category, index) => (
                                <li key={index} className="py-3 sm:py-4 hover:bg-gray-300 hover:rounded" onClick={() => setSelectedCategory(category)}>
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
                        <ul className="grid grid-cols-4">
                            {menuToDisplay.map((menuItem, index) => (
                                <li key={index} className="p-4 border border-gray-200 rounded-lg shadow sm:p-8">
                                    {menuItem.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}