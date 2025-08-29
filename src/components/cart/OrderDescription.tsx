import { useCartStore } from "@store/CartStore";
const OrderDescription = () => {
    const { description, setDescription } = useCartStore();

    return (
        <div className="space-y-2">
            <textarea
                className="w-full p-2 border placeholder:text-sm placeholder:font-EstedadLight rounded-lg text-sm  font-EstedadLight border-CarbonicBlue-500"
                placeholder="توضیحات سفارش (اختیاری)"
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}

export default OrderDescription