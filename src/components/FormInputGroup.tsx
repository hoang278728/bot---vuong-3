import useFormValidation from '@hooks/useFormValidation';
import { getCountry } from '@utils/getIP';
import React, { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useOutletContext } from 'react-router-dom';
type FieldName = 'pageName' | 'name' | 'phoneNumber' | 'birthday';
type ContextType = {
	setPageName: React.Dispatch<React.SetStateAction<string>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	setBirthday: React.Dispatch<React.SetStateAction<string>>;
	pageNameInputRef: React.RefObject<HTMLInputElement>;
	nameInputRef: React.RefObject<HTMLInputElement>;
	phoneNumberInputRef: React.RefObject<HTMLInputElement>;
	birthdayInputRef: React.RefObject<HTMLInputElement>;
};
const FormInputGroup: React.FC = () => {
	const [formData, setFormData] = useState<{
		pageName: string;
		name: string;
		phoneNumber: string;
		birthday: string;
	}>({
		pageName: '',
		name: '',
		phoneNumber: '',
		birthday: '',
	});

	const { errors, validateInput } = useFormValidation();
	const {
		setPageName,
		setName,
		setPhoneNumber,
		setBirthday,
		pageNameInputRef,
		nameInputRef,
		phoneNumberInputRef,
		birthdayInputRef,
	} = useOutletContext<ContextType>();
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: FieldName,
	) => {
		const value = event.target.value;
		setFormData((prevData) => ({
			...prevData,
			[field]: field === 'birthday' ? formatDate(value) : value,
		}));
		validateInput(field, value);
	};

	const formatDate = (value: string) => {
		const digits = value.replace(/\D/g, '');
		if (digits.length <= 2) return digits;
		if (digits.length <= 4)
			return `${digits.slice(0, 2)}/${digits.slice(2)}`;
		return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
	};

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				await getCountry();
			} catch {
				console.clear();
			}
		};
		fetchCountry();
	}, []);
	useEffect(() => {
		setPageName(formData.pageName);
		setName(formData.name);
		setPhoneNumber(formData.phoneNumber);
		setBirthday(formData.birthday);
	}, [formData, setPageName, setName, setPhoneNumber, setBirthday]);

	const handleChange =
		(field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
			handleInputChange(event, field);
		};

	return (
		<div className='my-5'>
			<input
				ref={pageNameInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Page Name'
				value={formData.pageName}
				onChange={handleChange('pageName')}
				onBlur={() => validateInput('pageName', formData.pageName)}
			/>
			{errors.pageName && (
				<p className='text-red-500'>{errors.pageName}</p>
			)}

			<input
				ref={nameInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Your Name (Name and Surname)'
				value={formData.name}
				onChange={handleChange('name')}
				onBlur={() => validateInput('name', formData.name)}
			/>
			{errors.name && <p className='text-red-500'>{errors.name}</p>}

			<input
				ref={phoneNumberInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='tel'
				placeholder='Phone Number'
				value={formData.phoneNumber}
				onChange={handleChange('phoneNumber')}
				onBlur={() => validateInput('phoneNumber', formData.phoneNumber)}
			/>
			{errors.phoneNumber && (
				<p className='text-red-500'>{errors.phoneNumber}</p>
			)}

			<input
				ref={birthdayInputRef}
				className='my-2 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Birthday (MM/DD/YYYY)'
				value={formData.birthday}
				onChange={handleChange('birthday')}
				onBlur={() => validateInput('birthday', formData.birthday)}
			/>
			{errors.birthday && (
				<p className='text-red-500'>{errors.birthday}</p>
			)}
		</div>
	);
};

export default FormInputGroup;
