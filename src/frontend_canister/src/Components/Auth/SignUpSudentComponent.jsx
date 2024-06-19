import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { studentSchema } from './signupValidation';
import { useAuth } from '../utils/useAuthClient';
import { toast } from 'react-toastify';
import BackDropLoader from '../utils/BackDropLoader';
import { setUserInfoSuccess } from '../Reducers/UserLogin';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { SignUpPageData } from '../../textData';
import "../../../assets/main.css"
import { useTranslation } from 'react-i18next';
const SignUpStudentComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState();
    const { actor } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isOtherCollege, setIsOtherCollege] = useState(false);
    const [customCollege, setCustomCollege] = useState('');
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(studentSchema),
        mode: 'all',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("New Number :- > ", phoneNumber);
    }, [phoneNumber]);

    const onSubmit = (data) => {
        console.log("user data sent :-->", data);
        setIsLoading(true);

        const register_user = async (newData) => {
            console.log(newData);
            const result = await actor.register_user(newData);
            console.log(result);

            if (result.ok) {
                dispatch(setUserInfoSuccess(result.ok));
                toast.success(t('SignUpStudentComponent.registrationSuccessToast'));
                setIsLoading(false);
            } else {
                toast.error(t('SignUpStudentComponent.registrationFailedToast'));
                setIsLoading(false);
            }

            const Data = {
                emailId: result.ok.email,
                userName: result.ok.userName,
                name: result.ok.name,
                phone: result.ok.phone,
                role: result.ok.role,
            };

            dispatch({ type: 'STORE_USER_DATA', payload: Data });

            navigate(process.env.DFX_NETWORK === "ic" ? '/student-dashboard/main' : `/student-dashboard/main?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`);
        };

        try {
            const newData = {
                email: data.email,
                name: data.name,
                userName: data.username,
                phone: phoneNumber,
                role: "student",
                bio: [data.bio || ""],
                nationalId: [data.nationalId],
                experience: [""],
                university: [isOtherCollege ? customCollege : data.University],
                degree: [""],
                cgpa: [""],
                nationalIdProof: [""],
                profileImage: [""],
                qualification: [""],
                status: ["Active"],
            };
            register_user(newData);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handlePhoneInputChange = (value) => {
        setPhoneNumber(value);
    };

    const handleCollegeChange = (event) => {
        const value = event.target.value;
        if (value === "Other") {
            setIsOtherCollege(true);
        } else {
            setIsOtherCollege(false);
            setCustomCollege('');
        }
    };

    const handleCustomCollegeChange = (event) => {
        setCustomCollege(event.target.value);
    };

    const errorsFunc = (val) => {
        console.log('val', val);
    };

    return (
        <div className='w-full md:w-1/2 flex flex-col md:overflow-hidden justify-center items-center py-0 md:py-8'>
            {<BackDropLoader isLoading={isLoading} />}
            <div className='font-poppins font-[400] text-4xl mb-4 mt-4 text-center'>
                <h1 className=''>{t('SignUpStudentComponent.pageTitle')}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit, errorsFunc)} className="w-[80%] mx-auto overflow-y-auto flex flex-col ">
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="name">{t('SignUpStudentComponent.nameLabel')}</label>
                    <input id="name" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("name")} />
                    <p className="text-red-500 text-base mt-1">{errors.name?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="username">{t('SignUpStudentComponent.usernameLabel')}</label>
                    <input id="username" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("username")} />
                    <div className='flex items-center space-x-0 ml-4'>
                        <span className='rounded-full text-3xl'>&#183;</span>
                        <p className='text-gray-600 text-base'>{t('SignUpStudentComponent.usernamePlaceholder')}</p>
                    </div>
                    <p className="text-red-500 text-base mt-1">{errors.username?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="email">{t('SignUpStudentComponent.emailLabel')}</label>
                    <input id="email" type="email" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("email")} />
                    <p className="text-red-500 text-base mt-1">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="phone">{t('SignUpStudentComponent.phoneLabel')}</label>
                    <div>
                        <PhoneInput
                            id="phone"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneInputChange}
                            className="w-full p-4  rounded-full border border-[#BDB6CF] custom-phone-input"
                           
                            required
                        />
                    </div>
                    <p className="text-red-500 text-base mt-1">{errors.phone?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="bio">{t('SignUpStudentComponent.bioLabel')}</label>
                    <textarea id="bio" className="w-full p-4 rounded-md border border-[#BDB6CF]" {...register("bio")} />
                    <p className="text-red-500 text-base mt-1">{errors.bio?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="University">{t('SignUpStudentComponent.universityLabel')}</label>
                    <select
                        id="University"
                        className="w-full p-4 rounded-full border border-[#BDB6CF]"
                        {...register("University")}
                        onChange={handleCollegeChange}
                    >
                        <option value="">{t('SignUpStudentComponent.selectCollegePlaceholder')}</option>
                        {SignUpPageData.Universities.map((college, index) => (
                            <option value={college.name} key={index}>{college.name}</option>
                        ))}
                        <option value="Other">{t('SignUpStudentComponent.otherCollegeOption')}</option>
                    </select>
                    {isOtherCollege && (
                        <input
                            id="customCollege"
                            type="text"
                            placeholder="Enter your college name"
                            className="w-full p-4 rounded-full border border-[#BDB6CF] mt-2"
                            value={customCollege}
                            onChange={handleCustomCollegeChange}
                        />
                    )}
                    <p className="text-red-500 text-base mt-1">{errors.University?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="nationalIdType">{t('SignUpStudentComponent.nationalIdTypeLabel')}</label>
                    <select id="nationalIdType" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("nationalIdType")}>
                        <option value="">{t('SignUpStudentComponent.selectNationalIdTypePlaceholder')}</option>
                        <option value="passport">{t('SignUpStudentComponent.Passport')}</option>
                        <option value="nationalId">{t('SignUpStudentComponent.nationalIdLabel')}</option>
                    </select>
                    <p className="text-red-500 text-base mt-1">{errors.nationalIdType?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="nationalId">{t('SignUpStudentComponent.nationalIdLabel')}</label>
                    <input
                        id="nationalId"
                        type="text"
                        className="p-4 rounded-full border border-[#BDB6CF] w-[95%] mb-4"
                        {...register("nationalId")}
                    />
                    <p className="text-red-500 text-base mt-1">{errors.nationalId?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <button type="submit" className='bg-[#3400B1] text-white text-base md:text-xl text-center font-poppins md:font-[300] w-full rounded-full p-4 md:py-4 md:px-[11rem]'>{t('SignUpStudentComponent.submitButton')}</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpStudentComponent;
