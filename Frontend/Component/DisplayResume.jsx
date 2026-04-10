"use client"

import { useSelector } from "react-redux"

const DisplayResume = () => {

    let {response}=useSelector((state)=>state.ResumeSlice);

    return (
    <div>
      
    </div>
  )
}

export default DisplayResume
