// src/components/MessagePage.jsx
import React, { useEffect, useState } from 'react';

const MessagePage = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/message');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchMessage();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!message) return <div>Loading...</div>;

    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default MessagePage;
