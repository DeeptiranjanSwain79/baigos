import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated])
    const id = user.data.user._id;
    const updatePasswordRouter = () => {
        navigate(`/update/${id}`)
    }
    return (
        <Fragment>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className='container border rounded border-success mt-5 p-5'>
                        <div className='container row '>
                            <h4>Full Name</h4>
                            <p>{user.data.user.name}</p>
                        </div>
                        <div className='container row '>
                            <h4>Email</h4>
                            <p>{user.data.user.email}</p>
                        </div>
                        <div className='container row '>
                            <h4>Joined on</h4>
                            <p>{String(user.data.user.createdAt).substr(0, 10)}</p>
                        </div>

                        <button onClick={updatePasswordRouter} className='container btn btn-outline-primary mt-4'>Update Password</button>
                    </div>
                )
            }
        </Fragment>
    )
}

export default Profile