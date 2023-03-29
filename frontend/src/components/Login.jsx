import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from "../actions/userAction";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (error) {
            // alert.error(error);
            console.log(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/profile");
        }

    }, [dispatch, error, navigate, isAuthenticated])
    return (
        <>
            <h1 className="container m-auto mt-5">Login Form</h1>
            <form onSubmit={loginSubmit} action="" className="container d-flex flex-column mt-5">
                <input
                    onChange={e => setEmail(e.target.value)}
                    className='container p-1 mt-2'
                    type="email" name="email" id="email"
                    placeholder='Enter your email e.g.john@example.com'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    className='container p-1 mt-2'
                    type="password" name="password" id="password"
                    placeholder='Enter your password'
                />
                <button type="submit" className='container btn btn-outline-primary mt-4'>Login</button>
            </form>
        </>
    )
}

export default Login