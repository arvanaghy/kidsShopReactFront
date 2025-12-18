import CustomEditor from '@components/ckEditor/CustomEditor';
import Loading from '@components/Loading';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSingleProduct, useUpdateComment } from '@hooks/useProduct';
import AdminLayout from '@layouts/admin/AdminLayout';
import React from 'react';
import { useParams } from 'react-router-dom';

const AdminProductComment = () => {
  const { productCode } = useParams() as { productCode: string | number };

  const { product,
    isPending,
  } = useSingleProduct(productCode);
  const [comment, setComment] = React.useState<string>('');

  const { handleUpdateComment, isUpdatingComment } = useUpdateComment(productCode, comment, setComment);

  React.useEffect(() => {
    setComment(product?.Comment || '');
  }, [product]);


  if (isPending || !product || isUpdatingComment) return <Loading />;

  return (
    <AdminLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
          <div className="w-full flex flex-row items-center justify-between p-4">
            <h2>توضیحات محصول {" "}
              <a href={`/admin/product/${productCode}`} className='underline text-blue-500'>
                {product?.Name}
              </a>
            </h2>
            <button
              onClick={handleUpdateComment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
          <div className="p-4">
            <CustomEditor
              data={comment || ""}
              onChange={setComment}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProductComment