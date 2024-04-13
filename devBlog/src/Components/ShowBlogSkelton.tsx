export function ShowBlogSkelton(){
    return<>
            <div className="grid grid-cols-3 m-5 max-sm:grid-cols-2 animate-pulse">
        <div className="col-span-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
            <div className="h-20 bg-gray-200 rounded mt-5"></div>
        </div>
        <div className="text-right max-sm:text-left">
            <div className="h-4 bg-gray-200 rounded w-1/2 max-sm:invisible"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 max-sm:mt-5"></div>
        </div>
        </div>
    </>
}