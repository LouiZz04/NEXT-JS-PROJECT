'use client'

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login(){

    const router = useRouter();
    const {login} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [showpass, setShowpass] = useState(false);

    function flip(){
        setShowpass((prevState) => !prevState);
    }

    const setlogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            });
            if (response.status === 200) {
                login(username);
                router.push('/');
            }
            else if(response.status === 401){
                setError('Invalid username or password');
            }
        } catch (error) {
            setError(`Error logging in. Try again`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={setlogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                </div>
                <div className="mb-6">
                    <input type={showpass? "text":"password"}  placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 p-2 w-72 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    <button type="button" onClick={flip}><i className={`fas ${!showpass ? "fa-eye-slash" : "fa-eye"} p-1`}></i></button>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Login</button>
            </form>
            <h4>Don't have an account? <Link href="/Sign-up" className="hover:underline text-blue-600">Sign up</Link> now</h4>
        </div>
    )
}