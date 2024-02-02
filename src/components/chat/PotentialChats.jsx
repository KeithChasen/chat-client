import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {
    const { potentialChats } = useContext(ChatContext);

    return (
        <div className="all-users">
            {
                potentialChats.length && potentialChats.map((u, index) => (
                     <div className="single-user" key={index}>
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                ))
            }
        </div>
    );
}
 
export default PotentialChats;