import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from "../actions/userAction";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isAuthenticated } = useSelector((state) => state.user)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);

        dispatch(register(myForm));
    }

    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/profile");
        }

    }, [dispatch, error, navigate, isAuthenticated])
    return (
        <>
            <h1 className="container m-auto mt-5">Register Form</h1>
            <form onSubmit={registerSubmit} action="" className="container d-flex flex-column mt-5">
                <input
                    onChange={e => setName(e.target.value)}
                    className='container p-1 mt-2'
                    type="text" name="" id=""
                    placeholder='Enter your nmae e.g.John Doe'
                />
                <input
                    onChange={e => setEmail(e.target.value)}
                    className='container p-1 mt-2'
                    type="email" name="" id=""
                    placeholder='Enter your email e.g.john@example.com'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    className='container p-1 mt-2'
                    type="password" name="" id=""
                    placeholder='Enter your password'
                />
                <button type="submit" className='container btn btn-outline-primary mt-4'>Register</button>
            </form>
            <Link to={'/login'} className='container btn btn-outline-success mt-5'>Signin</Link>
        </>
    )
}

export default Register