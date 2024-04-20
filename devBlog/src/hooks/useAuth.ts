import axios from "axios";
import { useEffect, useState } from "react";
import { LOCOL_BACKEND_URL } from "../config";

export function useAuth(){
    const [isAuth,setAuth] = useState(false);
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState(null)

    useEffect(() => {
        setLoading(true);
      (async function name() {

        const res = await axios.get(`${LOCOL_BACKEND_URL}/api/v1/user/refresh`,
            {
                'headers':{
                    'authorization':`Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        

        if(res.data.id)
        {
            setAuth(true);
            setName(res.data.name.name)
        }
        else{
            setErr(res.data.msg);
            console.log(res.data.msg);
        }
      })()

      setLoading(false)
    }, [])
    

    return { isAuth,name,loading,err }

}