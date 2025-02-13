import { render, screen } from '@testing-library/react';
import { CartList } from './cart-list';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('CartList Component', () => {

    it('should display contextual message when cart is empty', () => {
        const mockStore = configureStore({ reducer: { cart: (state = { cart: [] }, action) => state } });
        render(
            <Provider store={mockStore}>
                <CartList />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    })
});