import { Chatroom, Chatmessage } from "./chatRoom"

export const CHATROOMS = [
    new Chatroom('CBS Surf', [], ''),
    new Chatroom('CBS Something else', [], ''),
    new Chatroom('Frederik Frost Jensen', [
        new Chatmessage("Yo whats up", 'April 17, 2022 03:24:00', "2"),
        new Chatmessage("Hey man", 'April 18, 2022 12:01:00', "Og9ivJN1VgakZ6UTThdC3lUQEQr1", true)
    ], ''),

]