import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './SignUpPage.css'; // Assuming you have a CSS file to style your components
import {useDispatch} from 'react-redux';
import { setUser } from '../../Components/Reducers/UserLogin';
import {useNavigate} from 'react-router-dom';

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        
        try{
            const newData = {
                emailId : data.email,
                name: data.name,
                Phone:data.phone,
                Role:data.role
            }
            dispatch(setUser(newData));
            navigate(
                process.env.DFX_NETWORK === "ic"
                    ? '/student-dashboard'
                    : `/student-dashboard?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`);
        }catch(error){
            console.error(error);
        }
    };

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        <div className="signup-form-container">

            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type='text' {...register('name', { required: true })} />
                    {errors.name && <p className="form-error">Name is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register('email', { required: true, pattern: emailValidation })} />
                    {errors.email && <p className="form-error">Email is required and should be valid</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel"{...register('phone', { required: true })} />
                    {errors.phone && <p className="form-error">Phone is required</p>}
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'Role is required' }}
                        render={({ field: { onChange, value, ...field } }) => (
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    value="student"
                                    onChange={onChange}
                                    checked={value === 'student'}
                                    id="student"
                                    {...field}
                                />
                                <label htmlFor="student">Student</label>
                                <input
                                    type="radio"
                                    value="educator"
                                    onChange={onChange}
                                    checked={value === 'educator'}
                                    id="educator"
                                    {...field}
                                />
                                <label htmlFor="educator">Educator</label>
                            </div>
                        )}
                    />
                    {errors.role && <p className="form-error">Role is required</p>}
                </div>
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
