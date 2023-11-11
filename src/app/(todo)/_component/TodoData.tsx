"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
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
        <div className="flex flex-col gap-2 border rounded-lg p-4">

            <h6 className="text-2xl font-medium">
                {item.title}
            </h6>

            <div className="mx-auto">
                {item.image.length > 25 &&
                    <img
                        alt="hello"
                        src={item.image}
                        className="w-48 h-60 object-fill rounded-sm"
                    />
                }
            </div>

            <h6 className="text-base font-medium text-slate-700">
                {item.description}
                
            </h6>

                <div className={`w-full px-1 py-2 text-center rounded-sm ${item.status === "COMPLETED" ? "bg-green-500 hover:bg-green-400" : "bg-amber-500 hover:bg-amber-400"} text-white cursor-pointer`}>
                   <h6 className="text-sm">{item.status}</h6>
                </div>
            <div className="flex justify-between gap-2">
                

                <div className="flex flex-col gap-0.5 text-xs">

                    <div className="flex gap-2">
                        <h6 className=" text-slate-600">
                            CreatedAt:
                        </h6>
                        <h6 className="text-slate-400 ">
                            {moment(item.created_at).format("ll")}
                        </h6>
                    </div>

                    <div className="flex gap-2">
                        <h6 className=" text-slate-600">
                            UpdatedAt:
                        </h6>
                        <h6 className="text-slate-400 ">
                            {moment(item.updated_at).format("ll")}
                        </h6>
                    </div>
                </div>

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
