import { CartList } from "@/app/components/cart-list/cart-list";
import { Checkout } from "@/app/components/checkout/checkout";

export default function Cart() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CartList />
            <Checkout />
        </div>
    )
}