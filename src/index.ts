import express, {Application} from "express";
import {config} from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import {passportJwt} from "./middleware/passport";
import authRoutes from "./routes/authRoute";
import meetingRoute from "./routes/meetingRoute";
import userRoute from "./routes/userRoute";
import path from "path";
import http from "http";
import WebSocket from "socket.io";


config();
const PORT = process.env.NODE_ENV === 'production' ? 3003 : 5000;

const app: Application  = express();
const server = http.createServer(app);

const io = new WebSocket.Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on("connection", (socket) => {

    socket.on("me", (id) => {
        socket.emit("me", socket.id);
    });


    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data: { userToCall: string; offer: RTCSessionDescription; from: string; name: string; }) => {
        io.to(data.userToCall).emit("callUser", { offer: data.offer, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data: { to: string; answer: RTCSessionDescription; }) => {
        io.to(data.to).emit("callAccepted", { answer: data.answer, from: data.to});
    });

    socket.on("ice-candidate", (data: { target: string; candidate: RTCIceCandidate; }) => {
        io.to(data.target).emit("ice-candidate", data.candidate);
    });
});


app.use(passport.initialize());
passportJwt(passport);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/meeting', meetingRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../my-app', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, '../my-app', 'build', 'index.html'
            )
        );
    });
}

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
