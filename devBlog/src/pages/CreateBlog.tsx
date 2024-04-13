import axios from 'axios';
import React, { useState } from 'react';
import { LOCOL_BACKEND_URL } from '../config';
import { BlogInput } from '@imdeveshshukla/common-app';
import { useNavigate } from 'react-router-dom';
import { ShowBlogSkelton } from '../Components/ShowBlogSkelton';


export function CreateBlog(){
    const nav = useNavigate();
    const [loading,setLoading] = useState(false);
    async function onSubmit({title,content}:BlogInput){
        setLoading(true);
        const res = await axios.post(`${LOCOL_BACKEND_URL}/api/v1/blog`,
        {
            title,
            content
        }
        ,
            {
                'headers':{
                    'authorization':`Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        console.log(res.data);
        nav(`/blog/${res.data.blog.id}`);
    }
    if(loading) return(<ShowBlogSkelton/>)
    return <div className='w-screen'>
    <BlogInput2 onSubmit={onSubmit}/>
    </div>
}



interface BlogInputProps {
  onSubmit: ({title, content}:BlogInput) => void;
}

const BlogInput2: React.FC<BlogInputProps> = ({ onSubmit }) => {
    const [inp,SetInp] = useState<BlogInput>({
        title:"",
        content:""
    })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inp);
    // Reset input fields after submission
    SetInp({title:"",content:""})
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Write your thoughts....</h2>
      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={inp.title}
          onChange={(e) => SetInp({...inp, title:e.target.value})}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your blog title..."
          required/>
      </div>
      {/* Content Textarea */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={inp.content}
          onChange={(e) => SetInp({...inp, content:e.target.value})}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-40 resize-none"
          placeholder="Write your blog content..."
          required
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
        Publish
      </button>
    </form>
  );
};
