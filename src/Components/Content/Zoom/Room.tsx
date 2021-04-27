import React, {useContext, useState} from "react";
import {ZoomContext} from "../../../State/Zoom/ZoomProvider";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";


export const Room = () => {
    const [ idToCall, setIdToCall ] = useState("");

    const {
        callAccepted,
        callEnded,
        callUser,
        leaveCall,
        myId,
        isVideo,
        myName,
        myVideo,
        stream,
        onVideo,
        userVideo
    } = useContext(ZoomContext);

    return <div>
        <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
        <div className="container">
            <div className="video-container">
                <div className="video">
                    {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                </div>
                <div className="video">
                <video playsInline ref={userVideo} autoPlay style={{width: "300px"}}/>
                </div>
            </div>
            <div className="myId">
                <h4>{myName}</h4>
                <CopyToClipboard text={myId}>
                    <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                        Copy ID
                    </Button>
                </CopyToClipboard>

                <TextField
                    id="filled-basic"
                    label="ID to call"
                    variant="filled"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                />
                <div className="call-button">
                    {callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary" onClick={leaveCall}>
                            End Call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            <PhoneIcon fontSize="large" />
                        </IconButton>
                    )}
                    {idToCall}
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={onVideo}>
                Video: {isVideo ? 'OFF' : 'ON'}
            </Button>
        </div>
    </div>
}
