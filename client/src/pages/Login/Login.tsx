import { useEffect, useRef, useState } from "react"
import welcomeImg from '../../assets/welcome.gif'
import studentBG from '../../assets/student_background.jpg'
import technicianBG from '../../assets/technician_background.jpg'
import hostelAdminBG from '../../assets/hostel_admin_background.jpg'
import collegeAdminBG from '../../assets/college_admin_background.jpg'
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios"
import { hostname } from "@/api/server"

interface SelectCollegeProps {
    college: string,
    handleSetCollege: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
interface CollegeProps {
    college: string
}
interface SelectRoleProps {
    handleRole: (role: { isStudent: boolean, isTechnician: boolean, isHostelAdmin: boolean, isCollegeAdmin: boolean }) => void
}
const SelectCollege = ({ handleSetCollege }: SelectCollegeProps) => {
    const collegeArray = [
        "NIT Kurukshetra",
        "NIT Delhi",
        "NIT Jalandhar",
        "NIT Patna",
        "NIT Jamshedpur",
        "NIT Durgapur",
        "NIT Rourkela",
        "NIT Agartala"
    ]
    return (
        <>
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-yellow-500">Select College</h1>
            <select className="w-[20svw] p-2 mb-5 rounded-lg" name="college" id="college" onChange={handleSetCollege}>
                {collegeArray.map((college, index) => <option className="cursor-pointer" key={index} value={college}>{college}</option>)}
            </select>
            {/* <button className="p-[2%] mb-5 rounded-full text-white text-center font-bold hover:bg-blue-800 hover:scale-[1.1] transition-all cursor-pointer" onClick={() => handleGoButtonClick()}>GO</button> */}
        </>
    )
}
const Role = ({ handleRole }: SelectRoleProps) => {
    return (
        <>
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-red-200">Select <span className="bg-red-500 text-black inline-flex rounded-md px-4 py-1 font-bold mt-5">Role</span></h1>
            <div className="grid grid-cols-2 gap-4">
                <span
                    style={{ backgroundImage: `url(${studentBG})`, backgroundSize: 'cover' }}
                    className="w-[150px] h-[150px] mb-2 cursor-pointer flex items-center justify-center relative rounded-lg"
                    onClick={() => {
                        handleRole({ isStudent: true, isTechnician: false, isHostelAdmin: false, isCollegeAdmin: false })
                    }}
                >
                    <span className="text-white text-center font-bold px-2 py-1 bg-[#0000009d] w-full h-full flex items-center justify-center text-xl">Student</span>
                </span>
                <span
                    style={{ backgroundImage: `url(${technicianBG})`, backgroundSize: 'cover' }}
                    className="w-[150px] h-[150px] mb-2 rounded-lg cursor-pointer flex items-center justify-center relative"
                    onClick={() => {
                        handleRole({ isStudent: false, isTechnician: true, isHostelAdmin: false, isCollegeAdmin: false })
                    }}
                >
                    <span className="text-white text-center font-bold px-2 py-1 bg-[#0000009d] w-full h-full flex items-center justify-center rounded-lg text-xl">Technician</span>
                </span>
                <span
                    style={{ backgroundImage: `url(${hostelAdminBG})`, backgroundSize: 'cover' }}
                    className="w-[150px] h-[150px] mb-2 rounded-lg cursor-pointer flex items-center justify-center relative"
                    onClick={() => {
                        handleRole({ isStudent: false, isTechnician: false, isHostelAdmin: true, isCollegeAdmin: false })
                    }}
                >
                    <span className="text-white text-center font-bold px-2 py-1 bg-[#0000009d] w-full h-full flex items-center justify-center rounded-lg text-xl">Hostel Admin</span>
                </span>
                <span
                    style={{ backgroundImage: `url(${collegeAdminBG})`, backgroundSize: 'cover' }}
                    className="w-[150px] h-[150px] mb-2 rounded-lg cursor-pointer relative"
                    onClick={() => {
                        handleRole({ isStudent: false, isTechnician: false, isHostelAdmin: false, isCollegeAdmin: true })
                    }}
                >
                    <span className="text-white text-center font-bold px-2 py-1 bg-[#0000009d] w-full h-full flex items-center justify-center rounded-lg text-xl">College Admin</span>
                </span>
            </div>
        </>
    )
}
const StudentLogin = ({ college }: CollegeProps) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: 'student'
    });

    const domainID = useRef(null);
    const student_password = useRef(null);

    const navigate = useNavigate();
    const data = {
        college: college,
        role: 'student'
    }
    const responseMessage = async (response: any) => {
        const res = await axios.post(`${hostname}/api/login/student/v1/google`, { token: response.credential });
        console.log(res);
        localStorage.clear();
        const { student } = res.data;
        for(const field in student){
            localStorage.setItem(field, student[field]);
        }
        const time = new Date();
        time.setTime(time.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + time.toUTCString();
        document.cookie = `token=${res.data.token}; expires=${expires}`;
        navigate("/student", { state: { ...data } });
    }

    const errorMessage = (error: any) => {
        console.log(error);
    }

    const handleLogin = async (e: any) => {
        let domain_id = (domainID as any).current.value;
        let password = (student_password as any).current.value;
        let role = "student";
        const { data } = await axios.post(`${hostname}/api/login/student`, { domain_id, password, role });
        const { student } = data;
        localStorage.clear();
        console.log(student);
        for(const key in student){
            localStorage.setItem(key, (student as any)[key]);
        }
        document.cookie = `token=${data.token}`;
        navigate("/student", { state: { ...data } });
    }

    return (
        <>
            {/* Asking for DomainID and Password for Login as Student or Google Login */}
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-blue-200 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">Student Login</h1>
            <input type="email" ref={domainID} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="DomainID" />
            <input type="password" ref={student_password} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="Password" />
            <button
                className="px-[2%] py-1 mb-5 rounded-lg text-white text-center font-bold hover:bg-blue-800 hover:scale-[1.1] transition-all cursor-pointer border-white border"
                onClick={handleLogin}
            >
                Login
            </button>
            {user ? <GoogleLogin onSuccess={responseMessage} onError={errorMessage as any} /> : <div id="google_login"><p>{user?.username}</p><p>{user?.email}</p></div>}
            <a href="#" className="text-blue-200">Forgot Password?</a>
            {/* Havenot Signed Up Do sign up */}
            <p className="text-yellow-500">Don't have an account? <span className="text-blue-300 cursor-pointer hover:text-white hover:font-semibold" onClick={() => navigate("/signup", { state: { ...data } })} >Sign Up</span></p>
        </>
    )
}


const TechnicianLogin = ({ college }: CollegeProps) => {
    const [user, setUser] = useState<{ username: string, email: string } | null>(null);
    const email = useRef(null);
    const password = useRef(null);
    const data = {
        college: college,
        role: 'technician'
    }
    const navigate = useNavigate();
    
    const handleTechnicianLogin = async ()=>{
        const data: any = {};
        data.email = (email as any).current.value;
        data.password = (password as any).current.value
        data.role = 'technician';
        const response: any = await axios.post(`${hostname}/api/login/technician`, data);
        const { technician } = response.data;
        localStorage.clear();
        console.log(response);
        for(const key in technician){
            localStorage.setItem(key, (technician as any)[key]);
        }
        navigate("/technician", { state: { ...data } })
    }

    return (
        <>
            {/* Asking Email and password from Technician to Login */}
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-blue-200 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">Technician Login</h1>
            <input type="email" ref={email} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="Email" />
            <input type="password" ref={password} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="Password" />
            <button
                className="px-[2%] py-1 mb-5 rounded-lg text-white text-center font-bold hover:bg-blue-800 hover:scale-[1.1] transition-all cursor-pointer border-white border"
                onClick={() => {handleTechnicianLogin()}}
            >
                Login
            </button>
            <a href="#" className="text-blue-200">Forgot Password?</a>
            {/* Havenot Signed Up Do sign up */}
            <p className="text-yellow-500">Don't have an account? <span className="text-blue-300 cursor-pointer hover:text-white hover:font-semibold" onClick={() => navigate("/signup", { state: { ...data } })} >Sign Up</span></p>
        </>
    )
}
const HostelAdminLogin = ({ college }: CollegeProps) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const domain_id = useRef(null);
    const password = useRef(null);
    const data = {
        college: college,
        role: 'hostelAdmin'
    }
    
    const handleHostelAdminLogin = async ()=>{
        const data: any = {};
        data.domain_id = (domain_id as any).current.value;
        data.password = (password as any).current.value
        data.role = 'hostel_admin';
        const response: any = await axios.post(`${hostname}/api/login/admin/hostel`, data);
        const { hostelAdmin } = response.data;
        console.log(response);
        localStorage.clear();
        for(const key in hostelAdmin){
            localStorage.setItem(key, (hostelAdmin as any)[key]);
        }
        navigate("/hosteladmin", { state: { ...data } })
    }
    return (
        <>
            {/* Hostel Admin login using domain id and password */}
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-blue-200 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">Hostel Admin Login</h1>
            <input type="email" ref={domain_id} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="DomainID" />
            <input type="password" ref={password} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="Password" />
            <button
                className="px-[2%] py-1 mb-5 rounded-lg text-white text-center font-bold hover:bg-blue-800 hover:scale-[1.1] transition-all cursor-pointer border-white border"
                onClick={() => { handleHostelAdminLogin() }}
            >
                Login
            </button>
            <a href="#" className="text-blue-200">Forgot Password?</a>
            {/* Havenot Signed Up Do sign up */}
            <p className="text-yellow-500">Don't have an account? <span className="text-blue-300 cursor-pointer hover:text-white hover:font-semibold" onClick={() => navigate("/signup", { state: { ...data } })} >Sign Up</span></p>
        </>
    )
}
const CollegeAdminLogin = ({ college }: CollegeProps) => {
    const [user, setUser] = useState(null);
    const data = {
        college: college,
        role: 'collegeAdmin'
    }
    const navigate = useNavigate();

    const domain_id = useRef(null);
    const password = useRef(null);
    
    
    const handleCollegeAdminLogin = async ()=>{
        const data: any = {};
        data.domain_id = (domain_id as any).current.value;
        data.password = (password as any).current.value
        data.role = 'college_admin';
        const response: any = await axios.post(`${hostname}/api/login/admin/college`, data);
        const { collegeAdmin } = response.data;
        console.log(response);
        localStorage.clear();
        for(const key in collegeAdmin){
            localStorage.setItem(key, (collegeAdmin as any)[key]);
        }
        navigate("/collegeadmin", { state: { ...data } })
    }
    return (
        <>
            {/* College Admin login using provided domain id and password */}
            <h1 className="text-3xl font-bold tracking-wider mb-5 text-blue-200 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">College Admin Login</h1>
            <input type="email"ref={domain_id} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="DomainID" />
            <input type="password" ref={password} className="w-[20svw] p-2 mb-5 rounded-lg" placeholder="Password" />
            <button
                className="px-[2%] py-1 mb-5 rounded-lg text-white text-center font-bold hover:bg-blue-800 hover:scale-[1.1] transition-all cursor-pointer border-white border"
                onClick={() => { handleCollegeAdminLogin() }}
            >
                Login
            </button>
            <a href="#" className="text-blue-200">Forgot Password?</a>
            {/* Havenot Signed Up Do sign up */}
            <p className="text-yellow-500">Don't have an account? <span className="text-blue-300 cursor-pointer hover:text-white hover:font-semibold" onClick={() => navigate("/signup", { state: { ...data } })} >Sign Up</span></p>
        </>
    )
}

