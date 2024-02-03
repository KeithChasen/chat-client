import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipient = ( chat, user ) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)

    const recipientId = chat && chat.members.find(id => id !== user._id)

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