const EmptyList = ({ title }) => {
    return (
        <div className="px-4 py-8 min-h-screen bg-white text-black">
            <h1 className="text-center text-xl lg:text-3xl font-EstedadExtraBold py-4  lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
                {title}
            </h1>
            <div className="grid grid-cols-12 py-6 ">
                <p className="w-full col-span-12 text-gray-600">
                    هیچ محصولی در {title} وجود ندارد.!
                </p>
            </div>
        </div>
    )
}

export default EmptyList