import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('ProductCard Component', () => {
    const item = {
        category: "men's clothing",
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        id: 1,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        price: 109.95,
        rating: { rate: 3.9, count: 120 },
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    };

    it('should display product card', () => {
        const store = configureStore({ reducer: { cart: (state = { cart: [] }, action) => state } })
        render(
            <Provider store={store}>
                <ProductCard item={item} />
            </Provider>
        );
        const productCard = screen.getByTestId('product-card');
        expect(productCard).toBeInTheDocument();
    });

});