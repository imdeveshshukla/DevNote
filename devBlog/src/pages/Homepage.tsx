import img from '../others/namaste.png'
export function Homepage(){
    return <div className="h-96 flex flex-col justify-center">
        <div className="block w-fit mx-auto text-center ">
            <img src={img} alt="Namaste" className='w-60' />
        </div>
            <h1 className='text-center font-cinzel text-5xl'>Tame your work, organize your life</h1>
    </div>
}