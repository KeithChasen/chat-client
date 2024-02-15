import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const findRecipientId = (chat, user) => {
    if (!chat) {
        return null;
    }

    if (chat.firstMember !== user.id) {
        return chat.firstMember;
    }

    return chat.secondMember;
}

export const useFetchRecipient = ( chat, user ) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)

    const recipientId = findRecipientId(chat, user);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/${recipientId}`);

            if (response.error) {
                return setError(response);
            }

            setRecipientUser(response);    
        }

        getUser();
    }, [recipientId]);

    return { recipientUser, error };
}