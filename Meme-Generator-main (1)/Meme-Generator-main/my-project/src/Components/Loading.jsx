import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

 function Loading () {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/game')
    }, 2000)
  }, [])
  return <div className="bg-black w-screen h-screen"></div>
}


export default Loading ;