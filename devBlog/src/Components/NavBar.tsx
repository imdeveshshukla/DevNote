import { CAvatar } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
interface type{name:string;}
export function NavBar({name}:type){
    return<div className="border-y flex justify-between py-2 px-2">
        <p className="text-xl font-bold text-gray-800 mb-2 text-center">devBlog</p>
        <nav className="flex gap-4">
            <div>Create Blog</div>
            <div>Blogs</div>
        </nav>
        <CAvatar color="dark" textColor="white" >{`${name.charAt(0)}`}</CAvatar>
        
    </div>
}