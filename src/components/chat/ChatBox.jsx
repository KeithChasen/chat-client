import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { 
        currentChat, 
        messages, 
        messagesLoading, 
        messagesError 
    } = useContext(ChatContext);

    const { recipientUser } = useFetchRecipient(currentChat, user);
    const [textMessage, setTextMessage] = useState('');

    console.log('text', textMessage)

    if (!recipientUser) {
        return (
            <p style={{ 
                textAlign: "center",
                width: "100%" 
            }}>No conversation selected</p>
        )
    }

    if (messagesLoading) {
        return (
            <p style={{ 
                textAlign: "center",
                width: "100%" 
            }}>Loading chat...</p>
        )
    }

    return ( 
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser.name}</strong>
            </div>
            <Stack gap={3} className="messages">
                { messages && messages.map((message, index) => (
                    <Stack 
                        key={index} 
                        className={`message flex-grow-0 ${message.senderId === user._id ? 
                            'self align-self-end' : 
                            'align-self-start'}`
                        }
                    >
                        <span>{message.text}</span>
                        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>
                ))}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji 
                    value={textMessage} 
                    onChange={setTextMessage}
                    fontFamily='nunito'
                    borderColor="rgba(72, 112, 223, 0.2)"
                />
            </Stack>
        </Stack> 
    );
}
 
export default ChatBox;