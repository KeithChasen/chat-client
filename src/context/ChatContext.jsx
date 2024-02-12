import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext);

    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    useEffect(() => {

        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                console.log('Error fetching users', response)
            }

            const pChats = response.filter(u => {
                let isChatCreated = false;

                if (user && user.id === u.id) {
                    return false;
                }
                
                if (userChats) {
                    isChatCreated = userChats.filter(
                        chat => 
                            chat.firstMember !== user.id || 
                            chat.secondMember !== user.id
                        )

                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        }

        getUsers();

    }, [user]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user && user.id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user.id}`);

                setIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);
            }
        }

        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            if (currentChat) {
                setMessagesLoading(true);
                setMessagesError(null);
    
                const response = await getRequest(`${baseUrl}/messages/${currentChat.id}`);
    
                setMessagesLoading(false);
    
                if (response.error) {
                    return setMessagesError(response);
                }
    
                setMessages(response);
            }
        }

        getMessages();
    }, [currentChat]);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(
            `${baseUrl}/chats`, 
            JSON.stringify({ firstId, secondId })
        );

        console.log(response, 'RES create chat')

        if (response.error) {
            return console.log('Error creating chat', response)
        }

        setUserChats([...userChats, response]);
    }, [])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return;

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage('');
    }, []);

    return <ChatContext.Provider 
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            messagesLoading,
            messagesError,
            currentChat,
            sendTextMessage
        }}
    >{children}</ChatContext.Provider>
}