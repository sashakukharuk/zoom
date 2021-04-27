import React, {LegacyRef, useContext, useEffect, useReducer, useRef} from "react";
import {preloaderZoom} from "./ReducerZoom";
import {zoomState} from "./StateZoom";
import {InitialZoomType} from "../../Types/ZoomType";
import WebRTC from "../../webrtc/webrtc";
import {UserContext} from "../User/UserProvider";
import {actionZoom} from "./ActionsZoom";
import {socket} from "../../Request/socket";

export const ZoomContext = React.createContext<InitialZoomType>({} as InitialZoomType);

type PropsType = {
    children: any
}

export const ZoomProvider = ({children}: PropsType) => {
    const [state, dispatch] = useReducer(preloaderZoom, zoomState);

    const {firstName} = useContext(UserContext);

    const myVideo: LegacyRef<HTMLVideoElement> | undefined = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>({} as HTMLVideoElement);
    const peerRef = useRef<WebRTC>({} as WebRTC);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            dispatch(actionZoom.setStream(stream));
            if (myVideo && myVideo.current) {
                myVideo.current.srcObject = stream;

                myVideo.current.srcObject.getVideoTracks().map(track => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    track.enabled = false;
                });
            }
        });

        socket.on("me", (id: string) => {
            dispatch(actionZoom.setMyId(id));
        });

        socket.emit("me", socket.id);


        socket.once("callUser", async (data: { from: string; name: string; offer: RTCSessionDescription }) => {
            dispatch(actionZoom.setReceivingCall(true));
            dispatch(actionZoom.setUSerName(data.name));
            dispatch(actionZoom.setCaller(data.from));
            dispatch(actionZoom.setOffer(data.offer));
        });
    }, []);

    useEffect(() => {
        if (state.callers[0] && state.offer) {
            answerCall(state.callers[0], state.offer);
        }
    }, [state.offer, state.callers]);

    const callUser = async (id: string) => {
        const peer = new WebRTC({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ],
            stream: state.stream
        });

        peer.on('stream', (stream) => {

            if (userVideo && userVideo.current) {
                userVideo.current.srcObject = stream as MediaStream;
            }
        });

        peer.on('onicecandidate', (candidate) => {
            const payload = {
                target: id,
                candidate: candidate,
            };
            socket.emit("ice-candidate", payload);
        });

        peer.on('description', (description) => {
            const payload = {
                userToCall: id,
                offer: description,
                from: state.myId,
                name: firstName
            };

            socket.emit("callUser", payload);
        })

        peer.offer();

        socket.once("ice-candidate", (incoming: RTCIceCandidate) => {
            peer.icecandidate(incoming);
        });

        socket.once("callAccepted", async (data: {from: string; answer: RTCSessionDescription}) => {
            dispatch(actionZoom.setCallAccepted(true));

            await peer.setDescription(data.answer);
        })

        if (peerRef && peerRef.current) {
            peerRef.current = peer;
        }
    }

    const answerCall = async (id: string, offer: RTCSessionDescription) =>  {
        dispatch(actionZoom.setReceivingCall(false));
        dispatch(actionZoom.setCallAccepted(true));
        const peer = new WebRTC({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ],
            stream: state.stream
        });

        peer.on('stream', (stream) => {

            if (userVideo && userVideo.current) {
                userVideo.current.srcObject = stream as MediaStream;
            }
        });

        peer.on('onicecandidate', (candidate) => {
            const payload = {
                target: id,
                candidate: candidate,
            };
            socket.emit("ice-candidate", payload);
        });

        peer.on('description', (description) => {
            const payload = {
                answer: description,
                to: id
            };

            socket.emit("answerCall", payload);
        })

        peer.answer(offer);

        socket.once("ice-candidate", (incoming: RTCIceCandidate) => {
            peer.icecandidate(incoming);
        });

        if (peerRef.current) {
            peerRef.current = peer;
        }
    }

    const leaveCall = () => {
        dispatch(actionZoom.setCallEnded(true));
        state.stream.getTracks().forEach(track => track.stop());
        peerRef.current.close();
    }

    const onVideo = () => {
        if (myVideo.current && myVideo.current.srcObject) {
            if ("getVideoTracks" in myVideo.current.srcObject) {
                myVideo.current.srcObject.getVideoTracks().map(track => {
                    track.enabled = !state.isVideo;
                });
            }
            dispatch(actionZoom.setIsVideo(!state.isVideo));
        }
    }

    const value = {
        stream: state.stream,
        callAccepted: state.callAccepted,
        callEnded: state.callEnded,
        receivingCall: state.receivingCall,
        myId: state.myId,
        myName: firstName,
        userName: state.userName,
        callers: state.callers,
        isVideo: state.isVideo,
        onVideo,
        myVideo,
        userVideo,
        callUser,
        answerCall,
        leaveCall
    };
    return <ZoomContext.Provider value={value}>
        {children}
    </ZoomContext.Provider>
}
