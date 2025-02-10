"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProducts } from "@/app/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { ProductCard } from "../product-card/product-card";

export function ProductList() {
    const dispatch = useAppDispatch<AppDispatch>();
    const { products, loading, error } = useAppSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="p-4">
            <h1>Product List</h1>
            <div className=" grid grid-cols-4 gap-4">
                {products.map((product: any) => {
                    return (
                        <ProductCard key={product.id} item={product} />
                    );
                })}
            </div>

        </div>
    );
}