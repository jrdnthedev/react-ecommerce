"use client";
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/redux/store';
import { Product } from '@/app/types/types';
import { PriceFormatter } from '@/app/utils/price-formatter';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export function Checkout() {
    const { cart } = useAppSelector((state: RootState) => state.cart);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch('/api/stripe-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems: cart,
                returnUrl: window.location.origin,
            }),
        });
        if (!response.ok) {
            console.error('Failed to create checkout session', response.status, response.statusText);
            return;
        }

        try {
            const session = await response.json();
            await stripe?.redirectToCheckout({ sessionId: session.id });
        } catch (err) {
            console.error('Failed to parse checkout session', err);
        }

    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return (
        <div className="col-span-2 sm:col-span-1 lg:col-span-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {cart.length > 0 ? (
                <><h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Checkout</h5><div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-5xl font-semibold tracking-tight">{PriceFormatter(total)}</span>
                </div><ul role="list" className="space-y-5 my-7">
                        {cart.map((item: Product) => {
                            return (
                                <li className="flex items-center" key={item.id}>
                                    <svg className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{item.title}</span>
                                </li>
                            );
                        })}
                    </ul><button data-testid="checkout-button" onClick={handleCheckout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Checkout</button></>
            ) : (
                <>
                    cart is empty
                </>
            )}
        </div>
    )

}