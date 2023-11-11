"use client"

import React, { useEffect, useRef, useState } from "react"
import { MainStateType, Todo } from "../TodoType"
import TodoData from "./TodoData"
import AddTodoBtn from "./AddTodoBtn"
import DialogUpdate from "./DialogUpdate"
import { makeRequest } from "@/lib/makeRequest"
import { Circular } from "@/components/Loading/Circular"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/Select"
import Input from "@/components/Input/Input"

export default function Cpage() {


    const [state, setState] = useState<MainStateType>({
        dialogNewTask: false,
        loading: false,
        todo: {
            _id: "",
            title: "",
            description: "",
            created_at: new Date(),
            updated_at: new Date(),
            image: "",
            status: "",
        },
        todos: [],
        sort: "",
        search:"",
    })


    async function loadTodo() {
        const { data, error } = await makeRequest<Todo[]>("/list-todo", {
            method: "GET"
        })
        if (data) {
            setState(prev => ({ ...prev, todos: data }))
        }
    }

    useEffect(() => {
        loadTodo()
    }, [])

    const searchRef = useRef<HTMLInputElement | null>(null)


    return (
        <>


            <div className="my-16">

                <AddTodoBtn
                    state={state}
                    setState={setState}
                />

               {/*  <div className="flex justify-between gap-4 items-center w-full">

                    
                    <div className="w-2/3">
                        <Input
                        value={state.search}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, search:e.target.value}))}
                        type="search"
                        placeholder="Search Todo"
                        icon="material-symbols:search"
                        iconClassName="text-xl"
                        className="border w-full placeholder-slate-500 text-slate-600 focus:ring transition-all ring-lightG outline-none focus:outline-none  px-3 py-3  relative  rounded text-sm h-10"
                        />
                    </div>

                    <div className="w-1/3 my-8">
                        <Select
                        // value={subState.status}
                        // onValueChange={(status: string) => setSubState(prev => ({ ...prev, status: status }))}
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Todo Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-8">
                    {state.todos.length !== 0 && state.todos.map((item, i) => (
                        <div
                            key={i}
                            className=""
                        >

                            <TodoData
                                key={i}
                                item={item}
                                setState={setState}
                            />
                        </div>
                    ))}
                </div>

                {state.todo._id &&
                    <DialogUpdate
                        state={state}
                        setState={setState}
                    />
                }

            </div>

            <Circular
                loading={state.loading}
            />


        </>
    )

}
