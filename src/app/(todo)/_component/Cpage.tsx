"use client"

import { useEffect, useState } from "react"
import { MainStateType, Todo } from "../TodoType"
import TodoData from "./TodoData"
import AddTodoBtn from "./AddTodoBtn"
import DialogUpdate from "./DialogUpdate"
import { Circular } from "@/components/Loading/Circular"
import { makeRequest } from "@/lib/makeRequest"

const mockData:Todo[] = [
    {
        _id: "asdasd",
        title: "test",
        description: "test",
        created_at: new Date(),
        updated_at: new Date(),
        image: "",
        status: "COMPLETED",
    },
    {
        _id: "asdasd",
        title: "test",
        description: "test",
        created_at: new Date(),
        updated_at: new Date(),
        image: "",
        status: "IN_PROGRESS",
    },
]


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
    })

    
    async function loadTodo() {
        const {data, error} = await makeRequest<Todo[]>("/list-todo", {
            method:"GET"
        })
        if (data) {
            setState(prev => ({...prev, todos: data}))
        }
    }

    useEffect(() => {
        loadTodo()
    }, [])



    return (
        <>
        
        
        <div className="my-16">
            
            <AddTodoBtn
            state={state}
            setState={setState}
            />

            <div className="flex flex-col gap-4 mt-8">
            {state.todos.length !== 0 && state.todos.map((item, i) => (
               <TodoData
               key={i}
               item={item}
               setState={setState}
               />
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
