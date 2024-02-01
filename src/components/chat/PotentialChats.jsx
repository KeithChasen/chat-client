import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {
    const { potentialChats } = useContext(ChatContext);
    console.log(potentialChats, 'potentialChats')
    return (<>start chat</>);
}
 
export default PotentialChats;