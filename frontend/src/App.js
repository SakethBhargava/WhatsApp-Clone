import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions ---
const formatTimestamp = (isoString) => {
    if (!isoString) return '...';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

// --- SVG Icons ---
const CheckIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9.75 15.5L4.25 10L2.84 11.41L9.75 18.32L21.16 6.91L19.75 5.5L9.75 15.5Z"/></svg>);
const DoubleCheckIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>);
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);


// --- UI Components ---
const MessageBubble = ({ msg }) => {
    const isFromMe = msg.from_me;
    const bubbleColor = isFromMe ? 'bg-green-100' : 'bg-white';
    const alignment = isFromMe ? 'items-end' : 'items-start';
    const StatusIndicator = () => {
        if (!isFromMe) return null;
        const color = msg.status === 'read' ? 'text-blue-500' : 'text-gray-400';
        if (msg.status === 'sent') return <CheckIcon className={`w-5 h-5 ${color}`} />;
        return <DoubleCheckIcon className={`w-5 h-5 ${color}`} />;
    };
    return (
        <div className={`flex flex-col ${alignment} mb-2`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-lg shadow ${bubbleColor}`}>
                <p className="text-sm text-gray-800">{msg.text}</p>
                <div className="flex items-center justify-end mt-1">
                    <span className="text-xs text-gray-500 mr-1">{formatTimestamp(msg.timestamp)}</span>
                    <StatusIndicator />
                </div>
            </div>
        </div>
    );
};

const ChatInterface = ({ selectedConversation, messages, newMessage, setNewMessage, handleSendMessage, isSending, messagesEndRef, onBack }) => (
    <div className="flex flex-col h-full w-full bg-cover bg-center" style={{backgroundImage: "url('https://i.redd.it/qwd83nc4xxf41.jpg')"}}>
        <header className="flex items-center p-3 bg-gray-100 border-b border-gray-300">
            <button onClick={onBack} className="lg:hidden mr-2 p-2 rounded-full hover:bg-gray-200">
                <ArrowLeftIcon />
            </button>
            <img className="w-10 h-10 rounded-full mr-3" src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${selectedConversation.name.charAt(0)}`} alt="avatar" />
            <div>
                <h2 className="text-md font-semibold text-gray-800">{selectedConversation.name}</h2>
                <p className="text-xs text-gray-500">{selectedConversation.id}</p>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto w-full">
                {messages.map((msg) => <MessageBubble key={msg.id || msg._id} msg={msg} />)}
                <div ref={messagesEndRef} />
            </div>
        </main>
        <footer className="p-3 bg-gray-100">
            <form onSubmit={handleSendMessage} className="flex items-center max-w-4xl mx-auto">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="flex-1 px-4 py-2 mr-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" disabled={isSending}/>
                <button type="submit" className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-gray-400" disabled={isSending || !newMessage.trim()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
            </form>
        </footer>
    </div>
);

const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 text-center p-8 border-l border-gray-300 hidden lg:flex">
        <div className="max-w-lg">
            <img src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png" alt="WhatsApp Web" className="w-64 h-64 mx-auto" />
            <h1 className="text-4xl text-gray-600 font-light mt-6">WhatsApp Web Clone</h1>
            <p className="text-gray-500 mt-4 text-base">
                Send and receive messages without keeping your phone online.<br/>
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
            <hr className="w-full max-w-sm my-8 mx-auto border-gray-200" />
            <div className="text-sm text-gray-400 flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6.364-8.364l-1.414-1.414M20.364 6.636l-1.414 1.414M18 12h2M4 12H2m14.364 8.364l-1.414-1.414M5.636 5.636L4.222 4.222m11.314 0l-1.414 1.414"></path></svg>
                This is a demo project. Messages are not end-to-end encrypted.
            </div>
        </div>
    </div>
);

function App() {
    const [conversations, setConversations] = useState([]);
    const [allMessages, setAllMessages] = useState({});
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [showUploader, setShowUploader] = useState(false);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const fetchData = async () => {
        try {
            // Use relative path for local development, which the proxy will handle
            const response = await fetch('/api/messages');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.success) {
                setConversations(data.conversations);
                setAllMessages(data.allMessages);
            } else {
                throw new Error(data.message || 'Failed to fetch data');
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Could not connect to the backend server. Is it running?");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedConversation && allMessages[selectedConversation.id]) {
            setMessages(allMessages[selectedConversation.id].messages);
        } else {
            setMessages([]);
        }
    }, [selectedConversation, allMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSelectConversation = (convo) => {
        setSelectedConversation(convo);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;
        setIsSending(true);
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wa_id: selectedConversation.id, text: newMessage, name: selectedConversation.name }),
            });
            if (!response.ok) throw new Error('Failed to send message');
            setNewMessage('');
            await fetchData();
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Could not send message.");
        } finally {
            setIsSending(false);
        }
    };
    
    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;
        alert(`Processing ${files.length} file(s)...`);
        try {
            for (const file of files) {
                const text = await file.text();
                const payload = JSON.parse(text);
                await fetch('/api/webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ metaData: payload.metaData }),
                });
            }
            alert('Data processed successfully!');
            await fetchData();
        } catch (err) {
            console.error("Error processing files:", err);
            alert("An error occurred during processing.");
        } finally {
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };
    
    const handleBackToConversations = () => {
        setSelectedConversation(null);
    };

    if (error) {
        return <div className="flex items-center justify-center h-screen bg-red-100 text-red-700 p-4 text-center">{error}</div>;
    }

    return (
        <div className="font-sans antialiased h-screen w-screen overflow-hidden bg-gray-200">
            <div className="flex h-full">
                {/* Conversation List Pane */}
                <div className={`w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-300 flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
                    <header className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-300">
                        <h1 className="text-xl font-semibold">Chats</h1>
                        <button onClick={() => setShowUploader(!showUploader)} className="p-2 rounded-full hover:bg-gray-200" title="Upload Payload Data">
                            <UploadIcon />
                        </button>
                    </header>
                    {showUploader && (
                        <div className="p-4 bg-yellow-100 border-b border-yellow-300">
                            <h3 className="font-semibold text-yellow-800">Payload Processor</h3>
                            <p className="text-sm text-yellow-700 mt-1">Select JSON files to send to the backend webhook.</p>
                            <input ref={fileInputRef} type="file" multiple accept=".json" onChange={handleFileUpload} className="mt-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? <div className="p-4 text-center text-gray-500">Loading chats...</div> :
                            conversations.map(convo => (
                                <div key={convo.id} className="flex items-center p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSelectConversation(convo)}>
                                    <img className="w-12 h-12 rounded-full mr-4" src={`https://placehold.co/48x48/E2E8F0/4A5568?text=${convo.name.charAt(0)}`} alt="avatar" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="text-md font-semibold text-gray-800 truncate">{convo.name}</p>
                                            <p className="text-xs text-gray-500">{formatTimestamp(convo.timestamp)}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Chat Window Pane */}
                <div className={`flex-1 ${selectedConversation ? 'flex' : 'hidden lg:flex'}`}>
                    {selectedConversation ? 
                        <ChatInterface 
                            selectedConversation={selectedConversation} 
                            messages={messages} 
                            newMessage={newMessage} 
                            setNewMessage={setNewMessage} 
                            handleSendMessage={handleSendMessage} 
                            isSending={isSending} 
                            messagesEndRef={messagesEndRef}
                            onBack={handleBackToConversations}
                        /> 
                        : <WelcomeScreen />
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
