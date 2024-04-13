export function BlogSkelton(){
    return(
        <div className="m-2 p-5 mx-auto md:w-3/4 w-full cursor-pointer animate-pulse">
  <div className="flex gap-2">
    <div className="rounded bg-gray-200 h-10 w-10"></div>
    <div className="text-sm bg-gray-200 w-24 h-4"></div>
  </div>
  <div className="text-xs text-gray-400 bg-gray-200 w-20 h-4 mt-2"></div>
  <div className="p-2">
    <div className="text-pretty">
      <div className="font-extrabold text-xl bg-gray-200 h-6 mb-2 "></div>
      <div className="truncate text-pretty bg-gray-200 h-4"></div>
    </div>
    <div className="flex justify-between py-2">
      <div className="font-light text-gray-400 bg-gray-200 h-4 w-24"> 
      </div>
      <div className="bg-gray-200 h-4 w-16"></div>
    </div>
  </div>
  <hr />
</div>
    )
}