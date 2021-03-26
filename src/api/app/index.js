import axios from "axios";

export const getUsersListAPI = () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data);
