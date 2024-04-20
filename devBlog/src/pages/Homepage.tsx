import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import img from '../others/namaste.png'
export function Homepage(){
    const nav = useNavigate();
    const auth = useAuth();
    if(auth.loading)
    {
        return <div className='block text-center m-auto'>
        Loading....
        </div>
    }
    if(auth.err !=null){
        return <div className='block text-center m-auto'>
        {auth.err}
        </div>
    }
    if(auth.isAuth)
    {
        nav('/blogs');
    }
    return <div className="h-96 flex flex-col justify-center">
        <div className="block w-fit mx-auto text-center ">
            <img src={img} alt="Namaste" className='w-60' />
        </div>
            <h1 className='text-center font-cinzel text-5xl'>Tame your work, organize your life</h1>
    </div>
}