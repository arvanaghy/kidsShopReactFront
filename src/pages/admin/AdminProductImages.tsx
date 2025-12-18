import Loading from '@components/Loading';
import { faCloudArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useImagesUpload, useSingleProduct } from '@hooks/useProduct';
import AdminLayout from '@layouts/admin/AdminLayout';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AdminProductImages = () => {

  const { productCode } = useParams() as { productCode: string | number };
  const [images, setImages] = React.useState<any[]>([]);

  const { product,
    isPending,
  } = useSingleProduct(productCode);

  const { handleProductImagesUpload } = useImagesUpload(
    productCode,
    images,
    setImages
  );


  if (isPending) return <Loading />;
  return (
    <AdminLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around p-2">
          <div className="w-full flex flex-row items-center justify-between p-4">
            <h2>افزودن تصاویر {" "}
              <a href={`/admin/product/${productCode}`} className='underline text-blue-500'>
                {product?.Name}
              </a>
            </h2>
            <button
              onClick={handleProductImagesUpload}
              className="bg-green-500 text-white rounded-lg px-4 py-2 mx-2 hover:bg-green-700">
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </button>
          </div>

          <div className="flex flex-row m-2 border-dashed border-2 border-gray-400 rounded-lg p-4  items-center justify-between">
            <input
              type="file"
              multiple
              accept="image/*"
              className="mb-2"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const fileArray = Array.from(files);
                  const newImages = fileArray.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                  }));
                  setImages((prevImages) => prevImages.concat(newImages));
                }
              }}
            />
            {images.length > 0 && (<p className="mt-2 text-sm text-gray-600">
              {images.length} تصویر انتخاب شده است.
            </p>
            )}
            <button
              onClick={() => {
                setImages([])
              }}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-red-500 hover:text-red-700 text-xl"
              />
            </button>
          </div>
          <div className="w-full p-1.5 flex flex-row flex-wrap my-4 gap-1.5 justify-center items-stretch">
            {images.map((image, index) => (
              <div key={index} className="w-2/12 p-2 border border-gray-300 rounded-lg relative">
                <button
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 mb-2 hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <img
                  src={image.preview}
                  alt={`Preview ${index}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProductImages