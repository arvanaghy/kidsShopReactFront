import CustomEditor from '@components/ckEditor/CustomEditor';
import Loading from '@components/Loading';
import { useSingleProduct, useUpdateComment } from '@hooks/useProduct';
import AdminLayout from '@layouts/admin/AdminLayout';
import React from 'react';
import {  useParams } from 'react-router-dom';

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


  if (isPending) return <Loading />;
  return (
    <AdminLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
          <h2>توضیحات محصول {product?.Name}</h2>
          {isUpdatingComment && <Loading />}
          <div className="">
            <button
              onClick={handleUpdateComment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ذخیره توضیحات
            </button>
            <button
              onClick={() => setComment('')}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
              پاکسازی توضیحات
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