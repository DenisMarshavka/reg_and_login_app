import axios from "axios";

export const getUsersListAPI = async () => await axios.get('jsonplaceholder.typicode.com/users');
