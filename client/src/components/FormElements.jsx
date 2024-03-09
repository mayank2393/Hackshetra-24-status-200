export function Input({name, onChange, placeholder, type, className}){
    return(
        <input className={className} type={type} name={name} onChange={onChange} placeholder={placeholder} />
    )
}

export const Button = ({ name, handleOnClick }) => {
    return (
        <button onClick={handleOnClick} className="bg-[#00FFF5] text-slate-700 font-semibold rounded p-2 text-lg  transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none">{name}</button>
    )
}