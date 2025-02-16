"use client";
import { RegisterForm } from "@/app/types/types";
import { useForm } from "react-hook-form";

export function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterForm>({
        defaultValues: { email: '', password: '' }
    });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data);
        })}
            className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input {...register("email", { required: 'email is required to register', pattern: { value: emailPattern, message: 'invalid email pattern' } })}
                    type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@tengo.com" />
                {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input {...register("password", { required: 'password is required to register', pattern: { value: passwordPattern, message: 'password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number' } })}
                    type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
        </form>
    )
}