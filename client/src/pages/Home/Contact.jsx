import { useState } from "react";
// import axiosInstance from "../Helpers/axiosInstance";
import { useToast } from '@chakra-ui/react'


export default function Contact(){
    const toast = useToast()
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    const  handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserInput({
         ...userInput,
            [name]: value
        })
    }
    const onFormSubmit = async (e) => {
        if(!userInput.email || !userInput.name || !userInput.message){
            toast({
                title: 'Failed',
                description: `Fill All Details`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return;
        } 
        // I Have HTML form Validations 
        // if(isEmail(userInput.email)){
        //     toast.error("Invalid email");
        //     return;
        // }
        try{
            const response = axiosInstance.post('/contact', userInput);
            toast.promise(examplePromise, {
                success: { title: 'Email Sent', description: 'Looks great' },
                error: { title: 'Email Not Sent', description: 'Something wrong' },
                loading: { title: 'Sending', description: 'Please wait' },
            })
            const res = await response;
            if(res?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        }catch(error){
            toast({
                title: 'Something Went Wrong',
                description: `${error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
    }
    
    return (
        <>
            <div className="flex items-center justify-center h-[100vh] bg-slate-600">
            <div className="flex w-[40%] flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-22rem">
                <h1 className="text-3xl font-semibold">
                    Contact Us
                </h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-[1.2rem] font-semibold">Name</label>
                    <input
                        value={userInput.name}
                        onChange={handleInputChange} 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Enter your name" 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                    />
                </div>
                
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-[1.2rem] font-semibold">Email</label>
                    <input
                        value={userInput.email}
                        onChange={handleInputChange} 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your Email" 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                    />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-[1.2rem] font-semibold">Message</label>
                    <textarea 
                        value={userInput.message}
                        onChange={handleInputChange}
                        name="message" 
                        id="message" 
                        placeholder="Your Message"  
                        className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                    />
                </div>
                <button onClick={onFormSubmit} className="w-full bg-yellow-400 font-bold text-yellow-900 rounded-sm py-2 hover:text-yellow-100 hover:bg-yellow-600 transition-all ease-in-out duration-300">
                    Send Message
                </button>
            </div>
            </div>
        </>
    )
}