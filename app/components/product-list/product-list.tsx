"use client";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/redux/store";
import { ProductCard } from "../product-card/product-card";

export function ProductList() {

    const { products, loading, error } = useAppSelector((state: RootState) => state.product);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="p-4">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product: any) => {
                    return (
                        <ProductCard key={product.id} item={product} />
                    );
                })}
            </div>
        </div>
    );
}