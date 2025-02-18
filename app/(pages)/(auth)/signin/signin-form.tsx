"use client";
import { RegisterForm } from "@/app/types/types";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterForm>({
        defaultValues: { email: '', password: '' }
    });

    async function SendPostData(data: RegisterForm) {
        try {
            const response = await axios.post('/api/login', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                console.log('user signed in successfully');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form onSubmit={handleSubmit((data) => {
            SendPostData(data);
        })}
            className="w-96">
            <div className="mb-5">
                <h2 className="">Sign In</h2>
                <p className="">Enter your details to sign into your account</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input id="email" autoComplete="true" type="email" {...register("email", { required: 'email is required to signin' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@tengo.com" />
                {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input autoComplete="true" id="password" type="password" {...register("password", { required: 'password is required to signin' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
            <div className="mt-4 text-center text-sm">
                Don't have an account?
                <Link className="underline ml-2" href="/signup">
                    Sign Up
                </Link>
            </div>
        </ form>
    )
}