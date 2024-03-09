import { useState } from "react";

type Issue = {
  id: number;
  title: string;
  description: string;
  media: string;
  location: string;
  status: string;
  date: string;
};

type ViewIssuesProps = {
  issues: Issue[];
};

type IssueCardProps = {
  name: string;
  status: string;
  index: number;
  handleOnClick: (index: number) => void;
};

const IssueCard = ({ name, status, index, handleOnClick }: IssueCardProps) => {
  return (
    <div className={`py-2 text-slate-700 px-4 relative cursor-pointer flex items-center justify-between ${status == 'pending' ? `bg-gradient-to-r from-[#00FFF5] to-[#00ADB5]` : `bg-[#00ADB5]`} rounded-md transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center mt-2`} onClick={() => handleOnClick(index)}>
      <h1 className="font-bold">{name}</h1>
      <input type="checkbox" name="status" id="" />
    </div>
  );

}

export default function ViewIssues({ issues }: ViewIssuesProps) {
  const [idx, setIdx] = useState(0);
  const handleOnClick = (index: number) => {
    setIdx(index);
  }
  return (
    <>
      <div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
        {issues.map((issue, index) => (
          <IssueCard key={index} name={issue.title} status={issue.status} handleOnClick={handleOnClick} index={index} />
        ))}
      </div>
      <div className="bg-[#222831] min-h-[94svh] min-w-[50svw] flex flex-col items-center justify-evenly rounded-lg gap-5">
        <h1 className="profile_name text-white font-bold text-2xl mt-2 min-h-max">{issues[idx].title}</h1>
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
        <h3 className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 h-max shrink">Location: {issues[idx].location}</h3>
        <p className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 min-h-max max-h-[20svh] grow">{issues[idx].description}</p>
        <div className="flex justify-center w-full items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setIdx((idx - 1 + issues.length) % issues.length)}
            className="btn bg-[#00FFF5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Prev
          </button>
          <button
            onClick={() => setIdx((idx + 1) % issues.length)}
            className="btn bg-[#00FFF5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}