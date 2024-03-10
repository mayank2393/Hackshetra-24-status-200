import './AboutUs.css'
import ChhaviImg from '../../assets/Chhavi.jpg'
import DebatreyaImg from "../../assets/Debatreya.jpg"
import SanyamImg from "../../assets/Sanyam.jpg"
import MayankImg from "../../assets/Mayank.jpg"


const AboutUs = () => {
    return (
        <section className='h-screen bg-slate-600 max-h-screen aboutUs p-4 flex flex-col justify-center' >
            <h1 className='font-sans font-semibold'>Meet Our Team</h1>
            <p className='sm:w-[60%] font-semibold'>Our team is a with dynamic group of undergraduates. With a compact but highly skilled workforce of four friends, we collabrate closely to drive innovation and deliver quality solutions. </p>
            <div className="card-container min-h-[60svh] mt-auto">
                <div className="card pl-4 pr-2 rounded-tl-lg">
                    <img src={DebatreyaImg} alt="Debatreya" className='min-h-full' />
                </div>
                <div className="card px-2">
                    <img src={SanyamImg} alt="Sanyam" className='min-h-full' />
                </div>
                <div className="card px-2">
                    <img src={MayankImg} alt="Mayank" className='min-h-full' />
                </div>
                <div className="card pr-4 rounded-tr-lg">
                    <img src={ChhaviImg} alt="Chhavi" className='min-h-full' />
                </div>
            </div>
        </section>
    )
}
export default AboutUs