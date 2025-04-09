import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Success = () => {
    const {transID} = useParams()
    const nav = useNavigate()
    const [countdown, setCountdown] = useState(50)

    useEffect(()=> {
        if (!transID) nav('/') 

        const intervalId = setInterval(() => {
            setCountdown(countdown - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [countdown])

    useEffect(() => {
        if (countdown === 0) {
            nav('/unconfirmed-orders', {replace: true})
        }
    }, [countdown])

  return (
    <div className=" w-full h-[90vh]  flex flex-col justify-center items-center bg-stone-100">
      <div className=" bg-CarbonicBlue-500 rounded-xl border-2 border-CarbonicBlue-500/40 p-5 shadow-xl">
        <div className="font-EstedadMedium py-4 text-center text-3xl text-white">پرداخت موفق</div>
        <div className="font-EstedadMedium py-4 bg-white pb-4 my-4 w-2/3 mx-auto rounded-xl   text-center text-black">کد رهگیری شما : <span className='animate-pulse underline underline-offset-2'>{transID}</span></div>
        <ol className="flex flex-col justify-center lg:justify-between  text-justify font-EstedadMedium p-4 bg-white/40 my-10 rounded-lg shadow-lg space-y-4  ">
            <li>ممنون بابت پرداخت شما.</li>
            <li>شما در {countdown} ثانیه به صفحه سفارشات هدایت خواهید شد.</li>
        </ol>
        
      </div>
    </div>
  )
}

export default Success