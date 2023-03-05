import React, { useState, useEffect } from "react";
import { api } from "../lib/axios";


type PostType = {
    id: string
    title: string
    description: string
    created_at: string
}


export function Tasks() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/habit")
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [])


    return (
        <div className="max-w-2xl justify-center items-center">
            <h1 className="text-xl py-4">Today's tasks: </h1>
            <ul>
                {posts.map((post:PostType, i)=>(
                    <li className="flex flex-col relative border border-gray-600 justify-between" key={i}>   
                        <input type="checkbox" className="peer absolute opacity-0 h-6 inset-x-0 cursor-pointer" />
                        <h1 className="px-4 float-left text-lg font-semibold">{post.title}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="
                        absolute right-3 w-6 h-6 mr-auto transition-transform duration-500 peer-checked:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>


                        <div className="overflow-hidden bg-zinc-800 bg-opacity-50 transition-all duration-500 flex flex-col px-4 max-h-0 peer-checked:max-h-40" id="content">
                            <p className="">{post.description}</p>
                            <button className="ml-auto max-w-fit text-red-700" onClick={() => {
                                api.delete(`/habit/${post.id}`);
                                window.location.reload();
                            }}>delete</button>
                        </div>
                        
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}