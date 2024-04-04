import { useState } from "react"
import Input from "../Components/Input";
import Heading from "../Components/Heading";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInput } from "@imdeveshshukla/common-app";
import axios from "axios";
import { LOCOL_BACKEND_URL } from "../config";

export function Signup(){
    const [postInp,SetPostInp] = useState<SignUpInput>({
        name:"",
        username:"",
        pass:""
    })
    const navigate = useNavigate();
    const [error,SetError] = useState("Created");
    async function click(){
        try{
            const res = await axios.post(`${LOCOL_BACKEND_URL}/api/v1/user/signup`,postInp);
            console.log(res.data);
            if(res.data.msg!="Created")
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
    return(
        <div className="flex flex-col justify-center w-full h-screen">

        <div className="self-center w-64">

            <Heading level="1">Create an account</Heading>
            {error=="Created"?null:<div className="bg-red-600 rounded-md text-slate-100 text-center">{error}</div>}
            <div className="text-center">
                <p className="p-0 m-0 inline text-xs text-slate-500">Already Have an Account?</p>
                <Link to="/signin" className="text-xs text-slate-500 pl-1 underline">Login</Link>
            </div>
            </div>
            <div className="self-center">
                    <Input label={"Name"} placeholder={"Alice Luthar"} value={postInp.name} type="text" onChange={(val:string)=>SetPostInp({...postInp,name:val})}/>
                    <Input label={"Username"} placeholder={"alice@example.com"} value={postInp.username} type="text" onChange={(val:string)=>SetPostInp({...postInp,username:val})}/>
                    <Input label={"Password"} placeholder={"Enter Your Password"} value={postInp.pass} type="password" onChange={(val:string)=>SetPostInp({...postInp,pass:val})}/>
                    <button className="bg-slate-950 w-full hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={click}>Sign Up</button>
            
            </div>

        </div>)

}