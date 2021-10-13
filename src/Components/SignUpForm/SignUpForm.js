import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import './SignUpForm.css';

const SignUpForm = () => {

    let {
        handleFirebaseEmailSignUp, error
    } = useAuth();
    const location = useLocation();
    let history = useHistory();
    let redirect_uri = location.state?.from || '/home';
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .min(6, 'Email must be at least 6 characters')
            .max(30, 'Email must be at least 30 characters'),
        password: Yup.string()
            .required('Password is required')
            .matches(passwordRegex, { message: "Password must have at least one uppercase, one lowercase, one digit and within 8 to 20 chatacters", excludeEmptyString: true })
            .min(8, 'Password must be at least 8 characters')
            .max(30, 'Password must be maximum 30 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .max(30, 'Password must be maximum 30 characters')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        console.log(data);
        if (data.password !== data.confirmPassword) errors.confirmPassword = true;
        handleFirebaseEmailSignUp(data.email, data.password).then(() => {
            history.push(redirect_uri);
        });
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <input type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="error">{errors.email?.message}</p>}

            <input type="password" placeholder="Enter Password" {...register("password")} />
            {errors.password && <p className="error">{errors.password?.message}</p>}

            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword?.message}</p>}

            <input type="submit" />
            {error && <p className="error">{error}</p>}
            <p>Already have an account? <Link to='./signin'>Login</Link></p>
        </form>
    );
};

export default SignUpForm;