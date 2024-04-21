import { useNavigate } from 'react-router-dom';
import img from '../assets/namaste.png'
import { useAuth } from '../hooks/useAuth';
import { StartUp } from '../Components/StartUp';
import parade from '../assets/parade.webp'
import { Footer } from '../Components/Footer';
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
    if(auth.isAuth)
    {
        nav('/blogs');
    }
    return <div className='py-5'>
        <StartUp img="namaste" note='Tame your work, organize your life'/>
        <img className='m-auto mt-2' src={parade} alt="Parade" />
        <Footer/>
    </div>
}