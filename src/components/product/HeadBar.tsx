import React from 'react'

const HeadBar = ({ text }: { text: string }) => {
    return (
        <div
            className="col-span-12 text-center  font-EstedadExtraBold tracking-wider leading-relaxed
            text-lg py-4
            sm:text-xl sm:py-4
            md:text-2xl md:py-6
            lg:text-3xl lg:py-7
            xl:text-4xl xl:py-8 
            2xl:text-5xl 2xl:py-10
            text-transparent bg-clip-text bg-gradient-to-r  from-Amber-500 to-CarbonicBlue-500            "
        >
            {text}
        </div>
    )
}

export default HeadBar