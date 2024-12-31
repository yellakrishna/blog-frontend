import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Header from "./components/header/Header"
import Login from "./components/login/Login"
import Registration from "./components/register/Registration"
import Profile from "./components/Profile"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"
import BlogList from "./BlogPages/blogList/BlogList"
import CreateBlog from "./BlogPages/createBlog/CreateBlog"
import BlogView from "./BlogPages/BlogView"
import EditBlog from "./BlogPages/EditBlog"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

export default function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog-list" element={<BlogList />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />

          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<BlogView />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}