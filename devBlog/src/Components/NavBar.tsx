import { CAvatar } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
import { Link } from "react-router-dom";
interface type{name:string;}
export function NavBar({name}:type){
    return<div className="border-y flex justify-between py-2 px-2">
        <div className="flex gap-4">

                    <Link to={`/blogs`}>
                        <p className="text-xl font-bold text-gray-800 text-center ">devNotes</p>
                    </Link>

                    <div className="flex items-center">
                <nav className="flex gap-2">
                    <Link to={`/createBlog`}>
                    <button className="text-xs font-bold cursor-pointer text-white bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">CreateBlog</button>
                    </Link>
                </nav>
             </div>

        </div>
        <div className="">
            <CAvatar color="dark" className="" textColor="white" >{`${name.charAt(0)}`}</CAvatar>

        </div>
        
    </div>
}