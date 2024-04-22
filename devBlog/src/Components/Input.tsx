import { ChangeEvent, useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

type param = {
    label:string,
    placeholder:string,
    value: string,
    type:string
    onChange: (value: string) => void
}
export function Input({ label, placeholder, value,type, onChange }:param){
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value); 
    };
    const [typeB, setType] = useState(type);
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
          if (typeB==='password'){
            setIcon(eye);
            setType('text')
          } else {
            setIcon(eyeOff)
            setType('password')
          }
      }
  
    return (
      <div className="flex flex-col mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={typeB}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {type=="password"?<span className="flex justify-end items-end" onClick={handleToggle}>
                  <Icon className="absolute mb-2.5 mr-1 cursor-pointer" icon={icon} size={20}/>
              </span>:<></>}
      </div>
    );
  };
  
  export default Input;