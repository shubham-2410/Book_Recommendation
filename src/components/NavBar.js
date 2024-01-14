import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../services/operaions/authAPI';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='border-b-[1px] border-slate-700 h-20 flex items-center justify-between font-semibold text-cyan-50 text-xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-x-hidden'>
            <div className='flex items-center'>
                <Link to={'/'}>
                    <img src={logo} alt='' className='w-[230px] h-16' loading='lazy' />
                </Link>
            </div>

            <div className='hidden sm:flex gap-x-5 text-white'>
                <Link to={'/'}>
                    <div>Home</div>
                </Link>

                <Link to={'/about'}>
                    <div>About</div>
                </Link>
            </div>

            <div className='flex items-center gap-x-5'>
                {(!user && token == null) ? (
                    <>
                        <Link to={'/login'}>
                            <button className='border px-4 py-2 rounded'>
                                Login
                            </button>
                        </Link>

                        <Link to={'/signup'}>
                            <button className='border px-4 py-2 rounded'>
                                Signup
                            </button>
                        </Link>
                    </>

                ) : (
                    <>
                        <Link to={'/dashboard'}>
                            <div>Books</div>
                        </Link>

                        <Link to={'/my-profile'}>
                            <div>Profile</div>
                        </Link>

                        <Link to={'/'}>
                            <button onClick={() => {
                                dispatch(logout(navigate));
                            }}
                                className='border px-4 py-2 rounded'>
                                Logout
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
