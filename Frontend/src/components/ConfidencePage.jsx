import React, { useEffect, useState } from 'react';

const ConfidencePage = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch('/api/score');
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

export default ConfidencePage;
