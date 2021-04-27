class WebRTC {
    private rtc: RTCPeerConnection;
    private readonly stream:  MediaStream | undefined;
    private rtcDescription: ((description: RTCSessionDescription | null) => void) = () => {};
    constructor({stream, iceServers}: {stream:  MediaStream | undefined, iceServers: RTCIceServer[] | undefined}) {
        this.rtc = new RTCPeerConnection({
            iceServers
        });
        this.stream = stream;
    }

    private addTrack() {
        this.stream?.getTracks().forEach(track => {
            if (this.stream) {
                this.rtc.addTrack(track, this.stream);
            }
        });
    }

    public on(str: string, callback: (response: MediaStream | RTCIceCandidate | RTCSessionDescription | null) => void) {
        if (str === 'stream') {
            this.rtc.ontrack = ({streams: [remoteStream]}) => {
                callback(remoteStream);
            }
        }
        if (str === 'onicecandidate') {
            this.rtc.onicecandidate = ({candidate}) => {
                candidate && callback(candidate);
            }
        }
        if (str === 'description') {
            this.rtcDescription = (description: RTCSessionDescription | null) => {
                description && callback(description);
            }
        }
    }

    public async setDescription(description: RTCSessionDescription) {
        await this.rtc.setRemoteDescription(
            new RTCSessionDescription(description)
        );
    }

    public async offer() {
        this.addTrack();
        const offer = await this.rtc.createOffer();
        await this.rtc.setLocalDescription(offer);
        this.rtcDescription(this.rtc.localDescription);
    }

    public async answer(offer: RTCSessionDescription | undefined) {
        if (offer) {
            await this.setDescription(offer);
            this.addTrack();
            const answer = await this.rtc.createAnswer();
            await this.rtc.setLocalDescription(answer);
            this.rtcDescription(this.rtc.localDescription);
        }
    }

    public async icecandidate(incoming: RTCIceCandidate) {
        const candidate = new RTCIceCandidate(incoming);
        await this.rtc.addIceCandidate(candidate);
    }

    public close() {
        this.rtc.close();
    }
}

export default WebRTC;
