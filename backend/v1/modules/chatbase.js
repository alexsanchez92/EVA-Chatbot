const CHATBASE_KEY = process.env.CHATBASE_KEY;
const CHATBASE_KEY_S = process.env.CHATBASE_KEY_S;
const userChatbase = require('@google/chatbase').setApiKey(CHATBASE_KEY).setAsTypeUser() // Your Chatbase API Key // The type of message you are sending to chatbase: user (user) or agent (bot)
const agentChatbase = require('@google/chatbase').setApiKey(CHATBASE_KEY).setAsTypeAgent() // Your Chatbase API Key
const botVersion = '1.0';

exports.userMessage = function(handled, timestamp, source, intent, query, sessionId){
    userChatbase.newMessage(CHATBASE_KEY);
    if(handled){
        userChatbase.setAsHandled(); // set the message as handled -- this means the bot understood the message sent by the user
    }
    else{
        userChatbase.setAsNotHandled(); // set the message as handled -- this means the bot understood the message sent by the user
    }
    userChatbase.setTimestamp(timestamp) // Only unix epochs with Millisecond precision
        .setPlatform(source)
        .setIntent(intent)
        .setVersion(botVersion)    
        .setMessage(query)
        .setUserId(sessionId) 
        .send()
        .then()
        .catch();
        //.then(msg => console.log(msg.getCreateResponse()))
        //.catch(err => console.error(err));
}

exports.agentMessage = function(timestamp, source, intent, sessionId, messages){
    agentChatbase.newMessage(CHATBASE_KEY)
        .setTimestamp(timestamp) // Only unix epochs with Millisecond precision
        .setPlatform(source)
        .setIntent(intent)
        .setMessage(messages)
        .setVersion(botVersion)
        .setUserId(sessionId) 
        .send()
        .then()
        .catch();
}