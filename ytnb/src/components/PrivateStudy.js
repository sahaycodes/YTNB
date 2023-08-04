import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



const PrivateStudy = () => {
    const [roomCode,setRoomCode] = useState('');
    const history = useNavigate();

    const generateRoomCode = () => {
        //generating a random and unique room code 
        const code = Math.random().toString(36).substring(2,8).toUpperCase();
        setRoomCode(code);
    };
    const handleStartStudy = () => {
        //redirect to video chat page with generated room code
        history.push(`/video-chat/${roomCode}`);
    };

    return(
        <div>
            <h2>Create a Private Study</h2>
            <button onClick={generateRoomCode}>Room Code</button>
            <br/>
            {roomCode && (
                <div>
                    <p>Your Unique Code: {roomCode}</p>
                    <button onClick={handleStartStudy}>Start StudyJam</button>
                    </div>
            )}
        </div>
    );
};

export {PrivateStudy};