import { useState } from "react";


const IssueCard = ({name, isAssigned, index, handleOnClick}) => {
  return (
    <div className={`py-2 px-4 relative cursor-pointer flex items-center ${isAssigned ? `bg-green-500/[0.3]` : `bg-red-500/[0.3]`} rounded-md max-sm:min-w-[80svw]`} onClick={() => handleOnClick(index)}>
      <h1>{name}</h1>
    </div>
  );

}

export default function ViewIssues({ issues }) {
  if(issues == undefined || issues == null){
    return (<h1>No Issues Found</h1>)
  }
  const [idx, setIdx] = useState(0);
  const handleOnClick = (index) => {
    setIdx(index);
  }
  return (
    <>
      <div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
        {issues.map((issue, index) => (
          <IssueCard key={index} name={issue.title} isAssigned={issue.assigned} handleOnClick={handleOnClick} index={index} />
        ))}
      </div>
      <div className="bg-[#393E46] min-h-[94svh] min-w-[50svw] flex flex-col items-center justify-evenly rounded-lg gap-5 max-sm:min-w-[80svw] max-sm:mt-2 max-sm:min-h-[50svh]">
        <h1 className="profile_name text-slate-200 font-bold text-2xl mt-2 min-h-max">{issues[idx].category} : {issues[idx].title}</h1>
        <h3 className="text-slate-200">Location: {issues[idx].location}</h3>
        {issues[idx].issue_media && (
          <div className="min-w-[45svw] min-h-[50svh] bg-[#222831] rounded-lg p-1 flex items-center justify-center">
            {issues[idx].issue_media.endsWith(".jpg") || issues[idx].issue_media.endsWith(".jpeg") ||
            issues[idx].issue_media.endsWith(".png") ? (
              <img src={issues[idx].issue_media} alt="Issue Media" className="max-w-[43svw] max-h-[47svh] max-sm:max-w-[80svw] max-sm:max-h-[40svh]" />
            ) : (
              <video src={issues[idx].issue_media} controls className="max-w-[43svw] max-h-[47svh] max-sm:max-w-[80svw] max-sm:max-h-[40svh]" />
            )}
          </div>
        )}
        <p className="text-left block text-slate-200 font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 min-h-max max-h-[20svh]">{issues[idx].description}</p>
        <div className="flex justify-center w-full items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setIdx((idx - 1 + issues.length) % issues.length)}
            className="bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Prev
          </button>
          <button
            onClick={() => setIdx((idx + 1) % issues.length)}
            className="bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}