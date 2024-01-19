import { useState , useEffect } from 'react'

const timer = () => {
  const [time , setTime] = useState(new Date());
  useEffect(() => {
    const setTimeandDate = setInterval(()=>{
        setTime(new Date())
    },1000)
    console.log("Component Mounted")
    return(
        () => {
            clearInterval(setTimeandDate)
            console.log("Component Unmounted")
        }
    )
  },[time])
  
  return (
    <div className = "TimerClass">
        <strong>{time.toLocaleString()}</strong>
    </div>
  )
}

export default timer