const Login = () => {
    const [college, setCollege] = useState('NIT Kurukshetra')
    const [role, setRole] = useState({
        isStudent: false,
        isTechnician: false,
        isHostelAdmin: false,
        isCollegeAdmin: false
    })
    useEffect(() => {
        document.getElementById('login_view')?.scrollIntoView({ behavior: 'smooth' })
    }, [role])
    const handleSetCollege = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCollege(e.target.value)
    }

    return (
        <div className="flex justify-evenly customSlideLeft">
            <div style={{ backgroundImage: `url(${welcomeImg})`, backgroundSize: 'cover' }} className={`w-[60svw] h-screen flex items-center justify-center`}>
            </div>
            <div className="w-[40svw] h-screen overflow-hidden relative customFadeIn">
                {/* <FaArrowUp className="fixed bottom-4 right-4 text-white rounded-full bg-slate-600 hover:scale-150 cursor-pointer text-3xl p-2 min-w-max min-h-max" onClick={handleGoBack} /> */}
                <div className="w-[40svw] min-h-screen flex flex-col items-center justify-center bg-[#211709]">
                    <SelectCollege college={college} handleSetCollege={handleSetCollege} />
                    <hr className="w-[80%] h-0.5 bg-white my-5" />
                    <Role handleRole={setRole} />
                </div>
                <div className="flex scroll-auto" id="login_view">
                    {role.isStudent && <div className="min-w-[40svw] relative min-h-screen flex flex-col items-center justify-center bg-[#0000009d]" id="studentLogin">
                        <img src={studentBG} alt="" className="absolute z-[-1]" />
                        <StudentLogin college={college} />
                    </div>}
                    {role.isTechnician && <div className="min-w-[40svw] min-h-screen flex flex-col items-center justify-center bg-[#0000009d]" id="technicianLogin">
                        <img src={technicianBG} alt="" className="absolute z-[-1]" />
                        <TechnicianLogin college={college} />
                    </div>}
                    {role.isHostelAdmin && <div className="min-w-[40svw] min-h-screen flex flex-col items-center justify-center bg-[#0000009d]" id="hostelAdminLogin">
                        <img src={hostelAdminBG} alt="" className="absolute z-[-1]" />
                        <HostelAdminLogin college={college} />
                    </div>}
                    {role.isCollegeAdmin && <div className="min-w-[40svw] min-h-screen flex flex-col items-center justify-center bg-[#0000009d]" id="collegeAdminLogin">
                        <img src={collegeAdminBG} alt="" className="absolute z-[-1] " />
                        <CollegeAdminLogin college={college} />
                    </div>}
                </div>
            </div>
        </div>
    );
}
export default Login;