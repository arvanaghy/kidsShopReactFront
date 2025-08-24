import { useState } from 'react'

const OrderDescription = () => {
    const [description, setDescription] = useState('')
    return (
        <div className="space-y-2">
            <p>توضیحات پیش فاکتور</p>
            <textarea
                className="w-full p-2 border-2 rounded-lg border-CarbonicBlue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}

export default OrderDescription