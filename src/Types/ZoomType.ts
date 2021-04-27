import {LegacyRef} from "react";

export type InitialZoomType = {
    myVideo: LegacyRef<HTMLVideoElement> | undefined
    userVideo: LegacyRef<HTMLVideoElement> | undefined
    stream: MediaStream
    callAccepted: boolean
    callEnded: boolean
    myId: string
    isVideo: boolean
    onVideo: () => void
    myName:string
    callUser: (id: string) => Promise<void>
    leaveCall: () => void
}
