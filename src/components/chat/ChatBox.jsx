import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from 'react-bootstrap';
import moment from 'moment';

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { 
        currentChat, 
        messages, 
        messagesLoading, 
        messagesError 
    } = useContext(ChatContext);

    const { recipientUser } = useFetchRecipient(currentChat, user);

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
        </Stack> 
    );
}
 
export default ChatBox;