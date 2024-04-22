import namaste from '../assets/namaste.png'
import welcome from '../assets/welcome.png'

interface pType {
    img:string;
    note:string;
}
export function StartUp({ img,note }:pType){
    return <div className="h-96 flex flex-col justify-center">  
    <div className="block w-fit mx-auto text-center ">
        <img src={img=="namaste"?namaste:welcome} alt="Namaste" className='w-72' />
    </div>
        <h1 className='text-center font-cinzel text-zinc-900 text-3xl'>{note}</h1>
</div>
}