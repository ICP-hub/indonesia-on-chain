import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom';
import upload from '../../../assets/images/upload.png'
import { studentSchema } from './signupValidation';
import { useAuth } from '../utils/useAuthClient';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import BackDropLoader from '../utils/BackDropLoader';
import { setUserInfoSuccess } from '../Reducers/UserLogin';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const SignUpSudentComponent = () => {
    const imageRef = useRef(null)
    const [phoneNumber, setPhoneNumber] = useState();
    const { actor } = useAuth();
    const [nationalIdImage, setNationalIdImage] = useState({
        original: null,
        base64: null,
    });


    useEffect(() => {
        console.log("New Number :- > ", phoneNumber)
    }, [phoneNumber])
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(studentSchema),
        mode: 'all'
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true);
        if (nationalIdImage.base64 === null) {
            toast.error("National ID Image is required");
            setIsLoading(false);
            return;
        }


        console.log("phone number length", phoneNumber.length)


        const register_user = async (newData) => {
            console.log(newData);
            const result = await actor.register_user(newData);
            console.log(result)
            // console.log("register user function called", result.ok);
            if (result.ok) {
                dispatch(setUserInfoSuccess(result.ok))
                toast.success("Registration Successful");
                setIsLoading(false);
            } else {
                // dispatch(setUserInfoSuccess(result.ok))
                toast.error("Registration Failed");
                setIsLoading(false);
            }

            const Data = {
                emailId: result.ok.email,
                userName: result.ok.userName,
                name: result.ok.name,
                phone: result.ok.phone,
                role: result.ok.role,
            }
            // console.log(Data);

            dispatch({ type: 'STORE_USER_DATA', payload: Data });

 

            navigate(
                process.env.DFX_NETWORK === "ic"
                    ? '/student-dashboard/main'
                    : `/student-dashboard/main?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`);
        }

        // console.log("Sign Up Student Component register function called------");
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
                university: [""],
                degree: [""],
                cgpa: [""],
                nationalIdProof: [nationalIdImage.base64],
                profileImage: [""],
                qualification: [""],
                status: ["Active"],
            }
            register_user(newData);

        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
        // console.log("Sign Up Student Component register function finished------");
    };

    const handlePhoneInputChange = (value) => {
        setPhoneNumber(value);
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 200000) {
                toast.error("File size is too large. Please select a file smaller than 200KB.");
                return
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    console.log(file);
                    setNationalIdImage({
                        original: file,
                        base64: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    };


    const handleImageReset = () => {
        if (imageRef.current) {
            imageRef.current.value = ""
        }
        setNationalIdImage({
            original: null,
            base64: null,
        });
    }

    const errorsFunc = (val) => {
        console.log('val', val)
    }

    return (
        <div className='w-full md:w-1/2 flex flex-col md:overflow-hidden justify-center items-center py-0 md:py-8'>
            {
                <BackDropLoader isLoading={isLoading} />
            }

            <div className='font-poppins font-[400] text-4xl mb-4 mt-4 text-center'>
                <h1 className=''>Student Details</h1>
            </div>


            <form onSubmit={handleSubmit(onSubmit, errorsFunc)} className="w-[80%] mx-auto overflow-y-auto flex flex-col ">
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="name">Name</label>
                    <input id="name" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("name")} />
                    <p className="text-red-500 text-base mt-1">{errors.name?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="name">Username</label>
                    <input id="name" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("username")} />
                    <div className='flex items-center space-x-0 ml-4'>
                        <span className='rounded-full text-3xl'>&#183;</span>
                        <p className='text-gray-600 text-base  '>Your username must not contain spaces in between.</p>
                    </div>
                    <p className="text-red-500 text-base mt-1">{errors.username?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="email">Email</label>
                    <input id="email" type="email" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("email")} />
                    <p className="text-red-500 text-base mt-1">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="phone">Phone Number</label>
                    <div>
                        <PhoneInput
                            id="phone"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneInputChange}
                            className="w-full p-4 rounded-full border border-[#BDB6CF]"
                            required
                        />

                    </div>
                    <p className="text-red-500 text-base mt-1">{errors.phone?.message}</p>
                </div>

                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        className="w-full p-4 rounded-md border border-[#BDB6CF]"
                        {...register("bio")}

                    />
                    <p className="text-red-500 text-base mt-1">{errors.bio?.message}</p>
                </div>


                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="nationalIdType">National ID Type</label>
                    <select id="nationalIdType" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("nationalIdType")}>
                        <option value="">Select National ID Type</option>
                        <option value="passport">Passport</option>
                        <option value="nationalId">National ID</option>
                    </select>
                    <p className="text-red-500 text-base mt-1">{errors.nationalIdType?.message}</p>
                </div>

                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <label className='text-black mb-2 font-poppins' htmlFor="nationalId">National ID/Image</label>


                    <div className="flex items-center">
                        <input
                            id="nationalId"
                            type="text"
                            className=" p-4 rounded-full border border-[#BDB6CF] w-[95%] mb-4"
                            {...register("nationalId")}
                        />
                        <label htmlFor="nationalIdImage" className=" ml-4 mb-3 cursor-pointer border p-2 border-[#BDB6CF] rounded-full items-center">

                            <img src={upload} alt="Upload Icon" className="inline-block" />
                            <input
                                key={nationalIdImage.base64 ? 'imageSelected' : 'imageNotSelected'}
                                id="nationalIdImage"
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>

                    </div>

                    {
                        nationalIdImage.base64 && <div className='w-full h-[150px] border rounded-md overflow-hidden relative'>
                            <img src={nationalIdImage.base64} alt="National ID Image" className='w-full h-full object-contain' />
                            <button className='absolute top-0 right-0 text-white bg-red-500 p-2 rounded-full' onClick={handleImageReset}>
                                <MdClose />
                            </button>
                        </div>
                    }

                    <p className="text-red-500 text-base mt-1">{errors.nationalIdImage?.message}</p>
                    <p className="text-red-500 text-base mt-1">{errors.nationalId?.message}</p>
                    {nationalIdImage.base64 && <div className='w-full justify-start items-center flex gap-2'>
                        <p>Selected Image: {nationalIdImage.original.name}</p>
                        |
                        <p>Image Size: {(nationalIdImage.original.size * 0.001).toFixed(2)}KB</p>
                    </div>}
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <button type="submit" className='bg-[#3400B1] text-white text-base md:text-xl text-center font-poppins md:font-[300] w-full rounded-full p-4 md:py-4  md:px-[11rem]'>Sign Up</button>
                </div>
            </form>

        </div>

    );
};

export default SignUpSudentComponent;