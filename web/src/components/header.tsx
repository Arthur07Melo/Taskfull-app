import logo from "../assets/taskfull-logo.svg"
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"
import { TaskAdder } from "./taskAdder";



export default function Header(){
    return(
        <div className="w-full mx-auto max-w-3xl flex justify-between items-center">
            <img src={logo} alt="loading..." />

            <Dialog.Root>
                <Dialog.Trigger className="border border-sky-700 rounded-lg px-6 py-4 max-h-14 font-semibold hover:border-sky-500">
                    New Task
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0"/>

                    <Dialog.Content className="absolute p-10 rounded-2xl text-white bg-zinc-900 w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Dialog.Close className="absolute top-6 right-6 text-zinc-700 rounded-2xl hover:text-zinc-300">
                            <X size={24} className="cursor-pointer" aria-label="fechar"/>
                        </Dialog.Close>

                        <Dialog.Title className="text-4xl font-bold">Add new task</Dialog.Title>

                        <TaskAdder />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            
        </div>
    )
}