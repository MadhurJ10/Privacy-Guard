import React, { useState } from 'react';
import ApiClient from '../services/ApiClient';

const DisposableEmail = () => {
    const [email, setEmail] = useState('');
    const [inboxToken, setInboxToken] = useState(null);
    const [inbox, setInbox] = useState([]);
    const [error, setError] = useState(null);

    const generateEmail = async () => {
        try {
            setError(null); // Clear previous errors
            const response = await ApiClient.get('/email/create-disposableEmail');
            setEmail(response.data.account.address);
            setInboxToken(response.data.account.token);
        } catch (err) {
            setError('Failed to generate email. Please try again.');
        }
    };

    const getInbox = async () => {
        try {
            setError(null); // Clear previous errors
            if (!inboxToken) {
                setError('No email generated yet. Please generate an email first.');
                return;
            }
            const response = await ApiClient.post('/email/get-disposableEmailInbox', {
                inboxToken: inboxToken,
            });
            // console.log(response.data.inbox)
            setInbox(response.data.inbox || []); // Assuming API returns an "emails" array
        } catch (err) {
            setError('Failed to fetch inbox. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Disposable Email</h1>

            {/* Generate Email Section */}
            <div className="w-full max-w-md mb-8">
                <button
                    className="w-full px-4 py-3 bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black text-lg font-semibold rounded-lg shadow-md "
                    onClick={generateEmail}
                >
                    Generate Email
                </button>
            </div>

            {/* Display Generated Email */}
            {email && (
                <div className="mb-6 p-4 w-full max-w-md bg-white border rounded-lg shadow-sm text-center text-gray-700">
                    Your Disposable Email: <span className="font-mono text-indigo-600">{email}</span>
                </div>
            )}

            {/* Inbox Section */}
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Inbox</h2>
                    <button
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition"
                        onClick={getInbox}
                    >
                        Refresh
                    </button>
                </div>

                {/* Inbox Content */}
                <div className="flex flex-col space-y-4">
                    {inbox.length === 0 ? (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500 italic">
                            {error || 'No emails yet. Click "Generate Email" to get started!'}
                        </div>
                    ) : (
                        inbox.map((email, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{email.subject}</h3>
                                <p className="text-sm text-gray-600">{email.body}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisposableEmail;
