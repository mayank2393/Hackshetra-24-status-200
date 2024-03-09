import { useEffect, useState } from "react";

type Issue = {
  title: string;
  description: string;
  media: string;
  category: string;
  visibility: string;
  assigned: boolean;
  technician: {
    name: string;
    email: string;
    category: string;
    phone: string;
    address: string;
    profilePhoto: string;
  }
  complete: boolean;
  reviewed: boolean;
  location: string;
};

type ViewIssuesProps = {
  issues: Issue[];
  handleAssign: (idx: number) => void;
};

type IssueCardProps = {
  name: string;
  index: number;
  handleOnClick: (index: number) => void;
};

const IssueCard = ({ name, index, handleOnClick }: IssueCardProps) => {
  return (
    <div className={`py-2 px-4 relative cursor-pointer  border:none mt-1 text-slate-700 font-semibold rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center max-w-[400px]`} onClick={() => handleOnClick(index)}>
      <h1>{name}</h1>
    </div>
  );

}

export default function NotAssignedPage({ issues, handleAssign }: ViewIssuesProps) {
  const [notAssigned, setNotAssigned] = useState(issues.filter(issue => !issue.assigned));
  useEffect(() => {
    setNotAssigned(issues.filter(issue => !issue.assigned));
  }, [issues]);
  const [idx, setIdx] = useState(0);
  const handleOnClick = (index: number) => {
    setIdx(index);
  }
  return (
    <>
      {notAssigned.length == 0 && <div className="bg-[#222831] min-h-[94svh] min-w-[73svw] flex flex-col items-center  text-white justify-evenly rounded-lg font-bold text-5xl font-sans">ALL ISSUES ASSIGNED 🎊</div>}
      <div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
        {issues.map((issue, index) => {
          return (
            <>
              {!issue.assigned && <IssueCard key={index} name={issue.title} handleOnClick={handleOnClick} index={index} />}
            </>
          )
        })}
      </div>
      {!issues[idx].assigned && <div className="bg-[#222831] min-h-[94svh] min-w-[50svw] flex flex-col items-center justify-evenly rounded-lg gap-5">
        <h1 className="profile_name text-white font-bold text-2xl mt-2 min-h-max">{issues[idx].category} : {issues[idx].title}</h1>
        {issues[idx].media && (
          <div className="min-w-[45svw] min-h-[50svh] bg-[#393E46] rounded-lg p-1 flex items-center justify-center">
            {issues[idx].media.endsWith(".jpg") || issues[idx].media.endsWith(".jpeg") ||
              issues[idx].media.endsWith(".png") ? (
              <img src={issues[idx].media} alt="Issue Media" className="max-w-[43svw] max-h-[47svh]" />
            ) : (
              <video src={issues[idx].media} controls className="max-w-[43svw] max-h-[47svh]" />
            )}
          </div>
        )}
        <h3 className="text-left block text-white font-semibold  basis-[100%] p-2 h-max min-w-[45svw]">Location: {issues[idx].location}</h3>
        <p className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 min-h-max max-h-[20svh]">{issues[idx].description}</p>
        <div className="flex justify-between w-full items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setIdx((idx - 1 + issues.length) % issues.length)}
            className="bg-[#00FFF5] text-slate-700 px-2 py-1 mx-5 rounded-md font-bold"
          >
            Prev
          </button>
          <button onClick={() => {
            handleAssign(idx)
            setIdx((idx + 1) % issues.length)
          }
          }
            className="bg-[#00FFF5] text-slate-700  px-2 py-1 basis-[30%] rounded-md font-bold bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none"
          >Assign</button>
          <button
            onClick={() => setIdx((idx + 1) % issues.length)}
            className="bg-[#00FFF5] text-slate-700 px-2 py-1 mx-5 rounded-md font-bold"
          >
            Next
          </button>

        </div>
      </div>}
    </>
  );
}