import Loading from '@components/Loading';
import { useProformaDetails } from '@hooks/useOrders';
import { useParams } from 'react-router-dom';

const AdminOrder = () => {
    const { orderCode } = useParams();

    const { proformaDetailsList, proformaDetailsLinks, loading } = useProformaDetails(orderCode);

    if (loading) return <Loading />;
    console.log(proformaDetailsList);

    return (
        <div>
            <h1>Order Code: {orderCode}</h1>
        </div>
    )
}

export default AdminOrder