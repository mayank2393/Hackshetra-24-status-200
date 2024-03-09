import { hostname } from "./server";
import axios from "axios";

async function signupStudent(data){
    const studentInfo = await axios.post(`${hostname}/api/signup/student`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log(studentInfo);
}

async function signupTechnician(data){
    data.role = 'technician';
    const technicianInfo = await axios.post(`${hostname}/api/signup/technician`, data);
    console.log(technicianInfo);
}

async function signupHostelAdmin(data){
    data.role = 'hostel_admin';
    const hostelAdminInfo = await axios.post(`${hostname}/api/signup/admin/hostel`, data);
    console.log(hostelAdminInfo);
}

async function signupCollegeAdmin(data){
    data.role = 'college_admin';
    const collegeAdminInfo = await axios.post(`${hostname}/api/signup/admin/college`, data);
    console.log(collegeAdminInfo);
}


export { signupStudent, signupTechnician, signupHostelAdmin, signupCollegeAdmin };