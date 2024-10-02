import axios from 'axios';

export const like = async (username: string, url: string) => {
    try {
        const response = await axios.post('http://localhost:3001/addlike', {
            username: username, // Pass in the actual username
            url: url
        });
        return response.data;
    } catch (error) {
        console.error('Error liking image:', error);
        throw error;
    }
};
