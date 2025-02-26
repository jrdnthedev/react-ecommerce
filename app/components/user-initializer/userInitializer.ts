"use client";

import { useAppDispatch } from "@/app/hooks";
import { initializeUser } from "@/app/redux/slices/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";

export default function UserInitializer() {
  const dispatch = useAppDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return null;
}
