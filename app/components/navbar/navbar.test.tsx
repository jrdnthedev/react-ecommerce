import { act, render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { userEvent } from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

describe('Navbar Component', () => {

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

    it('should navigate user to products page when products link is clicked', async () => {
        const store = configureStore({ reducer: { user: (state = { isAuthenticated: true, user: { firstName: 'john' } }, action) => state, cart: (state = { quantity: 2 }, action) => state } });
        const userEv = userEvent.setup();
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        const productsLink = screen.getByRole("link", { name: /products/i });
        await act(async () => {
            await userEv.click(productsLink);
        });

        expect(productsLink).toHaveAttribute("href", "/products");
    });

    it('should navigate user to cart page when cart link is clicked', async () => {
        const store = configureStore({ reducer: { user: (state = { isAuthenticated: true, user: { firstName: 'john' } }, action) => state, cart: (state = { quantity: 2 }, action) => state } });
        const userEv = userEvent.setup();
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );
        const cartLink = screen.getByRole("link", { name: /cart/i });
        await act(async () => {
            await userEv.click(cartLink);
        });

        expect(cartLink).toHaveAttribute("href", "/cart");
    });
})