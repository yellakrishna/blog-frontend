import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)

    const { id } = useParams();

    const fetchData = () => {
        axios.get(`https://blog-backend-qcdy.onrender.com/blog/blogs/${id}`, {}, { withCredentials: true })
            .then((res) => {
                setTitle(res.data.title)
                setContent(res.data.content)
                console.log("User data fetched", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
            })
    }

    useEffect(() => {
        fetchData();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`https://blog-backend-qcdy.onrender.com/blog/update-post/${id}`, { title, content }, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                console.log("Blog Submit", res);
                toast("Post updated.")
                setContent('')
                setTitle('')
            })
            .catch((err) => {
                console.log("Error while update data", err)
                setLoading(false)
                toast("Something went Wrong")
            })

        console.log({ title, content });
    };

    return (
        <div className="createBlog mx-5">
            <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className=" mb-2" htmlFor="title">
                        Title
                    </label><br/>
                    <input
                        className=""
                        id="title"
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className=" mb-2" htmlFor="content">
                        Content
                    </label><br/>
                    <textarea
                        className="s"
                        id="content"
                        rows="5"
                        cols='44'
                        placeholder="Post Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        disabled={loading}
                        className="btn btn-success text-center"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog