export function Footer(){
    return <div className="flex justify-between mx-3 border-t-2 border-t-black ">
        <div className="gap-3 hidden sm:flex">
            <button className="">Privacy Policy</button>
            <button>Term Condition</button>
        </div>
        <div className="flex gap-3 flex-wrap">
            <button className="">Instagram</button>
            <button>LinkedIn</button>
            <button>Github</button>
        </div>
    </div>
}