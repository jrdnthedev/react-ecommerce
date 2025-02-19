import { render, screen } from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Products from "../../(pages)/products/page";

describe('ProductCard Component', () => {
    const productList = [
        {
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 1,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 109.95,
            rating: { rate: 3.9, count: 120 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        },
        {
            category: "men's clothing",
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            id: 2,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            price: 19.95,
            rating: { rate: 4.9, count: 10 },
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        }
    ]

    it('should display product card', () => {
        const store = configureStore({ reducer: { product: (state = { products: productList, loading: false, error: null }, action) => state } })
        render(
            <Provider store={store}>
                <Products />
            </Provider>
        );
        const productCard = screen.getAllByTestId('product-card');
        expect(productCard).toHaveLength(2);
    });
});