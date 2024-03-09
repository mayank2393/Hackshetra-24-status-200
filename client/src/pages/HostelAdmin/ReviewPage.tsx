import { useEffect, useState } from "react";

type ReviewPageProps = {
    issues: Issue[];
    handleReview: (idx: number) => void;
}
type Issue = {
    title: string;
    description: string;
    media: string;
    category: string;
    visibility: string;
    assigned: boolean;
    complete: boolean;
    reviewed: boolean;
    location: string;
    technician: {
        name: string;
        email: string;
        category: string;
        phone: string;
        address: string;
        profilePhoto: string;
    }
};


type IssueCardProps = {
    name: string;
    index: number;
    handleOnClick: (index: number) => void;
};

const IssueCard = ({ name, index, handleOnClick }: IssueCardProps) => {
    return (
        <div className={`border:none mt-1 text-slate-700 font-semibold rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center py-2 px-4`} onClick={() => handleOnClick(index)}>
            <h1 className="font-bold">{name}</h1>
        </div>
    );

}

export default function ReviewPage({ issues, handleReview }: ReviewPageProps) {
    const [notReviewed, setNotReviewed] = useState(issues.filter(issue => !issue.reviewed));
    useEffect(() => {
        setNotReviewed(issues.filter(issue => !issue.reviewed));
    }, [issues]);
    const [idx, setIdx] = useState(0);
    const handleOnClick = (index: number) => {
        setIdx(index);
    }
    return (
        <>
            {notReviewed.length == 0 && <div className="bg-slate-200 min-h-[94svh] min-w-[73svw] flex flex-col items-center justify-evenly rounded-lg font-bold text-5xl font-sans">ALL ISSUES REVIEWED 🎊</div>}
            <div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
                {issues.map((issue, index) => {
                    return (
                        <>
                            {!issue.reviewed && issue.assigned && <IssueCard key={index} name={issue.title} handleOnClick={handleOnClick} index={index} />}
                        </>
                    )
                })}
            </div>
            {!issues[idx].reviewed && issues[idx].assigned && <div className="bg-[#393E46] p-[5%] min-h-[94svh] min-w-[40svw] flex flex-col justify-evenly rounded-lg">
                <h1 className="profile_name text-white font-bold text-2xl text-center mt-2 min-h-max">{issues[idx].category} : {issues[idx].title}</h1>
                {issues[idx].media && (
                    <div className="min-w-[30svw] min-h-[50svh] bg-[#222831] m-auto rounded-lg p-1 flex items-center justify-center">
                        {issues[idx].media.endsWith(".jpg") || issues[idx].media.endsWith(".jpeg") ||
                            issues[idx].media.endsWith(".png") || issues[idx].media.endsWith(".gif") ? <img src={issues[idx].media} alt="Issue Media" className="w-full h-full object-cover" /> : <video src={issues[idx].media} controls className="w-full h-full object-cover" />}
                    </div>
                )}
                <p className="text-white">{issues[idx].description}</p>
                <button onClick={() => handleReview(idx)} className="text-slate-700 font-semibold mt-auto rounded bg-[#00FFF5] px-4 py-1 basis-[30%]  ">Review</button>
            </div>}
        </>
    )
}