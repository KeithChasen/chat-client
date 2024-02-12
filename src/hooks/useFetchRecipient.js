import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipient = ( chat, user ) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)

    const findRecipientId = (chat) => {
        if (!chat) {
            return null;
        }

        if (chat.firstMember !== user.id) {
            return chat.firstMember;
        }

        return chat.secondMember;
    }

    const recipientId = findRecipientId(chat);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

            if (response.error) {
                return setError(response);
            }

            setRecipientUser(response);    
        }

        getUser();
    }, [recipientId]);

    return { recipientUser, error };
}