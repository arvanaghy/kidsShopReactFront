import { Card } from "flowbite-react";

const PersonalInfoCard = ({ title, description }) => {
    return (
        <Card
            className=""
            imgSrc="https://www.flowbite-react.com/images/blog/image-4.jpg"
            horizontal
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {description}
            </p>
        </Card>
    );
};

export default PersonalInfoCard;
