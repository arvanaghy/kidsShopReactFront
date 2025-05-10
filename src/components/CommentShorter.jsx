// eslint-disable-next-line react/prop-types
const CommentShorter = ({commentData}) => {


    // Split by newline
    // eslint-disable-next-line react/prop-types
    const lines = commentData?.split('\r\n');

    // Get the first three lines
    const firstThreeLines = lines?.slice(0, 3);

    return (
        <ul className="xl:space-y-1 leading-relaxed list-disc  marker:text-Amber-500 list-inside text-xs xl:text-sm " >
            {firstThreeLines?.map((line, index) => (
                <li key={index} className='text-xs' >{line}</li>
            ))}
        </ul>
    )
}

export default CommentShorter