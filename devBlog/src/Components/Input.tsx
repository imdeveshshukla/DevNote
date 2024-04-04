import { ChangeEvent } from "react";


type param = {
    label:string,
    placeholder:string,
    value: string,
    onChange: (value: string) => void
}
export function Input({ label, placeholder, value, onChange }:param){
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value); 
    };
  
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  };
  
  export default Input;