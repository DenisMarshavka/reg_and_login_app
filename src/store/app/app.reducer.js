import {SET_USERS, SET_USERS_ERROR, SET_USERS_LOADER_STATUS} from "./app.types";

const initState = {
    splashLoading: true,

    users: [],
    usersLoading: false,
    usersError: null,
};

const app = (state = initState, action = {}) => {
    switch (action.type) {
        case SET_USERS_LOADER_STATUS:
            return {
                ...state,
                usersLoading: action.payload,
            };

        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                usersLoading: false,
                usersError: null,
            };

        case SET_USERS_ERROR:
            return {
                ...state,
                users: [],
                usersLoading: false,
                usersError: action.payload,
            };

        default:
            return state;
    }
};

export default app;
