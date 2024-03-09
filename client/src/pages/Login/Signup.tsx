import { useLocation, useNavigate } from "react-router";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import studentBG from '../../assets/student_background.jpg'
import technicianBG from '../../assets/technician_background.jpg'
import hostelAdminBG from '../../assets/hostel_admin_background.jpg'
import collegeAdminBG from '../../assets/college_admin_background.jpg'
import { useMutation } from "@tanstack/react-query";
import { signupCollegeAdmin, signupHostelAdmin, signupStudent, signupTechnician } from "../../api/signup";
const inputCSS = "bg-transparent my-2"

const studentSchema = [
    {
        type: 'text',
        placeholder: "Name",
        name: "name",
        className: inputCSS,
    },
    {
        type: 'text',
        placeholder: "Domain ID",
        name: "domain_id",
        className: inputCSS
    },
    {
        type: 'number',
        maxLength: 10,
        placeholder: "Phone Number",
        name: "phone_number",
        className: inputCSS
    },
    {
        type: 'password',
        placeholder: "Password",
        name: "password",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Hostel",
        name: "hostel",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Room Number",
        name: "room_number",
        className: inputCSS
    },
    {
        type: 'file',
        placeholder: "Profile Picture",
        id: "photo",
        name: "profile_picture",
        className: "hidden"
    }
]

const technicianSchema = [
    {
        type: 'text',
        placeholder: "Name",
        name: "name",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Email",
        name: "email",
        className: inputCSS
    },
    {
        type: 'password',
        placeholder: "Password",
        name: "password",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Category",
        name: "category",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Phone Number",
        name: "phone_number",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Address",
        name: "Address",
        className: inputCSS
    }
];

const hostelAdminSchema = [
    {
        type: 'text',
        placeholder: "Name",
        name: "name",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Hostel Name",
        name: "hostel",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Domain ID",
        name: "domain_id",
        className: inputCSS
    },
    {
        type: 'password',
        placeholder: "Password",
        name: "password",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Phone Number",
        name: "phone_number",
        className: inputCSS
    }
];

const collegeAdminSchema = [
    {
        type: 'text',
        placeholder: "Name",
        name: "name",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Domain ID",
        name: "domain_id",
        className: inputCSS
    },
    {
        type: 'password',
        placeholder: "Password",
        name: "password",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "College Name",
        name: "college_name",
        className: inputCSS
    },
    {
        type: 'text',
        placeholder: "Phone Number",
        name: "phone_number",
        className: inputCSS
    }
];

const SignUp = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const data = location.state;

    const [student, setStudent] = useState({
        name: '',
        domain_id: '',
        phone_number: '',
        password: '',
        hostel: '',
        room_number: '',
        role: 'student'
    });
    const [studentPhoto, setStudentPhoto] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const submitStudent = useMutation<void, Error, FormData>({
        mutationFn: signupStudent,
        onSuccess: () => {
            navigator('/login');
        },
    });
    const submitTechnician = useMutation<void, Error, FormData>({
        mutationFn: signupTechnician,
        onSuccess: () => {
            navigator('/login');
        },
    });
    const submitHostelAdmin = useMutation<void, Error, FormData>({
        mutationFn: signupHostelAdmin,
        onSuccess: () => {
            navigator('/login');
        },
    });
    const submitCollegeAdmin = useMutation<void, Error, FormData>({
        mutationFn: signupCollegeAdmin,
        onSuccess: () => {
            navigator('/login');
        },
    });

    function handleStudentChange(e: any) {
        if (e.target.name == 'profile_picture') {
            setStudentPhoto(e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfilePicture(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }
    function handleOnStudentSubmit(e: any) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", studentPhoto);

        for (const key in student) {
            if (student.hasOwnProperty(key)) {
                data.append(key, (student as any)[key]);
            }
        }
        submitStudent.mutate(data);
    }

    // Technician Data
    const [technician, setTechnician] = useState({
        name: '',
        email: '',
        password: '',
        category: '',
        phone_number: '',
        Address: ''
    });
    function handleTechnicianChange(e: any) {
        setTechnician({
            ...technician,
            [e.target.name]: e.target.value
        });
    }
    function handleOnTechnicianSubmit(e: any) {
        e.preventDefault();
        submitTechnician.mutate((technician as any));
        navigator('/login');
    }

    // Hostel Admin Data

    const [hostelAdmin, setHostelAdmin] = useState({
        name: '',
        hostel: '',
        domain_id: '',
        password: '',
        phone_number: ''
    });
    function handleHostelAdminChange(e: any) {
        setHostelAdmin({
            ...hostelAdmin,
            [e.target.name]: e.target.value
        })
    }
    function handleOnHostelAdminSubmit(e: any) {
        e.preventDefault();
        submitHostelAdmin.mutate((hostelAdmin as any));
        navigator('/login');
    }

    // College Admin Data
    const [collegeAdmin, setCollegeAdmin] = useState({
        name: '',
        domain_id: '',
        password: '',
        college_name: '',
        phone_number: ''
    });
    function handleCollegeAdminChange(e: any) {
        setCollegeAdmin({
            ...collegeAdmin,
            [e.target.name]: e.target.value
        })
    }
    function handleOnCollegeAdminSubmit(e: any) {
        e.preventDefault();
        submitCollegeAdmin.mutate((collegeAdmin as any));
        navigator('/login');
    }

    // Conditional Content
    let content;
    let backG;

    if (!data) {
        content = <>
            <h1>Please select User Role</h1>
        </>;
    }
    else {
        switch (data.role) {
            case 'student':
                backG = studentBG;
                content = <>
                    {/* <h1 className="font-bold text-2xl text-center mb-2">Student Sign Up</h1> */}
                    <form action="" className="flex flex-col m-2 h-full">
                        <label htmlFor="photo">
                            <img src={profilePicture} className="w-[8rem] h-[8rem] rounded-full mx-auto my-1 bg-slate-500 cursor-pointer" />
                        </label>

                        {studentSchema.map((input, index) => (
                            <Input key={index} {...input} onChange={handleStudentChange} required />
                        ))}
                        <button type="submit" className="bg-[#20BFA9] shadow-sm shadow-[#58a399] hover:shadow-none text-white font-bold py-2 px-4 rounded-lg w-[100px] mt-auto transition-all mx-auto" onClick={handleOnStudentSubmit}>Sign Up</button>
                    </form>
                </>;
                break;
            case 'technician':
                content = <>
                    <form action="" className="flex flex-col m-2 h-full">
                        <h1 className="font-bold text-2xl text-center mb-2">Technician Sign Up</h1>
                        {technicianSchema.map((input, index) => (
                            <Input key={index} {...input} onChange={handleTechnicianChange} required />
                        ))}
                        <button type="submit" className="bg-[#20BFA9] shadow-sm shadow-[#58a399] hover:shadow-none text-white font-bold py-2 px-4 rounded-lg w-[100px] mt-auto transition-all mx-auto" onClick={handleOnTechnicianSubmit}>Sign Up</button>
                    </form>
                </>;
                backG = technicianBG;
                break;
            case 'hostelAdmin':
                content = <>
                    <form action="" className="flex flex-col m-2 h-full">
                        <h1 className="font-bold text-2xl text-center mb-2">Hostel Admin Sign Up</h1>
                        {hostelAdminSchema.map((input, index) => (
                            <Input key={index} {...input} onChange={handleHostelAdminChange} required />
                        ))}
                        <button type="submit" className="bg-[#20BFA9] shadow-sm shadow-[#58a399] hover:shadow-none text-white font-bold py-2 px-4 rounded-lg w-[100px] mt-auto transition-all mx-auto" onClick={handleOnHostelAdminSubmit}>Sign Up</button>
                    </form>
                </>;
                backG = hostelAdminBG;
                break;
            case 'collegeAdmin':
                content = <>
                    <form action="" className="flex flex-col m-2 h-full">
                        <h1 className="font-bold text-2xl text-center mb-2">College Admin Sign Up</h1>
                        {collegeAdminSchema.map((input, index) => (
                            <Input key={index} {...input} onChange={handleCollegeAdminChange} required />
                        ))}
                        <button type="submit" className="bg-[#20BFA9] shadow-sm shadow-[#58a399] hover:shadow-none text-white font-bold py-2 px-4 rounded-lg w-[100px] mt-auto transition-all mx-auto" onClick={handleOnCollegeAdminSubmit}>Sign Up</button>
                    </form>
                </>;
                backG = collegeAdminBG;
                break;
            default:
                content = null;
        }
    }

    return (
        <div style={{ backgroundImage: `url(${backG})`, backgroundSize: 'cover' }}>
            <div className="w-[100svw] h-[100svh] flex items-center justify-center overflow-hidden bg-[#00000081]">
                <div className="bg-gradient-to-b from-[#44436B] to-[#23283C] h-[90svh] m-5 customZoomIn rounded-lg text-white font-semibold  shadow-black shadow-lg p-[2%] min-w-[420px]">
                    {content}
                </div>
            </div>
        </div>
    )
}
export default SignUp