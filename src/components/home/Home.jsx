import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const fetchData = () => {
    axios.get('https://blog-backend-qcdy.onrender.com/blog/blogs', {}, { withCredentials: true })
      .then((res) => {
        setLoading(false)
        setData(res.data)
        console.log("User data fetched", res);
      })
      .catch((err) => {
        console.log("Error while fetch data", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div class="home-container">
      {data?.map((item, index) => (
        <div
          onClick={() => navigate(`/${item?._id}`)}
          key={index}
          className="home"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{item?.title}</h2>
          <p className="text-gray-600 mb-4">{item?.content?.substring(0,20)}
          {item.content.length > 20 && '...'}
          </p>
          <div className='flex items-center justify-between'>
            {/* <p className="text-gray-500 text-sm mb-2">Author: {item?.author?.name}</p> */}
            <p className="text-gray-400 text-xs">{new Date(item?.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>


  )
}

export default Home