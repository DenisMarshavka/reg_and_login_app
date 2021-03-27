import {SET_USER_AUTHORIZATION_STATUS} from "./user.types";

const initState = {
    globalUser: {
        email: '',
    },
    isAuthorized: false,
    userToken: '',
};

const user = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_USER_AUTHORIZATION_STATUS:
            return {
                ...state,
                isAuthorized: action.payload.status,
                userToken: action.payload.token,
                globalUser: {
                    ...state.globalUser,
                    email: action.payload.email,
                },
            };

        default:
            return state;
    }
};

export default user;
