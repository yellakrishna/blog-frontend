import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')


    const fetchData = () => {
        axios.post('https://blog-backend-qcdy.onrender.com/user/profile', {}, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                setData(res.data.data)
                console.log("User data fetched", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
            })
    }

    console.log("data", data)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='profile-heading'>
            <p className='text-center  mt-3'>{loading && "Data is loading..."}</p>
            <div className="">
                <div className="p-6">
                    <h2 className=" mb-2">Name : {data.name}</h2>
                    <p className=" mb-2">Email: {data.email}</p>
                    <p className="">ID: {data.id}</p>
                </div>

            </div>
        </div>
    )
}

export default Profile