import axios from "axios";
import { hostname } from "./server";

const createStudentIssue = async (data: any) => {
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    const authToken = decodedCookie.split('=')[1];
    const res = await axios.post(`${hostname}/api/issue/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`,
        }
    });
    return res.data;
}

const getStudentIssues = async () => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const authToken = decodedCookie.split('=')[1];
    const res = await axios.get(`${hostname}/api/issue/studentIssues`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    console.log(res);
    return res.data.issues;
}



export { getStudentIssues, createStudentIssue };