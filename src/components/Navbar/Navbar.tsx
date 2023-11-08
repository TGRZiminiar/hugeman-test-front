"use client"

import Image from "next/image"
import { Icon } from "@iconify/react";
import Link from "next/link";


import { useEffect, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import NavbarItem from "./_component/1NavbarItem";


export default function Navbar() {


    const path = usePathname();

    const [state, setState] = useState<any>({
        path: 0,
    })

   

 
  


    return (
        <div className="h-[6rem] w-full shadow-lg flex items-center justify-between gap-4 px-2 lg:px-8 xl:px-16 sticky top-0 z-40 bg-white">

            <Link href={"/"} className="relative items-center flex text-lightG text-lg font-medium">
                Todo Hugeman
            </Link>


            

            <div className="flex gap-8">

                <div className="hidden min-[1024px]:flex gap-4 px-4 items-center ">
                    <h6 className="text-lightG text-lg font-medium">Chitsanupong Jateassavapirom</h6>
                </div>

              <NavbarItem
              state={state}
              setState={setState}
              />




            </div>

        </div>

    )

}