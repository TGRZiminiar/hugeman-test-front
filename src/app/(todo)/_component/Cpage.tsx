"use client"

import { useState } from "react"
import { MainStateType, Todo } from "../TodoType"
import TodoData from "./TodoData"
import AddTodoBtn from "./AddTodoBtn"
import DialogUpdate from "./DialogUpdate"

const mockData:Todo[] = [
    {
        _id: "asdasd",
        title: "test",
        description: "test",
        created_at: new Date(),
        updated_at: "test",
        image: "",
        status: "COMPLETED",
    },
    {
        _id: "asdasd",
        title: "test",
        description: "test",
        created_at: new Date(),
        updated_at: "test",
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
            updated_at: "",
            image: "",
            status: "",
        },
        todos: [],
    })


    

    return (
        <>
        
        
        <div className="my-16">
            
            <AddTodoBtn
            state={state}
            setState={setState}
            />

            <div className="flex flex-col gap-4 mt-8">
            {mockData.map((item, i) => (
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

       
       
        </>
    )

}
