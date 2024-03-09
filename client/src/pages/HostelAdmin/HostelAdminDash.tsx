import { useState } from "react";
import HostelAdminProfile from "./HostelAdminProfile"
import AnalyticsPage from "./AnalyticsPage";
import NotAssignedPage from "./NotAssignedPage";
import AssignedPage from "./AssignedPage";
import ReviewPage from "./ReviewPage";

interface ButtonProps {
    name: string;
    handleOnClick: () => void;
}
const Button = ({ name, handleOnClick }: ButtonProps) => {
    let bg
    switch (name) {
        case "Analytics":
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
        <button onClick={handleOnClick} className={` text-slate-900 p-2  my-2 w-[95%] font-bold rounded bg-[#00ADB5] text-lg  transition-all shadow-[0_0_2px_#00FFF5] hover:shadow-none`}>{name}</button>
    )
}
const HostelAdminDash = () => {
    const [selected, setSelected] = useState({
        'AnalyticsPage': true,
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
            assigned: false,
            technician: {
                name: "John Doe",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            complete: false,
            reviewed: false,
            location: "Hostel Part 1"
        },
        {
            title: "Issue 2",
            description: "This is issue 2",
            media: "https://images.unsplash.com/photo-1631579162913-8d5d9a6b7e1c.jpg",
            category: "Electricity",
            visibility: "Public",
            assigned: false,
            technician: {
                name: "John Doe",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            complete: false,
            reviewed: false,
            location: "Hostel Part 2"
        },
        {
            title: "Issue 3",
            description: "This is issue 3",
            media: "https://images.unsplash.com/photo-1631579162913-8d5d9a6b7e1c",
            category: "Electricity",
            visibility: "Public",
            assigned: false, 
            technician: {
                name: "Debatreya Das",
                email: "hello@test.com",
                category: "Electricity",
                phone: "1234567890",
                address: "New York",
                profilePhoto: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            },
            complete: false,
            reviewed: false,
            location: "Hostel Part 3"
        }
    ]) // [Issue, Issue, Issue, ...]
    function handleAssign(idx : number){
        const newIssues = [...issues];
        newIssues[idx].assigned = true;
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
                <HostelAdminProfile />
                    {!selected.AnalyticsPage && <Button name="Analytics" handleOnClick={() => setSelected({ 'AnalyticsPage': true, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {!selected.NotAssignedPage && <Button name="Not Assigned" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': true, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {!selected.AssignedPage && <Button name="Assigned" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': false, 'AssignedPage': true, 'ReviewPage': false })} />}
                    {!selected.ReviewPage && <Button name="Review" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': true })} />}
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                {selected.AnalyticsPage && <AnalyticsPage />}
                {selected.NotAssignedPage && <NotAssignedPage issues={issues} handleAssign={handleAssign} />}
                {selected.AssignedPage && <AssignedPage issues={issues} />}
                {selected.ReviewPage && <ReviewPage issues={issues} handleReview={handleReview} />}
            </div>
        </div>
    )
}
export default HostelAdminDash