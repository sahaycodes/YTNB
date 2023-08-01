import React, {useEffect , useRef , useState} from 'react';

import Webcam from 'react-webcam';
import SimplePeer from 'simple-peer';

const StudyRoom =({roomCode}) => {
    const [peerStream , setPeerStream] = useState(null);
    const socketRef =useRef();
    const localStreamRef = useRef();
    const peerConnectionRef = useRef();
    const dataChannelRef = useRef();

    useEffect(() => {
        //initializing socket connection with server
        socketRef.current = new SimplePeer({initiator: true, trickle:false});

        //getting access to users's webcam
        navigator.mediaDevices.getUserMedia({video:true, audio:true})
        .then((stream) => {
            localStreamRef.current =stream;
            setPeerStream(stream);
        })
        .catch((err) => {
            console.error('Error accessing webcam:',err);
        });
        // handle any incoming calls from another user
        socketRef.current.on('signal',handleReceiveSignal);

        return () => {
            //clean up resources , when the component is unmountes
            if(peerConnectionRef.current){
                peerConnectionRef.current.destroy();

            }
            if(localStreamRef.current){
                localStreamRef.current.getTracks().forEach((track)=> track.stop());

            }
        };

    });

    const handleReceiveSignal = (signal) => {
        //set up peer connection
        peerConnectionRef.current = new SimplePeer({trickle:false});
        peerConnectionRef.current.signal(signal);

        peerConnectionRef.current.on('signal',(data) => {
            //sending to the other joinee
            socketRef.current.send(JSON.stringify(data));
        });
        peerConnectionRef.current.on('stream',(stream) =>{
            setPeerStream(stream);

        });
        //creating data channel for sending additional data
        peerConnectionRef.current.on('data',handleDataChannelMessage);
        dataChannelRef.current=peerConnectionRef.current;
    };

    const handleDataChannelMessage=(data)=>{
        console.log('Recived data:',data);
    };
    const sendData=(data)=>{
        if(dataChannelRef.current.readyState==='open'){
            dataChannelRef.cyrrent.send(JSON.stringify(data));
        }else{
            console.warn('Data channel is not open yet.Cannot send data.');
        }
    };
    return(
        <div>
            <h2>StudyRoom:{roomCode}</h2>
            <div>
                <h3>MySpace</h3>
                {peerStream && <Webcam className='video' mirrored={true} audio={false} video={true} ref={localStreamRef} />}

            </div>
            <h3>Peer's Space</h3>
            {peerStream && <video className="video"srcObject={peerStream} autoPlay />}
        </div>

    );
};

export {StudyRoom};