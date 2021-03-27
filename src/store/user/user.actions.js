import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

//User actions
export const setUserAuthorizationStatusAction = (status = true, token = '') => ({
    type: SET_USER_AUTHORIZATION_STATUS,
    payload: {
        status,
        token,
    },
});
