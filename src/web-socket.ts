import WebSocket, { Server as WSServer } from 'ws'
import { Server } from 'http'
import { Controller } from './user'

type Data = {
    message: 'users-online' | 'blocked-users' | 'user-online' | 'user-offline' | 'user-blocked' | 'user-unblocked' | 'new-message'
    data?: any
} & { [key in string]: any }

const ws = new WSServer({ noServer: true });

const sendMessage = ({
    data,
    sub,
    socket
}: {
    data: Data
    sub?: string | string[]
    socket?: WebSocket
}) => {
    if (sub) {
        for (const c of ws.clients) {
            const newSub = (c as any)._socket.sub
            if ((typeof sub === 'string')
                ? newSub === sub
                : sub.includes(newSub)) c.send(JSON.stringify(data))
        }

        return
    }
    if (socket) {
        socket.send(JSON.stringify(data))
        return
    }
    for (const c of ws.clients)
        c.send(JSON.stringify(data))
}

ws.on('connection', async socket => {
    // print number of active connections
    console.log("connected", ws.clients.size);
    const userController = new Controller
    const sub = (socket as any)._socket.sub
    // add-online-user
    userController.addOnlineUser(sub)
    // blocked-users
    sendMessage({
        data: {
            message: 'blocked-users',
            data: await userController.getBlockedUsers(sub)
        },
        socket: socket as any
    })
    // users-online
    sendMessage({
        data: {
            message: 'users-online',
            data: await userController.getOnlineUsers(sub)
        },
        socket: socket as any
    })

    // handle message events
    // receive a message and echo it back
    socket.on("message", (message) => {
        console.log(`Received message => ${message}`);
        socket.send(`you said ${message}`);
    });

    // handle close event
    socket.on("close", () => {
        console.log("closed", ws.clients.size);
        // remove-online-user
        userController.removeOnlineUser(sub)
    });

    // sent a message that we're good to proceed
    socket.send("connection established.");
})

const createWebSocket = (server: Server) => {
    server.on('upgrade', (request, socket, head) => {
        try {
            // authenticate here
            const searchParams = new URLSearchParams(String(request.url).substr(2));
            socket['sub'] = searchParams.get('token')
            ws.handleUpgrade(request, socket, head, socket => {
                ws.emit('connection', socket, request);
            })
        } catch (error) {
            console.log("upgrade exception", error);
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return
        }
    })
}

export { createWebSocket, sendMessage }