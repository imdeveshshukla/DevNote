import { CAvatar } from "@coreui/react";

interface blog{
    img?:string;
    name:string;
    date:string;
    title:string;
    content:string;
}

export function BlogPageCard({ img ,name,date,title,content}:blog){
    return<div className="m-5 p-5 border-solid border-2">
        <div className="flex gap-2">
            {/* <Icon></Icon> */}
            <CAvatar color="primary" className="bg-slate-600 px-2" textColor="white" shape="rounded" >{`${name.charAt(0)}`}</CAvatar>
            <p className="text-sm ">{name}</p>
        </div>
        <p className="text-xs text-slate-400">{date}</p>
        <div className="p-2">

            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p>{`${content.substring(0,50)}.....`}</p>
            </div>
            <div className="flex justify-between">
                <div className="font-light text-slate-400"> 
                {`${content.length/238} s read`}
                </div>
                <button>save</button>
            </div>
        </div>
    </div>
}