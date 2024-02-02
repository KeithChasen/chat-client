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
                        onClick={() => createChat(user._id, u._id)}
                    >
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                ))
            }
        </div>
    );
}
 
export default PotentialChats;