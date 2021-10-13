
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import './SignInForm.css';


const SignInForm = () => {
    let {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        alert,
        error
    } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .max(30, 'Email must be maximum 30 characters'),
        password: Yup.string()
            .required('Password is required')
            .max(30, 'Password must be maximum 30 characters')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        console.log(data);
        if (data.password !== data.confirmPassword) errors.confirmPassword = true;
        handleFirebaseEmailSignIn(data.email, data.password).then(() => {
            redirectUserAfterSignIn();
        });
    };

    let redirectUserAfterSignIn = () => {
        history.push(redirect_uri);
    }

    return (
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>SignIn</h1>
            {alert && <p className="alert">{alert}</p>}
            <input type="text" placeholder="Enter Email" {...register("email")} />
            <span>{errors.email?.message}</span>

            <input type="password" placeholder="Enter Password" {...register("password")} />
            <span>{errors.password?.message}</span>

            <input type="submit" />
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <Link to='./signup'>Register</Link></p>
            <p>or</p>
            <div className="login-options">
                <button onClick={handleGoogleSignIn}>Google</button>
                <button onClick={handleGithubSignIn}>Github</button>
            </div>
        </form>
    );
};

export default SignInForm;