"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog/Dialog"
import { MainStateType, SubStateType, Todo } from "../TodoType";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputRef from "@/components/Input/InputRef";
import TextAreaRef from "@/components/Input/TextArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select/Select"
import { useEffect, useRef, useState } from "react";
import { makeRequest } from "@/lib/makeRequest";
import { toast } from "react-toastify";


export default function DialogUpdate({
    state,
    setState
}: {
    state: MainStateType
    setState: React.Dispatch<React.SetStateAction<MainStateType>>
}) {

    const { todo } = state;
    const [subState, setSubState] = useState<SubStateType>({
        images: [],
        imageURLs: [todo.image],
        loading: false,
        status: todo.status,
    })
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    console.log(subState);
    
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setState(prev => ({ ...prev, loading: true }))

        const form = new FormData();
        if (!titleRef.current?.value) {
            toast.error("title is required")
            setState(prev => ({ ...prev, loading: false }))
        }
        else if (!descriptionRef.current?.value) {
            toast.error("description is required")
            setState(prev => ({ ...prev, loading: false }))
        }
        else if (!subState.status) {
            toast.error("status is required")
            setState(prev => ({ ...prev, loading: false }))
        }
        else {
            form.append("_id", todo._id)
            form.append("description", descriptionRef.current?.value as string)
            form.append("title", titleRef.current?.value as string)
            if(subState.images.length !== 0){
                form.append("image", subState.images[0])
            }
            else {
                
                form.append("image", todo.image)
                console.log("correct function have called");
                
            }
            form.append("status", subState.status)

            const { data, error } = await makeRequest<Todo>("/todo", {
                method: "PATCH",
                data: form,
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if (error || !data) {
                toast.error(error || "Error Please Try Again Later")
                setState(prev => ({ ...prev, loading: false }))
            }
            
            else {
                toast.success("Update Todo Success")
                const {data:todosData, error} = await makeRequest<Todo[]>("/list-todo", {
                    method:"GET"
                })
                if (!todosData) {
                    toast.error(error || "Failed To Get Todo data")
                    setState(prev => ({ ...prev, loading: false }))
                }
                else {

                    setState(prev => ({
                        ...prev, 
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
                        todos: todosData,

                    }))
                }
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
        let newImageUrls: string[] = [];
        subState.images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSubState(prev => ({ ...prev, imageURLs: newImageUrls }))
    }, [subState.images]);

    

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.value = todo.title
        }
        if (descriptionRef.current) {
            descriptionRef.current.value = todo.description;
        }
    }, []);


    return (

        <>
            <Dialog
                open={state.todo._id ? true : false}
                onOpenChange={(open: boolean) => {
                    if (!open) {
                        setState(prev => ({
                            ...prev, todo: {
                                _id: "",
                                title: "",
                                description: "",
                                created_at: new Date(),
                                updated_at: new Date(),
                                image: "",
                                status: "",
                            },
                        }))
                    }
                    else return
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold mb-4">Update Todo List</DialogTitle>
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
                                    value={subState.status}
                                    onValueChange={(status: string) => setSubState(prev => ({ ...prev, status: status }))}
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

                                {subState.imageURLs[0] && subState.imageURLs[0].length > 25 &&
                                    <div className="relative w-[10rem] h-[14rem] ">
                                        <Icon icon={"mdi:trash"}
                                            className="absolute top-2 right-2 cursor-pointer h-6 w-6 text-slate-600 hover:text-red-500 z-50 bg-white rounded-full"
                                            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => removeElement(e)} />
                                        <img
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
                                <h6 className="text-xl font-semibold">Update Todo List</h6>
                            </Button>

                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>

    )

}
