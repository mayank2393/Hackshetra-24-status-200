import { useState } from "react";
import CollegeAdminProfile from "./CollegeAdminProfile"
import AssignAdmins from "./AssignAdmins";
import NotAssignedPage from "../HostelAdmin/NotAssignedPage";
import AssignedPage from "../HostelAdmin/AssignedPage";
import ReviewPage from "../HostelAdmin/ReviewPage";

interface ButtonProps {
    name: string;
    handleOnClick: () => void;
}
const Button = ({ name, handleOnClick }: ButtonProps) => {
    let bg
    switch (name) {
        case "Assign Hostel Admin":
            bg = "bg-blue-500"
            break;
        case "Not Assigned":
            bg = "bg-red-500"
            break;
        case "Assigned":
            bg = "bg-green-500"
            break;
        case "Review":
            bg = "bg-yellow-500"
            break;
        default:
            bg = "bg-blue-500"
            break;
    }
    return (
        <button onClick={handleOnClick} className={`$bg-[#00FFF5] text-slate-900 p-2  my-2 w-[95%] font-bold rounded bg-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none`}>{name}</button>
    )
}
const CollegeAdminDash = () => {
    const [selected, setSelected] = useState({
        'AssignAdmins': true,
        'NotAssignedPage': false,
        'AssignedPage': false,
        'ReviewPage': false
    })
    const [issues, setIssues] = useState([
        {
            title: "Issue 1",
            description: "This is issue 1",
            media: "https://images.unsplash.com/photo-1631579162913-8d5d9a6b7e1c.png",
            category: "Electricity",
            visibility: "Public",
            technician: {
                name: "Debatreya Das",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            assigned: false,
            complete: false,
            reviewed: false,
            location: "College Part 1"
        },
        {
            title: "Issue 2",
            description: "This is issue 2",
            media: "https://images.unsplash.com/photo-1631579162913-8d5d9a6b7e1c.jpg",
            category: "Electricity",
            visibility: "Public",
            technician: {
                name: "Debatreya Das",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            assigned: false,
            complete: false,
            reviewed: false,
            location: "College Part 2"
        },
        {
            title: "Issue 3",
            description: "This is issue 3",
            media: "https://images.unsplash.com/photo-1631579162913-8d5d9a6b7e1c",
            category: "Electricity",
            visibility: "Public",
            technician: {
                name: "Debatreya Das",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            assigned: false,
            complete: false,
            reviewed: false,
            location: "College Part 3"
        }
    ]) // [Issue, Issue, Issue, ...]
    function handleAssign(idx : number){
        const newIssues = [...issues];
        newIssues[idx].assigned = true;
        // axios call to update the issue
        setIssues(newIssues);
    }
    function handleReview(idx : number){
        const newIssues = [...issues];
        newIssues[idx].reviewed = true;
        // axios call to update the issue
        setIssues(newIssues);
    }
    return (
        <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-600">
            <div className="profile flex flex-col items-center bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md p-4">
                <CollegeAdminProfile />
                    {!selected.AssignAdmins && <Button name="Assign Hostel Admins" handleOnClick={() => setSelected({ 'AssignAdmins': true, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {!selected.NotAssignedPage && <Button name="Not Assigned" handleOnClick={() => setSelected({ 'AssignAdmins': false, 'NotAssignedPage': true, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {!selected.AssignedPage && <Button name="Assigned" handleOnClick={() => setSelected({ 'AssignAdmins': false, 'NotAssignedPage': false, 'AssignedPage': true, 'ReviewPage': false })} />}
                    {!selected.ReviewPage && <Button name="Review" handleOnClick={() => setSelected({ 'AssignAdmins': false, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': true })} />}
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                {selected.AssignAdmins && <AssignAdmins />}
                {selected.NotAssignedPage && <NotAssignedPage issues={issues} handleAssign={handleAssign} />}
                {selected.AssignedPage && <AssignedPage issues={issues} />}
                {selected.ReviewPage && <ReviewPage issues={issues} handleReview={handleReview} />}
            </div>
        </div>
    )
}
export default CollegeAdminDash