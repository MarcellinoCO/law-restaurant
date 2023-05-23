import { useState } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { AUTH_BACKEND_URL } from "@/src/utils/api";
import swal from "sweetalert";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function DashboardAdminContainer() {
    const [tab, setTab] = useState("menu");
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
    const [categories, setCategories] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState("");
    const [newMenuDescription, setNewMenuDescription] = useState("");
    const [newMenuPrice, setNewMenuPrice] = useState("");
    const [newMenuAvailability, setNewMenuAvailability] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [menu, setMenu] = useState([]);

    const [newCouponItem, setNewCouponItem] = useState("");
    const [couponAmount, setCouponAmount] = useState("");

    const handleCreateMenu = async (event) => {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/menu`;

        // Create new menu object
        const newMenu = {
            name: newMenuItem,
            description: newMenuDescription,
            price: parseFloat(newMenuPrice),
            availability: newMenuAvailability,
            category: newCategory,
        };

        // Send newMenu to the server
        axios
            .post(url, newMenu, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token for authorization
                },
            })
            .then(async (res) => {
                // Update menu state
                const createdMenu = res.data;
                setMenu([...menu, createdMenu]);

                // Add category to categories if not already present
                if (!categories.includes(newCategory)) {
                    setCategories([...categories, newCategory]);
                }
                swal("Menu berhasil ditambahkan!", {
                    buttons: false,
                    timer: 1000,
                });
            })
            .catch((err) => {
                console.error(err);
                swal("Menu gagal ditambahkan!", {
                    buttons: false,
                    timer: 1000,
                });
            });
    };

    const handleCreateCoupon = async (event) => {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/coupons`;
        console.log(newCouponItem);
        console.log(couponAmount);
        axios
            .post(
                url,
                {
                    code: newCouponItem,
                    amount: couponAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then(async (res) => {
                swal("Coupon berhasil ditambahkan!", {
                    buttons: false,
                    timer: 1000,
                });
            })
            .catch((err) => {
                console.error(err);
                swal("Coupon gagal ditambahkan!", {
                    buttons: false,
                    timer: 1000,
                });
            });
    };

    return (
        <div className={`${regularPoppins.className} flex h-screen `}>
            <div className="p-3 space-y-2 overflow-y-scroll bg-stone-300 w-64 h-full rounded">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Admin Dashboard
                </h2>
                <nav className="flex flex-col items-start">
                    {["menu", "coupon"].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className="px-2 py-1 text-[#F4ECE1] bg-[#2F2F2F] rounded-xl drop-shadow-2xl capitalize"
                            onClick={() => setTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex-grow p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome to the Admin Dashboard
                </h2>
                <div className="bg-stone-300 p-4 rounded-lg shadow">
                    {tab === "menu" ? (
                        <div className="col-span-3 mb-6">
                            <h1
                                className={`${boldPoppins.className} flex justify-center text-2xl text-[#FF7E00] font-semibold px-4 mx-auto max-w-2xl`}
                            >
                                Menu Management
                            </h1>
                            <section>
                                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                    <h2 class="mb-4 text-xl font-bold text-gray-900">
                                        Add a New Menu
                                    </h2>
                                    <form>
                                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div class="sm:col-span-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                                >
                                                    Menu Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={newMenuItem}
                                                    onChange={(e) =>
                                                        setNewMenuItem(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type Menu Name"
                                                    required
                                                />
                                            </div>
                                            <div class="w-full">
                                                <label
                                                    htmlFor="description"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    value={newMenuDescription}
                                                    onChange={(e) =>
                                                        setNewMenuDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Menu Description"
                                                />
                                            </div>
                                            <div class="w-full">
                                                <label
                                                    for="price"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    value={newMenuPrice}
                                                    onChange={(e) =>
                                                        setNewMenuPrice(
                                                            e.target.value
                                                        )
                                                    }
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="20000"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="category"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    value={newCategory}
                                                    onChange={(e) =>
                                                        setNewCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    id="category"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                >
                                                    {allCategories.map(
                                                        (category, index) => (
                                                            <option
                                                                value={category}
                                                                key={index}
                                                            >
                                                                {category}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="availability"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Availability
                                                </label>
                                                <select
                                                    name="availability"
                                                    id="availability"
                                                    value={newMenuAvailability}
                                                    onChange={(e) =>
                                                        setNewMenuAvailability(
                                                            e.target.value ===
                                                                "true"
                                                        )
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                >
                                                    <option value="true">
                                                        True
                                                    </option>
                                                    <option value="false">
                                                        False
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex item-center my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => handleCreateMenu()}
                                        >
                                            Add Menu
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    ) : tab === "coupon" ? (
                        <div className="col-span-3 mb-6">
                            <h1
                                className={`${boldPoppins.className} flex justify-center text-2xl text-[#FF7E00] font-semibold px-4 mx-auto max-w-2xl`}
                            >
                                Coupon Management
                            </h1>
                            <section>
                                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                    <h2 class="mb-4 text-xl font-bold text-gray-900">
                                        Add a New Coupon
                                    </h2>
                                    <form>
                                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                            <div class="sm:col-span-2">
                                                <label
                                                    htmlFor="coupon"
                                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                                >
                                                    Coupon Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="coupon"
                                                    id="coupon"
                                                    value={newCouponItem}
                                                    onChange={(e) =>
                                                        setNewCouponItem(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Enter Coupon Code"
                                                    required
                                                />
                                                <label
                                                    htmlFor="coupon"
                                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                                >
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="couponAmount"
                                                    id="couponAmount"
                                                    value={couponAmount}
                                                    onChange={(e) =>
                                                        setCouponAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Discount Amount"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex item-center my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => handleCreateCoupon()}
                                        >
                                            Add Coupon
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
