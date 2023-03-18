import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import logo from "../assets/taskfull-logo.svg";
import SignupPage from "./signupPage";
import { api } from "../lib/axios";

type formValues = {
    email: string,
    password: string
}


type propsType = {
    onSubmit: SubmitHandler<formValues>,
    message: string
}

export default function LoginPopover(props: propsType) {
    const {register, handleSubmit} = useForm<formValues>();
    const [cadastred, setCadastred] = useState(true);

    

    return(
        <div className="w-full h-full flex flex-col items-center justify-center text-lg">

        {!cadastred && 
            <SignupPage />
        }

        {cadastred && 
        <div className="flex flex-col justify-center">
            <img src={logo} alt="logo" className="mb-10" />
            <form action="" className="flex flex-col gap-2 font-semibold" onSubmit={handleSubmit(props.onSubmit)}>
                <label htmlFor="email">Email: </label>
                <input type="text" {...register("email")} name="email" placeholder="Type your email..." className="rounded-lg bg-zinc-700 py-1 pl-2"/>
                <label htmlFor="email">Password: </label>
                <input type="password" {...register("password")} placeholder="Type your password..." name="password" className="rounded-lg bg-zinc-700 py-1 pl-2"/>
                <button type="submit" className="border border-gray-300 bg-green-600 rounded-lg py-1 px-36 hover:bg-green-500">Login</button>
            </form>
            <h1 className="text-sm">Do not have an account? <button onClick={() => {setCadastred(false)}} className="text-blue-700">signup</button></h1>
        </div>
        }
        </div>
    )
}