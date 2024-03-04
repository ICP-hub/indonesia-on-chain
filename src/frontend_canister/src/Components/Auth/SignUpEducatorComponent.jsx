import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../Reducers/UserLogin';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import schema from './signupValidation';

const SignUpEducatorComponent = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm({
    resolver: yupResolver(schema),
    mode:'all'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {

    try {
      const newData = {
        emailId: data.email,
        name: data.name,
        Phone: data.phone,
        Role: data.role
      }
      dispatch(setUser(newData));
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? '/student-dashboard'
          : `/student-dashboard?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>

      <h1 className='font-poppins font-[400] text-4xl mb-4'>Educator Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] flex flex-col ">
        <div className="flex flex-col justify-start space-y-2 mt-5">
          <label className='text-black mb-2 font-poppins' htmlFor="name">Name</label>
          <input id="name" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("name")} />
          <p className="text-red-500 text-base mt-1">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col justify-start space-y-2 mt-5">
          <label className='text-black mb-2 font-poppins' htmlFor="name">Username</label>
          <input id="name" type='text' className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("username")} />
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
          <label className='text-black mb-2 font-poppins' htmlFor="phone">Experience</label>
          <input id="phone" type="tel" className="w-full p-4 rounded-full border border-[#BDB6CF]" {...register("experience")} />
          <p className="text-red-500 text-base mt-1">{errors.experience?.message}</p>
        </div>

        <div className="mt-10">
          <button type="submit" className='bg-[#3400B1] text-white text-xl font-poppins font-[300] w-full rounded-full py-4  px-[11rem]'>Sign Up</button>
        </div>
      </form>

    </div>
  )
}

export default SignUpEducatorComponent
