import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

//User actions
export const setUserAuthorizationStatusAction = (status = true, token = '', email = '') => ({
    type: SET_USER_AUTHORIZATION_STATUS,
    payload: {
        status,
        token,
        email,
    },
});
