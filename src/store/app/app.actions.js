import {SET_SPLASH_STATUS, SET_USERS, SET_USERS_ERROR, SET_USERS_LOADER_STATUS} from "./app.types";
import {getUsersListAPI} from "../../api/app";

//Splash actions
export const setSplashStatusAction = (payload = true) => ({
    type: SET_SPLASH_STATUS,
    payload,
});

//Users actions
const setUserListLoadingStatus = (payload = true) => ({
    type: SET_USERS_LOADER_STATUS,
    payload,
});

const setUserListLError = (payload = true) => ({
    type: SET_USERS_ERROR,
    payload,
});

const setUserList = (payload = []) => ({
    type: SET_USERS,
    payload,
});

export const getUsersListAction = () => async (dispatch) => {
    try {
        dispatch(setUserListLoadingStatus());
        const response = await getUsersListAPI();

        dispatch(setUserList(response));
    } catch (e) {
        dispatch(setUserListLError(e));
        console.log('@@@getUsersList', e);
    }
};
