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

export default function TodoData({
    item,
    setState
}: {
    item: Todo
    setState: React.Dispatch<React.SetStateAction<MainStateType>>
}) {


    async function handleDeleteTodo(todoId:string, title:string) {
       if (window.confirm("Want to delete this todo: " + title)) {
            setState(prev => ({...prev, loading:true}))
            // Call Api Here
       }
    }

    return (
        <div
            className="flex justify-between p-4 items-center border-b  hover:shadow-md drop-shadow-xl">
            <div className="flex items-center">
                <div className="">
                    <Image
                        alt="hello"
                        src={""}
                    />
                </div>

                <h6 className="text-base font-medium">{item.title}</h6>
            </div>

            <div className="flex gap-1 items-center">
                <h6 className="px-1 bg-red-500 rounded-md text-white mx-2">{item.status}</h6>

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
