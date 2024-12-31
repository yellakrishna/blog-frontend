import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "./register.css"

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)

    // const notify = () => toast("Registration Successful");

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        const payload = {
            name: userName,
            email: email,
            password: password
        }

        axios.post('https://blog-backend-qcdy.onrender.com/user/register', payload)
            .then((res) => {
                setLoading(false)
                toast("Registration Successful");
                console.log("User register", res);
            })
            .catch((err) => {
                toast("Registration Failed");
                console.log("Error while reiteration", err)
                setLoading(false)
            })

    };

    return (
        <>
           <div className='registers m-5'>
            <h1 className='head'>Register</h1>
            
             <form onSubmit={handleSubmit}>
                <div>
                    <label >Username</label><br/>
                    <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                </div> 

                <div>
                    <label>Email</label><br/>
                    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div> 

                <div>
                    <label>Password</label><br/>
                    <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div> 

                <button
                            disabled={loading}
                            type="submit"
                            className="mt-3 mx-5 btn btn-primary"
                        >
                            {loading ? 'Submitting..' : "Sign up"}
                        </button>
             </form>
            </div>
        </>
    )
}

export default Registration