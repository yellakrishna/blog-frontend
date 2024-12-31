import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./create.css"

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`https://blog-backend-qcdy.onrender.com/blog/create-post`, { title, content }, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                console.log("Blog Submit", res);
                toast("Post Created.")
                setContent('')
                setTitle('')
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
                toast("Something went Wrong")
            })

        console.log({ title, content });
    };

    return (
        <div className="createBlog">
            <h2 className=" text-center mb-4">Create Blog Post</h2>
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
                        className=""
                        id="content"
                        rows="5"
                        cols="44"
                        placeholder="Post Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div className="">
                    <button
                        disabled={loading}
                        className="btn btn-success text-center"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog