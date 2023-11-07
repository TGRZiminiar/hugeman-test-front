"use client"

import Image from "next/image"
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/DropDownComp/DropDown-Menu";

import { useEffect, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import NavbarItem from "./_component/1NavbarItem";


export default function Navbar() {


    const path = usePathname();

    const [state, setState] = useState<any>({
        path: 0,
    })

    const icon = [
        {
            icon: "ph:heart-light",
            iconClassName: "w-8 h-8",
            link: "/"
        },
        {
            icon: "circum:search",
            iconClassName: "w-8 h-8",
            link: "/product"
        },
        {
            icon: "ph:shopping-cart-thin",
            iconClassName: "w-8 h-8 relative",
            link: "/"
        },
    ]


 
  


    return (
        <div className="h-[6rem] w-full shadow-lg flex items-center justify-between gap-4 px-2 lg:px-8 xl:px-16 sticky top-0 z-40 bg-white">

            <Link href={"/"} className="relative w-32 h-16 items-center flex text-navH">
                Todo Hugeman
            </Link>


            

            <div className="flex gap-8">

                <div className="hidden min-[1024px]:flex gap-4 border-r-2 border-[#494B47] px-4 items-center ">
                    {icon.map((item, i) => (
                        <React.Fragment key={i}>

                        {!item.icon.includes("cart") ?
                                <Link
                                    href={item.link}
                                    key={i}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className={item.iconClassName}
                                    />
                                </Link>
                                :
                                <div className="relative">
                                    <Link href={"/cart"}>
                                        <Icon
                                            icon={item.icon}
                                            className={item.iconClassName}
                                        />
                                        <div className="absolute bg-[#FF6636] -top-2 -right-1/3 text-white font-semibold rounded-full text-xs w-6 h-6 flex justify-center">
                                            <h6 className="text-white self-center">25</h6>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </React.Fragment>

                    ))}
                </div>

              <NavbarItem
              state={state}
              setState={setState}
              />




            </div>

        </div>

    )

}