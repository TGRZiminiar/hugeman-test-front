"use client"

import { Button } from "@/components/ui/Button/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog/Dialog"
import { Icon } from "@iconify/react/dist/iconify.js"
import moment from "moment"
import Image from "next/image"
import { useState } from "react"
export default function Cpage() {

    const mockData = [
        {
            _id: "asdasd",
            title: "test",
            description: "test",
            created_at: new Date(),
            updated_at: "test",
            image: "test",
            status: "test",
        },
        {
            _id: "asdasd",
            title: "test",
            description: "test",
            created_at: new Date(),
            updated_at: "test",
            image: "test",
            status: "test",
        },
    ]

    const [state, setState] = useState({
        dialogNewTask: false,
        
    })

    return (
        <>
        
        
        <div className="my-16">
            <button
                className="flex gap-2 items-center text-primary border w-full px-4 py-2 rounded-lg hover:bg-slate-50/80 shadow-sm hover:shadow-md"
            >
                <Icon
                    icon={"ic:baseline-plus"}
                    className="text-lg"
                />
                <h6 className="text-slate-500 text-lg">Add New Task</h6>
            </button>

            <div className="flex flex-col gap-4 mt-8">
            {mockData.map((item, i) => (
                <div 
                key={i}
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
                        <Icon
                            icon={"mingcute:right-fill"}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

            ))}
            </div>
        </div>

        <Dialog  
                // open={true}
                // onOpenChange={handleChangeOpenDialog}
                >
                    <DialogTrigger
                    >
                        <div
                            className="flex gap-2 items-center bg-darkG hover:bg-darkG/90 p-2 px-4 text-white rounded-full"
                        >
                            <h6 className="">Log In</h6>
                            <Icon
                                icon={"bxs:user"}
                                className="text-white w-6  h-6"
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold mb-4">Login</DialogTitle>
                            <DialogDescription className="flex flex-col gap-4">
                                
                                <div className="flex flex-col gap-2">
                                    <h6 className="text-slate-700 font-medium text-lg">Email</h6>
                                    {/* <InputRef
                                    placeholder="Email"
                                    ref={emailRef}
                                    type="email"
                                    /> */}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h6 className="text-slate-700 font-medium text-lg">Password</h6>
                                    {/* <InputRef
                                    placeholder="Password"
                                    ref={passwordRef}
                                    type="password"
                                    /> */}
                                </div>

                                <div className="flex justify-end cursor-pointer"  >
                                    {/* <h6 className="text-blue-500 font-medium text-xs" onClick={handleSwapReg}>Don't have account? Register</h6> */}
                                </div>

                                <Button
                                // onClick={handleLogin}
                                type="button"
                                variant={"primary"}
                                >
                                    <h6 className="text-xl font-semibold">Login</h6>
                                </Button>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

       
        </>
    )

}
