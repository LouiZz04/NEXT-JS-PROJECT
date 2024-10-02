'use client'

import { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ChangePass(){

    const router = useRouter();
    const {username} = useAuth();

    const [oldpassword, setoldPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [error, setError] = useState('');

    const [showpass, setShowpass] = useState(false);

    function flip(){
        setShowpass((prevState) => !prevState);
    }

    const setnewpass = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/changepass', {
                username: username,
                password: oldpassword,
                newpassword: newpassword,
            });
            if (response.status === 200) {
                router.push('/');
            }
            else if(response.status === 401){
                setError('Invalid username or password');
            }
        } catch (error) {
            setError(`Error. Try again ${error}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Change Password</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={setnewpass} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="mb-6">
                    <input type={showpass? "text":"password"}  placeholder="Old Password" onChange={(e) => setoldPassword(e.target.value)} className="border border-gray-300 p-2 w-72 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    <button type="button" onClick={flip}><i className={`fas ${!showpass ? "fa-eye-slash" : "fa-eye"} p-1`}></i></button>
                </div>
                <div className="mb-6">
                    <input type={showpass? "text":"password"}  placeholder="New Password" onChange={(e) => setnewPassword(e.target.value)} className="border border-gray-300 p-2 w-72 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    <button type="button" onClick={flip}><i className={`fas ${!showpass ? "fa-eye-slash" : "fa-eye"} p-1`}></i></button>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Change Password</button>
            </form>
        </div>
    )
}