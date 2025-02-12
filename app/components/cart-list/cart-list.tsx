"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { removeFromCart, clearCart } from "@/app/redux/slices/cartSlice";
import { RootState } from "@/app/redux/store";
import { Product } from "@/app/types/types";
import { PriceFormatter } from "@/app/utils/price-formatter";

export function CartList() {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state: RootState) => state.cart);

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Items</h5>
            </div>
            <div className="flow-root">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) :
                    (<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {cart.map((item: Product) => {
                            return (
                                <li className="py-3 sm:py-4" key={item.id}>
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {item.category}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {PriceFormatter(item.price)}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                        <li className="py-3 sm:py-4">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                        </li>
                    </ul>)}
            </div>
        </div>

    );
}
