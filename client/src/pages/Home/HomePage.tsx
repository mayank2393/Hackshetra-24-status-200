import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="bg-black h-screen bg-[url('https://gifdb.com/images/high/light-trails-wave-background-r4tz04b0l8kqi6do.gif')] bg-cover">
            <nav className="bg-gray-800">
                <ul className="flex text-lg min-h-[5svh] justify-center font-semibold">
                    <li className="mr-6"><Link to="/" className="text-white">Home</Link></li>
                    <li className="mr-6"><Link to="/about" className="text-white">About</Link></li>
                    <li className="mr-6"><Link to="/contact" className="text-white">Contact</Link></li>
                    <li className="mr-6"><Link to="/login" className="text-white">Login</Link></li>
                </ul>
            </nav>
            <h1 className="text-center text-5xl mt-[40svh] font-bold text-white">Home Page is Under Construction</h1>
        </div>
    )
}
export default HomePage