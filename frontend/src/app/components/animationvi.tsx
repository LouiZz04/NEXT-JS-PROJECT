'use client'

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { like } from './adding';

interface props {
    item: {
        videos: {
            large: {
                url: string;
            }
        }
    };
}

const Aniv: React.FC<props> = ({ item }) => {
    const [showHeart, setShowHeart] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const {username} = useAuth();

    const dd = () => {
        setShowHeart(true);
        setFadeOut(false);

        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 300);
        }, 2000);
    };

    like(username, item.videos.large.url).then(response => console.log(response))
    .catch(error => console.log(error));


    return (
        <div className="relative">
            <video controls width={250} height={250} onDoubleClick={dd} className="w-full h-auto rounded-lg shadow-md hover:transition-opacity hover:opacity-80 duration-300 ease-in-out">
                <source src={item.videos.large.url} type="video/mp4"/>
            </video>{showHeart && (<span className={`absolute top-2 right-2 text-2xl transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>❤️</span>)}
        </div>
    );
};

export default Aniv;
