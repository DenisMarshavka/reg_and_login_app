import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

const initState = {
    globalUser: {},
    isAuthorized: true,
    userToken: '',
};

const user = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_USER_AUTHORIZATION_STATUS:
            return {
                ...state,
                isAuthorized: action.payload.status,
                userToken: action.payload.token,
            };

        default:
            return state;
    }
};

export default user;
