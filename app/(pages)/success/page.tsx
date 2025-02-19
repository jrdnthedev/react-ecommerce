"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessfulPurchase() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    return (


        <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Purchase Successful</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Thanks for your purchase! Here at Tengo we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            </div>
        </section>

    );
}