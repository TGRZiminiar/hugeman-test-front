"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import { MainStateType, Todo } from "../TodoType"
import moment from "moment"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropDownComp/DropDown-Menu"
import { makeRequest } from "@/lib/makeRequest"
import { toast } from "react-toastify"

export default function TodoData({
    item,
    setState
}: {
    item: Todo
    setState: React.Dispatch<React.SetStateAction<MainStateType>>
}) {


    async function handleDeleteTodo(todoId: string, title: string) {
        if (window.confirm("Want to delete this todo: " + title)) {
            setState(prev => ({ ...prev, loading: true }))
            const { data, error } = await makeRequest(`/todo/${todoId}`, {
                method: "DELETE"
            })
            if (error) {
                toast.error("Can't Delete Todo List")
                setState(prev => ({ ...prev, loading: false }))
            }
            else {
                setState(prev => ({ ...prev, loading: false, todos: prev.todos.filter((elem) => elem._id !== todoId) }))
            }
        }
    }



    return (
        <div
            className="flex flex-col md:flex-row justify-between p-4 items-center border-b  hover:shadow-md rounded-md  border">
            <div className="flex flex-col md:justify-center justify-start md:flex-row items-center gap-4">
                <div className="">
                    {item.image.length > 25 &&
                        <img
                            alt="hello"
                            src={item.image}
                            className="w-24 h-36 object-fill rounded-sm"
                        />
                    }
                </div>
                <h6 className="text-base font-medium">{item.title}</h6>
            </div>

            <div className="flex flex-wrap  justify-center gap-1 items-center">
                <h6 className={`px-2 py-1 rounded-md text-white mx-2 ${item.status === "IN_PROGRESS" ? "bg-amber-500" : "bg-lightG"}`}>{item.status}</h6>

                <h6 className="text-slate-400 text-sm">{moment(item.created_at).format("ll")}</h6>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Icon
                            icon={"entypo:dots-three-vertical"}
                            className="cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => setState(prev => ({ ...prev, todo: item }))}
                        >
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDeleteTodo(item._id, item.title)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    )

}
