import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

const initState = {
    globalUser: {},
    isAuthorized: true,
};

const user = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_USER_AUTHORIZATION_STATUS:
            return {
                ...state,
                isAuthorized: action.payload,
            };

        default:
            return state;
    }
};

export default user;
