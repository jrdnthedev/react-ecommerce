"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addToCart } from "@/app/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Product } from "@/app/types/types";
import Image from "next/image";
import StarRating from "../star-rating/star-rating";
import { PriceFormatter } from "@/app/utils/price-formatter";
import { ToastContainer, toast } from 'react-toastify';
interface CardProps {
    item: Product;
}

export default function ProductCard({ item }: CardProps) {
    const dispatch = useAppDispatch<AppDispatch>();
    const cart = useAppSelector((state: RootState) => state.cart.cart ?? []);

    const handleAddToCart = (item: Product) => {
        const itemInCart = cart.some((cartItem) => cartItem.id === item.id);
        console.log(itemInCart);
        if (!itemInCart) {
            dispatch(addToCart(item));
            setTimeout(() => {
                toast('Item added to cart', {
                    position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
                });
            }, 100);
        } else {
            toast('Item already in cart', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            });
        }
    }

    return (
        <div data-testid="product-card" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
            <div className="inline-block relative w-[300px] h-[300px]">
                <Image src={item.image} alt="product image" className="p-8 rounded-t-lg object-contain" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="px-5 pb-5 flex-grow">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    <StarRating rating={item.rating.rate} />
                </div>
            </div>
            <div className="px-5 pb-5">
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{PriceFormatter(item.price)}</span>
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}