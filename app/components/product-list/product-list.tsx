"use client";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/redux/store";
import { ProductCard } from "../product-card/product-card";
import { Product } from "@/app/types/types";
import { LoadingSpinnerSkeleton } from "@/app/ui/skeleton";
import { Suspense } from 'react';
import { InfoModal } from "../info-modal/info-modal";

export function ProductList() {

    const { products, loading, error } = useAppSelector((state: RootState) => state.product);
    if (error) return <InfoModal data={error} />;
    console.log(products);
    return (
        <Suspense fallback={<LoadingSpinnerSkeleton />}>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product: Product) => {
                    return (
                        <li role="listitem" key={product.id}><ProductCard key={product.id} item={product} /></li>
                    );
                })}
            </ul>
        </Suspense>
    );
}

