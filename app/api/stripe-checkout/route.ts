import { Product } from "@/app/types/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, res: Response) {
  try {
    const { cartItems, returnUrl } = await req.json();

    const line_items = cartItems.map((item: Product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${returnUrl}/success`,
      cancel_url: `${returnUrl}/cart`,
    });

    return Response.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
