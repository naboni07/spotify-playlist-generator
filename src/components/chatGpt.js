import React, { useState } from 'react';
import axios from 'axios';

const ChatGpt = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const result = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: message,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
                }
            });

            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
            <p>{response}</p>
        </div>
    );
};

export default ChatGpt;