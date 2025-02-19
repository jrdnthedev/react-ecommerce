"use client";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/redux/store";
import { ProductCard } from "../product-card/product-card";
import { Product } from "@/app/types/types";
import { ProductCardSkeleton } from "@/app/ui/skeleton";

export function ProductList() {

    const { products, loading, error } = useAppSelector((state: RootState) => state.product);
    if (error) return <p>Error: {error}</p>;
    console.log(products);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product: Product) => {
                if (!loading) {
                    return (
                        <ProductCard key={product.id} item={product} />
                    );
                } else {
                    return (<ProductCardSkeleton />);
                }

            })}
        </div>
    );
}