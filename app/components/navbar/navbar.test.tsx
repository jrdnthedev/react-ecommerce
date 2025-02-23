import { render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Navbar Component', () => {
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

    it('should render the Navbar component', () => {
        const store = configureStore({ reducer: { user: (state = { user: [] }, action) => state, cart: (state = { cart: [] }, action) => state } });
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })

    it('should show products and cart links when user is authenticated', () => {
        const store = configureStore({ reducer: { user: (state = { isAuthenticated: true, user: { firstName: 'john' } }, action) => state, cart: (state = { quantity: 2 }, action) => state } });
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        const productsLink = screen.getByText(/Products/i);
        const cartLink = screen.getByText(/Cart/i);
        const signoutLink = screen.getByText(/Sign out/i);
        const userName = screen.getByTestId('user-name');
        expect(userName).toHaveTextContent('Hi, john');
        expect(signoutLink).toBeInTheDocument();
        expect(productsLink).toBeInTheDocument();
        expect(cartLink).toBeInTheDocument();
    });

    it('should not show products and cart links when user is not authenticated', () => {
        const store = configureStore({ reducer: { user: (state = { isAuthenticated: false, user: null }, action) => state, cart: (state = { quantity: 0 }, action) => state } });
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        const productsLink = screen.queryByText(/Products/i);
        const cartLink = screen.queryByText(/Cart/i);
        const signoutLink = screen.queryByText(/Sign out/i);
        const userName = screen.queryByTestId('user-name');
        expect(userName).not.toBeInTheDocument();
        expect(signoutLink).not.toBeInTheDocument();
        expect(productsLink).not.toBeInTheDocument();
        expect(cartLink).not.toBeInTheDocument();
    });
})