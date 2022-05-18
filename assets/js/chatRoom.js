import uuid from 'react-native-uuid';

export class Chatroom {
    constructor(title, chatmessages, imageUrl, members, key){
        this.title = title;
        this.chatmessages = chatmessages;
        this.imageUrl = imageUrl;
        this.members = members
        this.id = uuid.v4();
        this.key = key
    }
}

export class Chatmessage {
    constructor(text, timestamp, userId, messageRead=false) {
        this.text = text;
        this.timestamp = timestamp;
        this.userId = userId
        this.messageRead = messageRead
    }
}