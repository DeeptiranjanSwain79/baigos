import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from "../actions/userAction";
import { UPDATE_PASSWORD_RESET } from '../constants/userConstants';

const UpdatePassword = () => {
    const { user } = useSelector(state => state.user);
    const id = user.data.user._id;
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        myForm.set("id", id);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            console.log(error);
            window.alert(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            console.log("Password updated successfully");
            window.alert("Password updated successfully")

            navigate("/profile");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }

    }, [dispatch, error, navigate, isUpdated])
    return (
        <Fragment>
            <h1 className="container m-auto mt-5">Update Password</h1>
            <form action="" className="container d-flex flex-column mt-5" onSubmit={updatePasswordSubmit}>
                <input className='container p-1 mt-2' type="password" name="" id="" placeholder='Old password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)} />
                <input className='container p-1 mt-2' type="password" name="" id="" placeholder='New password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                <input className='container p-1 mt-2' type="password" name="" id="" placeholder='Confirm password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <input
                    type="submit"
                    value="Change Password"
                    className="btn btn-outline-danger container mt-5"
                    disabled={loading ? true : false}
                />
            </form>
        </Fragment>
    )
}

export default UpdatePassword