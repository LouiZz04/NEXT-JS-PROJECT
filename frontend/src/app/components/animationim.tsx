'use client'

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { like } from './adding';

interface props {
    item: {
        largeImageURL: string;
        tags: string;
    };
}

const Ani: React.FC<props> = ({ item }) => {
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

    like(username, item.largeImageURL).then(response => console.log(response))
    .catch(error => console.log(error));

    return (
        <div className="relative">
            <img src={item.largeImageURL} alt={item.tags} width={250} height={250} className="w-full h-auto rounded-lg cursor-pointer" onDoubleClick={dd}/>
            {showHeart && (<span className={`absolute top-2 right-2 text-2xl transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>❤️</span>)}
        </div>
    );
};

export default Ani;
