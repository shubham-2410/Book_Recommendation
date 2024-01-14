import {toast} from 'react-hot-toast';
import { setMyBooks, setRecommendations } from '../../redux/slices/recommendationSlice';
const {apiConnector} = require('../apiconnector')
const {bookEndPoints} = require('../apis')

const{
    BOOK_RECOMMENDATIONS_API,
    GET_ALL_BOOKS_API,
    // DELETE_BOOK_API ,
    // CREATE_BOOK_API 
} = bookEndPoints;

export function recommend(genre , author , navigate){
    return async (dispatch) => {
        console.log("here to get recommendations")
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", BOOK_RECOMMENDATIONS_API, {
				genre,
                author
			});

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

            dispatch(setRecommendations(response.data.recommendedBooks));
			// navigate('/dashboard');
		}
		catch (error) {
			console.log("Error during recommending books...", error);
			toast.error(error.response.data.message);
			navigate('/my-profile')
		}
		toast.dismiss(toastId);
	}
}
let count =0;
export function allBooks(){
	
    return async (dispatch) => {

		console.log("count " , ++count);
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("GET", GET_ALL_BOOKS_API, {});

			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			else{
				dispatch(setMyBooks(response.data.data));
				// toast.success("Books in db fetched successfully");
			}
		}
		catch (error) {
			console.log("Error during fetching books from db...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}