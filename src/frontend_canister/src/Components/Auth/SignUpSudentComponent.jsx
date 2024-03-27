import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom';
import upload from '../../../assets/Vectors/upload.png'
import { studentSchema } from './signupValidation';
import { useAuth } from '../utils/useAuthClient';
const SignUpSudentComponent = () => {

    const { actor } = useAuth();
    const [nationalIdImage, setNationalIdImage] = useState(null);
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

        const register_user = async (newData) => {
            const result = await actor.register_user(newData);
            console.log("register user function called", result.ok);

            const Data = {
                emailId: result.ok.email,
                userName: result.ok.userName,
                name: result.ok.name,
                phone: result.ok.phone,
                role: result.ok.role,
            }
            console.log(Data);
            dispatch({ type: 'STORE_USER_DATA', payload: Data });


            navigate(
                process.env.DFX_NETWORK === "ic"
                    ? '/student-dashboard/main'
                    : `/student-dashboard/main?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
        }

        console.log("Sign Up Student Component register function called------");
        try {
            const newData = {
                email: data.email,
                name: data.name,
                userName: data.username,
                phone: data.phone,
                role: "student",
                bio: ["text"],
                nationalId: [data.nationalId],
                experience: [""],
                nationalIdProof: ["erg"],
                profileImage: ["er"],
                profileCoverImage: ["erg"],
                qualification: ["erg"],
                status: ["Active"],
            }
            register_user(newData);
        } catch (error) {
            console.error(error);
        }
        console.log("Sign Up Student Component register function finished------");
    };

    const handleNationalIdImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNationalIdImage(file);
        }
    };

    const errorsFunc = (val) => {
        console.log('val', val)
    }

    return (
        <div className='w-full md:w-1/2 flex flex-col md:overflow-hidden justify-center items-center'>

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
                    <input id="phone" type="tel" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("phone")} />
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
                    <label className='text-black mb-2 font-poppins' htmlFor="phone">National ID type</label>
                    <input id="phone" type="string" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("nationalIdType")} />
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
                        </label>
                        <input
                            id="nationalIdImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleNationalIdImageChange}
                            {...register("nationalIdImage")}
                        />
                    </div>
                    <p className="text-red-500 text-base mt-1">{errors.nationalIdImage?.message}</p>
                    <p className="text-red-500 text-base mt-1">{errors.nationalId?.message}</p>
                    {nationalIdImage && <p>Image selected: {nationalIdImage.name}</p>}
                </div>
                <div className="flex flex-col justify-start space-y-2 mt-5">
                    <button type="submit" className='bg-[#3400B1] text-white text-base md:text-xl text-center font-poppins md:font-[300] w-full rounded-full p-4 md:py-4  md:px-[11rem]'>Sign Up</button>
                </div>
            </form>

        </div>

    );
};

export default SignUpSudentComponent;
