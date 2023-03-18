import logo from "../assets/taskfull-logo.svg"
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../lib/axios";

type formValues = {
    username: string,
    email: string,
    password: string
}

export default function SignupPage() {
    const {handleSubmit, register} = useForm<formValues>()

    const onSubmit: SubmitHandler<formValues> = (data) => {
        api.post("/user/signup", {
            username: data.username,
            email: data.email,
            password: data.password
        }).then((response) => {
            if(response.status === 201){
                window.alert("User created");
                window.location.reload();
            }
        }).catch((err) => window.alert(err));
    }

    const buttonHandler = () => {
        window.location.reload();
    }


    return (
        <div className="flex flex-col justify-center">
            <img src={logo} alt="logo" className="mb-10"/>
            <h1 className="text-xl font-bold">SIGNUP</h1>
            <form className="flex flex-col justify-center gap-2 font-semibold" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username:</label>
                <input className="rounded-lg bg-zinc-700 py-1 pl-2" placeholder="type your username..." type="text" {...register("username")}/>
                <label htmlFor="username">Email:</label>
                <input className="rounded-lg bg-zinc-700 py-1 pl-2" placeholder="type your email..." type="text" {...register("email")} /> 
                <label htmlFor="username">Password:</label>
                <input className="rounded-lg bg-zinc-700 py-1 pl-2" placeholder="type your password..." type="password" {...register("password")} />
                <button type="submit" className="border border-gray-300 bg-green-600 rounded-lg py-1 px-36 hover:bg-green-500">Signup</button>
            </form>
            <h1 className="text-sm">Do you have an account? <button onClick={buttonHandler} className="text-blue-700">login</button></h1>
        </div>
    )
}