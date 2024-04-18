import img from '../others/namaste.png'
export function Homepage(){
    return <div className="h-96 flex flex-col justify-center">
        <div className="block w-fit mx-auto text-center ">
            <img src={img} alt="Namaste" className='w-60' />

        </div>
    </div>
}