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
    });

    it('should display cart items', () => {
        const mockStore = configureStore({
            reducer: {
                cart: (state = {
                    cart: [
                        { id: 1, title: 'Product 1', category: 'Category 1', price: 100 },
                        { id: 2, title: 'Product 2', category: 'Category 2', price: 200 },
                    ]
                }, action) => state
            }
        });
        render(
            <Provider store={mockStore}>
                <CartList />
            </Provider>
        );

        expect(screen.getAllByRole('listitem')).toHaveLength(3);//should be cart items + clear cart button
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
});