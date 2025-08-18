const Policy = ({ policy , title }: { title: string, policy: string[] }) => {
  return (
    <div className="hidden md:grid w-fit mx-auto md:col-span-6 items-center justify-center bg-gray-100 p-6 xl:p-12 rounded-md shadow-md shadow-black/60 space-y-3">
      <h3
        className="
            lg:text-xl
            xl:text-2xl
            2xl:text-3xl
            line-clamp-1 text-center leading-relaxed tracking-wider text-black font-EstedadExtraBold"
      >
        {title}
      </h3>

      <ul
        className="w-full leading-relaxed text-black font-EstedadMedium 
          space-y-3 
            lg:text-sm lg:space-y-2
            xl:text-base xl:space-y-3
            2xl:text-lg 2xl:space-y-4
            "
      >
        {policy.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Policy