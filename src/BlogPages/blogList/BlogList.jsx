import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './blogList.css'

function BlogList() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const navigate = useNavigate()


    const fetchData = () => {
        axios.post('https://blog-backend-qcdy.onrender.com/blog/my-posts', {}, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                setData(res.data)
                console.log("User blog post", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    //for delete
    const handleDelete = (id) => {
        axios.get(`https://blog-backend-qcdy.onrender.com/blog/delete-post/${id}`, { withCredentials: true })
            .then((res) => {
                toast("Post Deleted")
                fetchData()
                console.log("blog post deleted", res);
            })
            .catch((err) => {
                toast("Something went wrong")
                console.log("Error while delete data", err)
            })
    }

    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`)
        console.log(id)
    }


    return (
        <div className="p-6 text-center blogList">
            <h1 className="blogList-heading">User Blog Posts</h1>
            <div className="overflow-x-auto ">
                {
                    data?.length == 0 ?
                        <p>No Blog Post Found!</p>
                        :
                        <table className="">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">SL.</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Content</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((blog, i) => (
                                    <tr key={blog._id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-800">{i + 1}</td>
                                        <td className="py-3 px-4 text-gray-800">{blog.title}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {blog.content.substring(0, 10)}
                                            {blog.content.length > 40 && '...'}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 flex">
                                            <button onClick={() => handleDelete(blog._id)}> <MdOutlineDeleteForever color='red' size={20} /> </button>
                                            <button onClick={() => handleEdit(blog._id)}> <FiEdit color='blue' size={15} /> </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default BlogList