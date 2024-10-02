'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface props{
    isImage: boolean;
}

export default function Head({isImage}: props) {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const { username, isLoggedIn } = useAuth();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/results/${search}`)
        setSearch('')
    }

    const profile = () => {
        router.push(`/user/${username}`)
    }

    function cc(value: string) {
        isImage = value === 'image';
    }

    return (
        <header className="sticky flex items-center justify-between p-4 bg-gray-800 text-white">
            <Link href="/" className="text-2xl font-bold">LOGO</Link>

            <form className="flex-grow mx-4 flex" onSubmit={submit}>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search, then press Enter" className="w-72 max-w-[200px] md:max-w-[400px] p-2 text-black rounded-l-lg border-r-0"/>
                <select onChange={(e) => cc(e.target.value)} className="p-2 rounded-r-lg border-l-0 text-black">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </form>

            {!isLoggedIn? (
            <div className="text-sm md:text-base">
                <Link href="/login" className="hover:underline" title="Login to your account">Login</Link> | <Link 
                href="/Sign-up" className="hover:underline" title="Sign up for free!">Sign up</Link>
            </div>
            ): (
                <div>
                    <button onClick={profile} className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:opacity-70">
                        <span className="text-xl font-bold">{username.charAt(0).toUpperCase()}</span>
                    </button><p>{username}</p>
                </div>
            )}
        </header>

    )
}