import {toast} from 'react-hot-toast';
import { setUser , setToken } from '../../redux/slices/authSlice';

import { recommend } from './bookAPI';
import { setRecommendations } from '../../redux/slices/recommendationSlice';

const {apiConnector} = require('../apiconnector')
const {endPoints} = require('../apis')


const {
    SIGNUP_API,
	LOGIN_API,
	UPDATE_PROFILE_API,
} = endPoints;


export function signUp(email ,username ,  password , confirmPassword ,  navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", SIGNUP_API, {
				username,
				email,
				password,
				confirmPassword,
			});
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("SignUp Successfull");
			navigate('/login');
		}
		catch (error) {
			console.log("Error in signup...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function login(username , password , navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", LOGIN_API, {
				username,
				password,
			});

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			console.log('i am here')
			dispatch(setToken(response.data.token));
			dispatch(setUser({ ...response.data.user }));

			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem("token" , JSON.stringify(response.data.user.token));

			toast.success("Login Successfull");
			navigate('/dashboard')
		}
		catch (error) {
			console.log("Error in signup...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function updateProfile(favourite_genre , favourite_author , userId , navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", UPDATE_PROFILE_API, {
				favourite_genre , favourite_author , userId
			});

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			dispatch(setUser({ ...response.data.user }));

			localStorage.setItem("user", JSON.stringify(response.data.user));

			dispatch(recommend(favourite_genre , favourite_author , navigate));

			toast.success("Preferences set successfully");
			// navigate('/dashboard')
		}
		catch (error) {
			console.log("Error during set preference...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setUser(null))
		dispatch(setToken(null))
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		dispatch(setRecommendations([]))
		toast.success("Logged Out")
		navigate("/")
	}
}
