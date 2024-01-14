
const BASE_URL = process.env.REACT_APP_BASE_URL

export const  endPoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",

    UPDATE_PROFILE_API : BASE_URL + "/auth/setPreference",
}

export const bookEndPoints = {
    BOOK_RECOMMENDATIONS_API : BASE_URL + "/book/recommendation",
    GET_ALL_BOOKS_API : BASE_URL + "/book/get-all",
    DELETE_BOOK_API : BASE_URL + "/book/delete",
    CREATE_BOOK_API : BASE_URL + "/book/create"
} 