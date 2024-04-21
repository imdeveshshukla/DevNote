import '@coreui/coreui/dist/css/coreui.min.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOCOL_BACKEND_URL } from '../config';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { setAuthTrue,setAuthFalse } from '../redux/auth/isAuthSlice'


type propstpe = {
    isAuth:boolean,
    name:string
}

export function NavBar(){
    const isAuth = useSelector((state: RootState) => state.counter.value)
    const name = useSelector((state: RootState) => state.counter.name)
    const dispatch = useDispatch()




    const [showDropdown, setShowDropdown] = useState(false);
    const nav = useNavigate();
    function handleLogout(): void {
        dispatch(setAuthFalse())
        localStorage.removeItem("token");
        nav('/');
    }

    return(<div className="border-y flex justify-between py-2 px-2">
        <div className="flex gap-4">

                    <Link to={isAuth?`/blogs`:`/`}>
                        <p className="text-xl font-bold text-gray-800 text-center ">devNotes</p>
                    </Link>
                    <div className="flex items-center">
                <nav className="flex gap-2">
                {isAuth ? (
                        <Link to="/createBlog">
                            <button className="text-xs font-bold cursor-pointer text-white bg-slate-900 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Create</button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="text-xs font-bold cursor-pointer text-white bg-slate-900 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Sign Up</button>
                            </Link>
                            <Link to="/signin">
                                <button className="text-xs font-bold cursor-pointer text-white bg-slate-900 hover:bg-slate-600 focus:ring-4 focus:ring-blue-100 rounded-lg px-2 py-1">Sign In</button>
                            </Link>
                        </>
                    )}
                </nav>
             </div>

        </div>
        <div className="">
        {isAuth?
        // <CAvatar color="dark" className="" textColor="white" >{a}</CAvatar>
        <div className="relative" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full cursor-pointer">{name.charAt(0)}</div>
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