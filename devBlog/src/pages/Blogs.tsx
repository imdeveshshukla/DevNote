import { useEffect, useState } from "react";
import { BlogPageCard } from "../Components/BlogPageCard";
import axios from "axios";
import { LOCOL_BACKEND_URL } from "../config";

export function Blogs(){
    const [blog,setBlog] = useState([]);

    useEffect(()=>{
        axios.get(`${LOCOL_BACKEND_URL}/api/v1/blog/bulk`)
        .then((res)=>{
            setBlog(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return<>

        blog.map((data)=.{
            <BlogPageCard name={data.name} date="Mar 28,2023" title="Create a website" content="fdjkfahfkdfjkaxncj/dafadkjfalkdfjaldfkjadkffdjkfahfkdfjkaxncj/dafadkjfalkdfjaldfkjadkffdjkfahfkdfjkaxncj/dafadkjfalkdfjaldfkjadkffdjkfahfkdfjkaxncj/dafadkjfalkdfjaldfkjadkf"/>

        })
        
    </>
}