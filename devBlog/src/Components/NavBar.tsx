import { CAvatar } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
interface type{name:string;}
export function NavBar({name}:type){
    return<div className="border-y flex justify-between py-2 px-2">
        <div className="flex gap-2">
                <p className="text-xl font-bold text-gray-800 text-center">devBlog</p>
             <div className="flex items-center">

                <nav className="flex gap-2">
                    <div className="font-medium">CreateBlog</div>
                    <div className="font-medium">Blogs</div>
                </nav>
             </div>

        </div>
        <div className="">
            <CAvatar color="dark" className="" textColor="white" >{`${name.charAt(0)}`}</CAvatar>

        </div>
        
    </div>
}