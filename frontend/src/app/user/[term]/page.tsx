'use client'

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function User() {
    const { username, logout } = useAuth();
    const router = useRouter();
    const [likedImages, setLikedImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/likes/${username}`);
                setLikedImages(response.data.likes);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [username]);

    const logg = async () => {
        try {
            await axios.post('http://localhost:3001/logout');
            logout();
            router.push('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
      <div className="bg-black mx-auto p-0 text-white min-h-full">
        <nav className="flex justify-between items-center p-4 bg-gray-800">
          <div>
            <Link href="/" className="text-2xl font-bold">LOGO</Link>
          </div>

          <div className="space-x-4">
            <button onClick={logg} className="hover:underline">Logout</button>
            <Link href="/cpass" className="hover:underline">Change Pass</Link>
          </div>
        </nav><br/>

        <section className="mx-auto w-full">
          <div className="flex items-center justify-center w-44 h-44 bg-blue-600 rounded-full hover:opacity-100 mx-auto">
            <span className="text-8xl font-bold">{username.charAt(0).toUpperCase()}</span>
          </div>
          <p className="text-4xl mx-auto w-full flex justify-center pt-1">{username}</p>
        </section><br/><hr className="max-w-xl mx-auto"/>

        <section className="mt-8">
          <h2 className="text-2xl text-center">Liked Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {likedImages.length === 0 ? (
              <p className="text-center col-span-full">DoubleClick on Images or Videos to add them to your favorites</p>
            ) : (
              likedImages.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Liked image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md"/>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    );
}
