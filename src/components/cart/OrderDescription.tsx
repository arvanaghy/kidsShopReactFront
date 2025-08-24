import { useCartStore } from "@store/CartStore";
const OrderDescription = () => {
    const { description, setDescription } = useCartStore();

    return (
        <div className="space-y-2">
            <p>توضیحات پیش فاکتور</p>
            {description && description?.length > 0 ? (
                <div className="flex flex-row items-center justify-between ">
                    <p>{description}</p>
                    <button
                        onClick={() => setDescription("")}
                        className="text-CarbonicBlue-500"
                    >
                        حذف
                    </button>
                </div>
            ) : (
                <textarea
                    className="w-full p-2 border-2 rounded-lg border-CarbonicBlue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            )}
        </div>
    )
}

export default OrderDescription