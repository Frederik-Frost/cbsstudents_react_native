export class Chatroom {
    constructor(title, chatmessages, imageUrl, id){
        this.title = title;
        this.chatmessages = chatmessages;
        this.imageUrl = imageUrl;
        this.id =  id;
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