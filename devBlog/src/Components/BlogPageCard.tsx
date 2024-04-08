import { CAvatar } from "@coreui/react";

interface blog{
    img?:string;
    name:string;
    date:string;
    title:string;
    content:string;
}

export function BlogPageCard({ img ,name,date,title,content}:blog){
    // const w = window.innerWidth;
    // console.log((2*w)/w);
    return<div className="m-5 p-5 w-3/4 mx-auto">
        <div className="flex gap-2">
            {/* <Icon></Icon> */}
            <CAvatar color="primary" className="bg-slate-600 px-2" textColor="white" shape="rounded" >{`${name.charAt(0)}`}</CAvatar>
            <p className="text-sm ">{name}</p>
        </div>
        <p className="text-xs text-slate-400">{date}</p>
        <div className="p-2">

            <div className="text-pretty">
                <p className="font-extrabold text-xl mb-2 ">{title}</p>
                <p className="truncate text-pretty  hover:text-clip text-slate-500">{content.substring(0,100)}</p>
                {/* <div className="flex flex-wrap">
                </div> */}
            </div>
            <div className="flex justify-between py-2">
                <div className="font-light text-slate-400"> 
                {`${content.length/238} s read`}
                </div>
                <button>save</button>
            </div>
        </div>
        <hr />
    </div>
}