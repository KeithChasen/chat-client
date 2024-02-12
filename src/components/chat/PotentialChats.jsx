import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);

    return (
        <div className="all-users">
            {
                potentialChats.length && potentialChats.map((u, index) => (
                     <div 
                        className="single-user" 
                        key={index} 
                        onClick={() => createChat(user.id, u.id)}
                    >
                        {u.email}
                        <span className="user-online"></span>
                    </div>
                ))
            }
        </div>
    );
}
 
export default PotentialChats;