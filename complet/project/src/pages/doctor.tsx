// Doctalk - Medicine ChatBot in React.js
import React, { useState } from 'react';
import medicineDatabase from './medicine_database';
import '../style/doctor.css';


const Doctor = () => {
    const [chatBoxContent, setChatBoxContent] = useState(
        'Welcome to the Medicine ChatBot. Please enter the disease you want information.'
    );
    const [userInput, setUserInput] = useState('');
    const [counter, setCounter] = useState(1);

    const handleSendMessage = () => {
        const userMessage = userInput.trim();
        if (userMessage) {
            appendMessage(`${counter}. You: ${userMessage}`, 'user-message');
            respondToUser(userMessage);
            setUserInput('');
            setCounter(counter + 1);
        }
    };

    const handleRefresh = () => {
        setChatBoxContent(
            'Welcome to the Medicine ChatBot. Please enter the disease you want information.'
        );
        setUserInput('');
    };

    const handleListDiseases = () => {
        let diseaseList = "Available Diseases:\n";
        let count = 1;
        for (let disease in medicineDatabase) {
            diseaseList += `${count}. ${capitalizeFirstLetter(disease)}\n`;
            count++;
        }
        appendMessage(`ChatBot: ${diseaseList}`, 'bot-message');
    };

    const respondToUser = (userInput) => {
        const diseaseName = userInput.toLowerCase();
        if (diseaseName in medicineDatabase) {
            const medicines = medicineDatabase[diseaseName].tablets;
            const details = medicineDatabase[diseaseName].details;
            let message = `Medicine Information for ${capitalizeFirstLetter(diseaseName)}:\n\n`;
            for (let tablet in medicines) {
                const info = medicines[tablet];
                message += `${tablet}:\n  - Details: ${info.details}\n  - Dosage: ${info.dosage}\n  - Side Effects: ${info.side_effects}\n  - When to Take: ${info.when_to_take}\n\n`;
            }
            message += `Disease Details: ${details}`;
            appendMessage(`ChatBot: ${message}`, 'bot-message');
        } else {
            appendMessage("ChatBot: Sorry, I couldn't find information for that disease.", 'bot-message');
        }
    };

    const appendMessage = (message, className) => {
        setChatBoxContent((prevContent) => `${prevContent}\n${message}`);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div id="chat-container">
            <div id="chat-header">
                <h1>~ Doc-Talk ~</h1>
            </div>
            <div id="chat-box" style={{ whiteSpace: 'pre-line' }}>
                {chatBoxContent}
            </div>
            <center>
                <input
                    type="text"
                    id="user-input"
                    value={userInput}
                    placeholder="Enter disease name here...."
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                />
                <br />
                <br />
            <div className='nom'>
            <button id="send-button" onClick={handleSendMessage}>
                    Send
                </button>
                <button id="refresh-button" onClick={handleRefresh}>
                    Refresh
                </button>
                <button id="list-button" onClick={handleListDiseases}>
                    List Diseases
                </button>
            </div>
                
            </center>
        </div>
    );
};

export default Doctor;
