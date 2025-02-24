"use client";
import { RegisterForm } from "@/app/types/types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

export function Form() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterForm>({
        defaultValues: { email: '', password: '', firstName: '', lastName: '' }
    });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const namePattern = /^[a-zA-Z]+$/;

    async function SendPostData(data: RegisterForm) {
        try {
            const response = await axios.post('/api/signup', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                console.log('user created successfully');
            }
        } catch (err: any) {
            toast(err.response.data.message, {
                position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            });
        }
    }
    return (
        <form onSubmit={handleSubmit((data) => {
            SendPostData(data);
            reset({ email: '', password: '', firstName: '', lastName: '' });
        })}
            className="w-96">
            <div className="mb-5">
                <h2 className=" ">Sign Up</h2>
                <p className="">Enter your details to create a new account</p>
            </div>
            <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                <input id="firstName" {...register("firstName", { required: 'email is required to register', pattern: { value: namePattern, message: 'invalid firstName pattern' } })}
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="firstName" />
                {errors.email && <p className="text-red-500">{errors.firstName?.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                <input id="lastName" {...register("lastName", { required: 'lastName is required to register', pattern: { value: namePattern, message: 'invalid lastName pattern' } })}
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lastName" />
                {errors.lastName && <p className="text-red-500">{errors.lastName?.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input id="email" {...register("email", { required: 'email is required to register', pattern: { value: emailPattern, message: 'invalid email pattern' } })}
                    autoComplete="true" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@tengo.com" />
                {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input id="password" {...register("password", { required: 'password is required to register', pattern: { value: passwordPattern, message: 'password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number' } })}
                    type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
            <ToastContainer />
        </form>
    )
}