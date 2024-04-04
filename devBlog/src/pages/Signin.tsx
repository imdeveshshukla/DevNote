import { ChangeEvent, useState } from "react";
import { Input } from "../Components/Input";

export function Signin(){
    const [username,setUsername] = useState("");
    const [pass,setPass] = useState("");
    const handleUsername = (value: string) => {
        setUsername(value);
      };
      const handlePass = (value: string) => {
        setPass(value);
      };
    return<div className="flex justify-center w-full h-screen">

        <div className="self-center">
            <Input label="Username" placeholder="Enter your Username" value={username} onChange={handleUsername}/>
            <Input label="Password" placeholder="Enter your Password" value={pass} onChange={handlePass}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handlePass}>Sign In</button>
        </div>

    </div>
}