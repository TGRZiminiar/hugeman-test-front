"use client";
import Sidebar from "./Sidebar";

export default function NavbarItem({
    state,
    setState
}:{
    state:any;
    setState: React.Dispatch<React.SetStateAction<any>>
}) {


  

    return (
        <>
            <div className="flex gap-4 text-lg font-medium items-center">
                

                {/* Hamburger Mobile */}

                <div className="flex min-[1024px]:hidden items-center">
                    <Sidebar
                        state={state}
                        setState={setState}
                    />

                </div>

                
            </div>
        </>
    );
}
