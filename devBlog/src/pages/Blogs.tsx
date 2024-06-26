import { useEffect, useState } from "react";
import { BlogPageCard } from "../Components/BlogPageCard";
import axios from "axios";
import { LOCOL_BACKEND_URL } from "../config";
import { BlogSkelton } from "../Components/BlogSkelton";
import { useNavigate } from "react-router-dom";
import { StartUp } from "../Components/StartUp";

export function Blogs(){
    const [blog,setBlog] = useState([]);
    const nav = useNavigate();
    const [loading,setLoading] = useState(true);
    interface dataType{
        "id": Number;
        "author": {name:string};
        "content": string;
        "thumbnail": string;
        "title": string;
        "date": string;
        "published": Boolean;
    }
    useEffect(()=>{
        axios.get(`${LOCOL_BACKEND_URL}/api/v1/blog/bulk`,
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
            nav("/");
        })
    },[])
    let count  =0;
    if(loading)return(
        <>
            <BlogSkelton/>
            <BlogSkelton/>
            <BlogSkelton/>
            <BlogSkelton/>
            <BlogSkelton/>
        </>

    )
    if(blog.length == 0)
        return <StartUp img="welcome" note="Write your first thought..."/>

    return<div className="">
    {blog.map((data:dataType)=>{
        {count++;}
       return <BlogPageCard key={count} id={data.id} date={data.date} content={data.content} title={data.title} />
    })}
        
    </div>
}