import { useState } from "react";
import { Input } from "../Components/Input";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../Components/Heading";
import axios from "axios";
import { SignInInput } from "@imdeveshshukla/common-app";
import { BACKEND_URL, LOCOL_BACKEND_URL } from "../config";

export function Signin(){
  const navigate = useNavigate();
    const [postInp,SetPostInp] = useState<SignInInput>({
      username:"",
      pass:""
    })
    const [error,SetError] = useState("Signed In");
    const handleUsername = (value: string) => {
        SetPostInp({
          ...postInp,
          username:value
        });
      };
    const handlePass = (value: string) => {
      SetPostInp({
        ...postInp,
        pass:value
      });
    };
    async function click(){
      try{
        const res = await axios.post(`${LOCOL_BACKEND_URL}/api/v1/user/signin`,postInp);
        console.log(res.data);
        if(res.data.msg!="Signed In")
        {
          SetError(res.data.msg);
        }
        else{
          const jwt = res.data.JWT;
          localStorage.setItem("token",jwt);
          navigate("/blogs")
        }
      }
      catch(err){
        console.log({err});
      }
    }
    return<div className="flex flex-col justify-center w-full h-screen">

        {/* <p>{JSON.stringify(postInp)}</p>   */}
          <div className="self-center w-48">

          <Heading level="1">Sign In</Heading>
          {error=="Signed In"?null:<div className="bg-red-600 rounded-md text-slate-100 text-center">{error}</div>}
          <div className="text-center">
            <p className="p-0 m-0 inline text-xs text-center text-slate-500">Don't Have an Account?</p>
            <Link to="/signup" className="text-xs text-slate-500 pl-1 underline">Create One</Link>
          </div>
          </div>
        <div className="self-center">
            <Input label="Username" placeholder="abc@example.com"  value={postInp.username} type={"text"} onChange={handleUsername}/>
            <Input label="Password" placeholder="Enter your Password" value={postInp.pass} type="password" onChange={handlePass}/>
            <button className="bg-slate-950 w-full hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={click}>Sign In</button>
        </div>

    </div>
}