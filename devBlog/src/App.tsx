import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { NavBar } from './Components/NavBar'
import { Blog } from './pages/Blog'
import { CreateBlog } from './pages/CreateBlog'

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar name='devesh'></NavBar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/createBlog" element={<CreateBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App