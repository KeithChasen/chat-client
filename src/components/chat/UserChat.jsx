import { useFetchRecipient } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipient(chat, user);
    return ( <>User Chat</> );
}
 
export default UserChat;