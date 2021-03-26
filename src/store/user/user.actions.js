import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

//User actions
export const setUserAuthorizationStatusAction = (payload = true) => ({
    type: SET_USER_AUTHORIZATION_STATUS,
    payload,
});
