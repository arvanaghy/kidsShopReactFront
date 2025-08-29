import { useState } from 'react';
import { cities } from '@entity/citiesList';
import { provinces } from '@entity/provincesList';


const InputField = ({ type, name, placeholder, className, value, onChange }) => (
    <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

const SelectField = ({ name, placeholder, className, options, value, onChange }) => (
    <select
        name={name}
        className={className}
        value={value || ''}
        onChange={onChange}
    >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
            <option key={option.id} value={option.id}>
                {option.name}
            </option>
        ))}
    </select>
);

const UserRegistrationFormOnShoppingCart = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        provinceId: '',
        cityId: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'provinceId' ? { cityId: '' } : {}),
        }));
    };

    const handleSubmit = () => {
        // منطق ارسال فرم اینجا قرار می‌گیرد
        console.log('Form submitted:', formData);
    };

    const inputClassName = `
    w-full bg-white/60 rounded py-2 border
    border-CarbonicBlue-500 placeholder:indent-2
    text-sm font-EstedadMedium placeholder:font-EstedadMedium
    p-1.5 text-gray-800 placeholder:text-gray-600
  `;

    const filteredCities = cities.filter((city) => city.provinceId === parseInt(formData.id));

    return (
        <div className="w-full flex flex-col justify-center items-center gap-0.5 space-y-1.5">
            <InputField
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی"
                className={inputClassName}
                value={formData.name}
                onChange={handleInputChange}
            />
            <InputField
                type="tel"
                name="phoneNumber"
                placeholder="شماره موبایل"
                className={inputClassName}
                value={formData.phoneNumber}
                onChange={handleInputChange}
            />
            <SelectField
                name="provinceId"
                placeholder="استان"
                className={inputClassName}
                options={provinces}
                value={formData.provinceId}
                onChange={handleInputChange}
            />
            <SelectField
                name="cityId"
                placeholder="شهرستان"
                className={inputClassName}
                options={filteredCities}
                value={formData.cityId}
                onChange={handleInputChange}
                disabled={!formData.provinceId}
            />
            <textarea
                name="address"
                placeholder="آدرس"
                className={inputClassName}
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
            />
            <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-CarbonicBlue-500 text-white py-2 rounded hover:bg-CarbonicBlue-600 transition-colors font-EstedadMedium"
            >
                ثبت اطلاعات
            </button>
        </div>
    );
};

export default UserRegistrationFormOnShoppingCart;