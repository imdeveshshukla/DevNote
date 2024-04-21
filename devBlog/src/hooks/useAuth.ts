import axios from "axios";
import { useEffect, useState } from "react";
import { LOCOL_BACKEND_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuthTrue, setname } from "../redux/auth/isAuthSlice";

export function useAuth(){
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.counter.value)
    const name = useSelector((state: RootState) => state.counter.name)
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
            dispatch(setAuthTrue());
            dispatch(setname(res.data.name.name));
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