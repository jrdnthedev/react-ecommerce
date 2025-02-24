import { ProductList } from "@/app/components/product-list/product-list";
import { LoadingSpinnerSkeleton } from "@/app/ui/skeleton";
import { Suspense } from 'react';

export default function Product() {
    return (
        <Suspense fallback={<LoadingSpinnerSkeleton />}>
            <ProductList />
        </Suspense>
    );
}