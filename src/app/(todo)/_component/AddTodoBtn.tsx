"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog/Dialog"
import { Button } from "@/components/ui/Button/Button"
import { MainStateType, SubStateType, Todo } from "../TodoType"
import InputRef from "@/components/Input/InputRef"
import { useEffect, useRef, useState } from "react"
import TextAreaRef from "@/components/Input/TextArea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/Select"
import Image from "next/image"
import { makeRequest } from "@/lib/makeRequest"
import { toast } from "react-toastify"

interface SpecialType extends SubStateType {
    open: boolean;
}

export default function AddTodoBtn({
    state,
    setState
}: {
    state: MainStateType;
    setState: React.Dispatch<React.SetStateAction<MainStateType>>

}) {

    const [subState, setSubState] = useState<SpecialType>({
        images: [],
        imageURLs: [],
        loading: false,
        status: "IN_PROGRESS",
        open: false,
    })  

    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setState(prev => ({ ...prev, loading: true }))

        const form = new FormData();
        if (!titleRef.current?.value) {
            toast.error("title is required")
            setState(prev => ({...prev, loading: false}))
        }
        else if (!descriptionRef.current?.value) {
            toast.error("description is required")
            setState(prev => ({...prev, loading: false}))
        }
        else if (!subState.status) {
            toast.error("status is required")
            setState(prev => ({...prev, loading: false}))
        }
        else {
            form.append("description", descriptionRef.current?.value as string)
            form.append("title", titleRef.current?.value as string)
            form.append("image", subState.images[0])
            form.append("status", subState.status)
            
            const { data, error } = await makeRequest<Todo>("/todo", {
                    method: "POST",
                    data: form
            })

            if (error || !data) {
                toast.error(error || "Error Please Try Again Later")
                setState(prev => ({ ...prev, loading: false }))
            }

            else {
                toast.success("Create Todo Success")
                setState(prev => ({ ...prev, loading: false, todo:{
                    _id: "",
                    title: "",
                    description: "",
                    created_at: new Date(),
                    updated_at: new Date(),
                    image: "",
                    status: "",
                },
                todos:[data, ...prev.todos]
            }))
                
            }
        }
    }


    function removeElement(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.preventDefault();

        if (subState.imageURLs.length === 0) {
            // toast.error("คุณไม่มีหน้าที่จะลบ");
            return;
        }
        else {
            setSubState(prev => ({ ...prev, imageURLs: [], images: [] }))
        }

    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        //@ts-ignore
        setSubState(prev => ({ ...prev, images: [...e.target.files] }))

    }


    useEffect(() => {
        if (subState.images.length < 1) return;
        //@ts-ignore
        const newImageUrls = [];
        //@ts-ignore
        subState.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        //@ts-ignore
        setSubState(prev => ({ ...prev, imageURLs: newImageUrls }))
    }, [subState.images]);

    const handleChangeOpenDialog = (open:boolean) => {
        setSubState(prev => ({...prev, open:open}))
    }

    return (

        <>

            <Dialog
            open={subState.open}
            onOpenChange={handleChangeOpenDialog}
            >
                <DialogTrigger
                    className="flex gap-2 items-center text-primary border w-full px-4 py-2 rounded-lg hover:bg-slate-50/80 shadow-sm hover:shadow-md"
                >
                    <Icon
                        icon={"ic:baseline-plus"}
                        className="text-lg"
                    />
                    <h6 className="text-slate-500 text-lg">Add New Task</h6>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold mb-4">Create New Todo List</DialogTitle>
                        <div
                            className="flex flex-col gap-4"
                        >

                            <div className="flex flex-col gap-2">
                                <h6 className="text-slate-700 font-medium text-lg">Title</h6>
                                <InputRef
                                    placeholder="Title"
                                    ref={titleRef}
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h6 className="text-slate-700 font-medium text-lg">Description</h6>
                                <TextAreaRef
                                    placeholder="Description"
                                    ref={descriptionRef}
                                    type="text"
                                />
                            </div>


                            <div className="flex flex-col gap-2">
                                <h6 className="text-slate-700 font-medium text-lg">Status</h6>
                                <Select
                                    defaultValue={subState.status}
                                    onValueChange={(status: string) => setSubState(prev => ({ ...prev, status: status }))}
                                    
                                >
                                    <SelectTrigger

                                        className="">
                                        <SelectValue
                                            placeholder="Select Todo Status"

                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem disabled={true} value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                        <SelectItem disabled={true} value="COMPLETED">COMPLETED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-4 mt-2">
                                <label
                                    className="flex justify-between"
                                    htmlFor="dropzone-file"
                                >
                                    <div className="flex flex-col gap-2 cursor-pointer">
                                        <h6 className="text-slate-700 font-medium text-lg">Upload Image</h6>
                                    </div>

                                    <Icon icon={"mdi:camera-outline"}
                                        className="cursor-pointer h-6 w-6 dark:text-slate-300 text-slate-600 hover:text-red-500 dark:hover:text-red-500" />
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        multiple={false}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>

                                {subState.imageURLs[0] &&
                                    <div className="relative w-[10rem] h-[14rem] ">
                                        <Icon icon={"mdi:trash"}
                                            className="absolute top-2 right-2 cursor-pointer h-6 w-6 text-slate-600 hover:text-red-500 z-50 bg-white rounded-full"
                                            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => removeElement(e)} />
                                        <Image
                                            fill
                                            alt="upload image"
                                            className={`w-full h-full cursor-pointer z-10`}
                                            src={subState.imageURLs[0]}
                                        />
                                    </div>
                                }
                            </div>

                            <Button
                                onClick={handleSubmit}
                                type="button"
                                variant={"primary"}
                            >
                                <h6 className="text-xl font-semibold">Create Todo List</h6>
                            </Button>

                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>

    )

}
