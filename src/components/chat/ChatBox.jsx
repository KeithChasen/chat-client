import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";

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

    return ( <>ChatBox</> );
}
 
export default ChatBox;