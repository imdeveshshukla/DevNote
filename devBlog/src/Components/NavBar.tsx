import { CAvatar } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
interface type{name:string;}
export function NavBar(){
    const { isAuth,name } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const a = name.charAt(0);
    function handleLogout(): void {
        localStorage.removeItem("token");
    }

    return(<div className="border-y flex justify-between py-2 px-2">
        <div className="flex gap-4">

                    <Link to={`/`}>
                        <p className="text-xl font-bold text-gray-800 text-center ">devNotes</p>
                    </Link>

                    <div className="flex items-center">
                <nav className="flex gap-2">
                {isAuth ? (
                        <Link to="/createBlog">
                            <button className="text-xs font-bold cursor-pointer text-white bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Create Blog</button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="text-xs font-bold cursor-pointer text-white bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Sign Up</button>
                            </Link>
                            <Link to="/signin">
                                <button className="text-xs font-bold cursor-pointer text-white bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Sign In</button>
                            </Link>
                        </>
                    )}
                </nav>
             </div>

        </div>
        <div className="">
        {name!=""?
        // <CAvatar color="dark" className="" textColor="white" >{a}</CAvatar>
        <div className="relative" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full cursor-pointer">{name.charAt(0)}</div>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                                <button onClick={handleLogout
                                } className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left">Logout</button>
                            </div>
                        )}
        </div>
        :<></>}

        
        </div>
        </div>
        )
}