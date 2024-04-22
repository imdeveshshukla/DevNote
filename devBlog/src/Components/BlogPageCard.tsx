import { Link } from "react-router-dom";

interface blog{
    id:Number
    date:string;
    title:string;
    content:string;
}

export function BlogPageCard({ id,date,title,content}:blog){
    return<Link to={`/blog/${id}`}>    
        <div className="m-2 p-3  mx-auto md:w-3/4 w-full cursor-pointer">
            <div className="flex gap-2">
            </div>
            <p className="text-xs text-zinc-400">{date}</p>
            <div className="p-2">

                <div className="text-pretty">
                    <p className="font-extrabold text-xl mb-2 ">{title}</p>
                    <p className="truncate text-pretty  hover:text-clip text-zinc-500">{content.substring(0,100)}</p>
                </div>
                <div className="flex justify-between py-2">
                    <div className="font-light text-zinc-400"> 
                    {`${Math.floor(content.length/238)}s read`}
                    </div>
                </div>
            </div>
            <hr />
</div>
    
    </Link>
}