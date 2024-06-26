import axios from "axios";
import { useState,useEffect } from "react"
import { LOCOL_BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { ShowBlogSkelton } from "../Components/ShowBlogSkelton";


export function Blog(){
    const[laoding,setLoading] = useState(true);
    const [blog,setBlog] = useState({
        title:"",
        content:"",
        author:{
            name:""
        },
        date:"",
    });
    const { id } = useParams();
    useEffect(()=>{
        axios.get(`${LOCOL_BACKEND_URL}/api/v1/blog/${id}`,
            {
                'headers':{
                    'authorization':`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res)=>{

            console.log(res.data);
            setBlog(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    if(laoding) return(<>
        <ShowBlogSkelton/>
        </>);
    return <div className="grid grid-cols-3 my-5 mx-3 max-sm:grid-cols-2">
    <div className="col-span-2 max-sm:w-11/12">
    <h1 className="text-2xl font-black max-sm:text-xl">{blog.title}</h1>
    <p className="text-sm text-zinc-500">{blog.date}</p>
    <div className="h-min mt-5">
        <p className="text-balance">{blog.content}</p>
    </div>
    </div>
    <div className="text-right max-sm:text-left">
    <p className="max-sm:hidden">Author</p>
    <p className="font-bold text-wrap text-clip max-sm:mt-5">
        <span className="font-light hidden max-sm:inline">By </span>
        {blog.author.name}</p>
    </div>

    </div>
}