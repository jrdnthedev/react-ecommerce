"use client";

import { useAppDispatch } from "@/app/hooks";
import { fetchProducts } from "@/app/redux/slices/productSlice";
import { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";

export function ProductLoader() {
    const dispatch = useAppDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return null;
}