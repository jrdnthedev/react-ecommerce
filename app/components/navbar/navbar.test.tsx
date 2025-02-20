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
})