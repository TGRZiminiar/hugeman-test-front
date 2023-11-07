"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/Sheet/Sheet"
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
export default function Sidebar({
    state,
    setState
}:{
    state:any,
    setState:React.Dispatch<React.SetStateAction<any>>
}) {

    function handleOpenAuthDialog(login:boolean, register:boolean) {
        // setState(prev => ({...prev, dialogLogin:login, dialogRegister:register}))
    }


    return (
        <>
            <Sheet
            >
                <SheetTrigger>
                    <Icon
                        icon={"basil:menu-outline"}
                        className="w-8 h-8"
                    />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <div className="p-6">
                                <h6 className="text-slate-500 text-xl font-medium">Todo Hugeman</h6>
                            </div>
                        </SheetTitle>
                        <SheetDescription className="flex flex-col gap-8 px-6 text-slate-600">
                            <Link href="/" className=" px-2 h-full flex items-center cursor-pointer text-lg font-medium">Home</Link>

                            <Link href="/blog" className=" px-2 h-full flex items-center cursor-pointer hover:text-navH/75 text-lg font-medium">Blog</Link>
                            <Link href="/contact"  className=" px-2 h-full flex items-center cursor-pointer hover:text-navH/75 text-lg font-medium">Contact</Link>

                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                        <div className=""></div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );

}