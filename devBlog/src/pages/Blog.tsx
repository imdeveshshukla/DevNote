import axios from "axios";
import { useState,useEffect } from "react"
import { LOCOL_BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { BlogSkelton } from "../Components/BlogSkelton";
import { ShowBlogSkelton } from "../Components/ShowBlogSkelton";
import { ShowBlog } from "../Components/ShowBlog";


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
    // useEffect(()=>{
    //     axios.get(`${LOCOL_BACKEND_URL}/api/v1/blog/${id}`,
    //         {
    //             'headers':{
    //                 'authorization':`Bearer ${localStorage.getItem("token")}`
    //             }
    //         }
    //     )
    //     .then((res)=>{

    //         console.log(res.data);
    //         setBlog(res.data);
    //         setLoading(false);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // },[])
    // if(laoding) return(<>
    //     <ShowBlogSkelton/>
    //     </>);
    return <ShowBlog id={Number(id)}/>
}