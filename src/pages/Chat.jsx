import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"
import { Container, Stack } from 'react-bootstrap';
import UserChat from "../components/chat/UserChat";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
    const { user } = useContext(AuthContext)
    const { 
        userChats,
        isUserChatsLoading,
        updateCurrentChat
    } = useContext(ChatContext);

    return ( 
    <Container>
        <PotentialChats />
        {userChats && userChats.length ?
        <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="flex-grow-0 messages-box pe-3" gap={3}>
                { isUserChatsLoading && <p>Loading Chats...</p>}
                {
                    userChats.map((chat, index) => {
                        return(
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user}/>
                            </div>
                        )
                    })
                }
            </Stack>
            <ChatBox />
        </Stack> : null }
    </Container>);
}
 
export default Chat;