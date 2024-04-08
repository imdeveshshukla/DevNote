import { useEffect, useState } from "react";
import { BlogPageCard } from "../Components/BlogPageCard";
import axios from "axios";
import { LOCOL_BACKEND_URL } from "../config";

export function Blogs(){
    const [blog,setBlog] = useState([]);
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
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return<div>
    {blog.map((data:dataType)=>{
       return <BlogPageCard name={data.author.name} date={data.date} content={data.content} title={data.title} />
    })}
        
    </div>
}