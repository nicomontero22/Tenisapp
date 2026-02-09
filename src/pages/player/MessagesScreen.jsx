import React, { useState, useRef, useEffect } from 'react';
import './MessagesScreen.css';

const MessagesScreen = ({ currentUser }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const chatEndRef = useRef(null);

    const [conversations, setConversations] = useState([
        {
            id: 1,
            player: { name: 'Carlos Martínez', avatar: 'https://i.pravatar.cc/150?img=11', level: 'advanced', online: true },
            lastMessage: '¿Jugamos el viernes?',
            lastTime: 'Hace 5 min',
            unread: 2,
            messages: [
                { id: 1, from: 'them', text: '¡Hola! Vi que estás buscando rival', time: '14:30' },
                { id: 2, from: 'me', text: '¡Sí! ¿Tenés disponibilidad esta semana?', time: '14:32' },
                { id: 3, from: 'them', text: 'El viernes a la tarde me viene bien. ¿En River o en Hindú?', time: '14:35' },
                { id: 4, from: 'me', text: 'River me queda más cerca. ¿18hs?', time: '14:38' },
                { id: 5, from: 'them', text: '¿Jugamos el viernes?', time: '14:40' },
            ],
        },
        {
            id: 2,
            player: { name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=5', level: 'intermediate', online: true },
            lastMessage: '¡Dale, nos vemos!',
            lastTime: 'Hace 1h',
            unread: 0,
            messages: [
                { id: 1, from: 'them', text: '¡Hola! ¿Te sumás al dobles del sábado?', time: '12:00' },
                { id: 2, from: 'me', text: '¿Dónde y a qué hora?', time: '12:05' },
                { id: 3, from: 'them', text: 'Lawn Tennis, 10am. Somos 3 por ahora', time: '12:06' },
                { id: 4, from: 'me', text: '¡Cuenten conmigo! Ahí estaré', time: '12:10' },
                { id: 5, from: 'them', text: '¡Dale, nos vemos!', time: '12:12' },
            ],
        },
        {
            id: 3,
            player: { name: 'Roberto Sánchez', avatar: 'https://i.pravatar.cc/150?img=12', level: 'professional', online: false },
            lastMessage: 'Buen partido, la próxima la gano yo 😄',
            lastTime: 'Ayer',
            unread: 0,
            messages: [
                { id: 1, from: 'me', text: 'Buen partido hoy Roberto! Jugás muy bien', time: '19:00' },
                { id: 2, from: 'them', text: 'Gracias! Vos también. Ese revés que tiraste en el segundo set fue tremendo', time: '19:15' },
                { id: 3, from: 'me', text: 'Jaja fue suerte. Revancha?', time: '19:20' },
                { id: 4, from: 'them', text: 'Buen partido, la próxima la gano yo 😄', time: '19:22' },
            ],
        },
        {
            id: 4,
            player: { name: 'Lucía Fernández', avatar: 'https://i.pravatar.cc/150?img=9', level: 'advanced', online: false },
            lastMessage: '¡Gracias por la recomendación!',
            lastTime: 'Hace 3 días',
            unread: 0,
            messages: [
                { id: 1, from: 'them', text: 'Hola! Me recomendaron el Club Hindú para jugar. ¿Fuiste?', time: '10:00' },
                { id: 2, from: 'me', text: 'Sí, es excelente. Las canchas están impecables y el precio es razonable', time: '10:30' },
                { id: 3, from: 'them', text: '¡Gracias por la recomendación!', time: '10:32' },
            ],
        },
        {
            id: 5,
            player: { name: 'Fernando Ruiz', avatar: 'https://i.pravatar.cc/150?img=53', level: 'intermediate', online: true },
            lastMessage: 'Te mando la ubicación por WhatsApp',
            lastTime: 'Hace 5 días',
            unread: 1,
            messages: [
                { id: 1, from: 'me', text: '¿Dónde es el torneo del fin de semana?', time: '16:00' },
                { id: 2, from: 'them', text: 'En el club de Rosario, sobre Pellegrini', time: '16:20' },
                { id: 3, from: 'them', text: 'Te mando la ubicación por WhatsApp', time: '16:21' },
            ],
        },
    ]);

    const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat, conversations]);

    const handleSend = () => {
        if (!messageInput.trim() || !selectedChat) return;

        setConversations(conversations.map(c => {
            if (c.id === selectedChat.id) {
                const newMsg = {
                    id: Date.now(),
                    from: 'me',
                    text: messageInput.trim(),
                    time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
                };
                return {
                    ...c,
                    messages: [...c.messages, newMsg],
                    lastMessage: messageInput.trim(),
                    lastTime: 'Ahora',
                };
            }
            return c;
        }));

        // Simular respuesta
        setTimeout(() => {
            const autoReplies = [
                '¡Dale! 👍', 'Perfecto, nos vemos', '¿A qué hora te queda bien?',
                'Jaja genial 😄', 'Buenísimo!', '🎾💪', 'Contá conmigo',
            ];
            const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

            setConversations(prev => prev.map(c => {
                if (c.id === selectedChat.id) {
                    return {
                        ...c,
                        messages: [...c.messages, {
                            id: Date.now() + 1,
                            from: 'them',
                            text: reply,
                            time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
                        }],
                        lastMessage: reply,
                        lastTime: 'Ahora',
                    };
                }
                return c;
            }));
        }, 1500 + Math.random() * 2000);

        setMessageInput('');
    };

    const openChat = (conv) => {
        setSelectedChat(conv);
        // Marcar como leído
        setConversations(conversations.map(c =>
            c.id === conv.id ? { ...c, unread: 0 } : c
        ));
    };

    const getLevelEmoji = (level) => {
        const map = { beginner: '🌱', intermediate: '📈', advanced: '⭐', professional: '🏆' };
        return map[level] || '';
    };

    // ==================== CHAT VIEW ====================
    if (selectedChat) {
        const conv = conversations.find(c => c.id === selectedChat.id) || selectedChat;

        return (
            <div className="messages-screen chat-view">
                {/* Chat Header */}
                <div className="chat-header">
                    <button className="chat-back" onClick={() => setSelectedChat(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </button>
                    <img src={conv.player.avatar} alt="" className="chat-header-avatar" />
                    <div className="chat-header-info">
                        <strong>{conv.player.name} {getLevelEmoji(conv.player.level)}</strong>
                        <span className={conv.player.online ? 'online' : ''}>
                            {conv.player.online ? '● En línea' : 'Desconectado'}
                        </span>
                    </div>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    <div className="chat-date-divider">
                        <span>Hoy</span>
                    </div>

                    {conv.messages.map(msg => (
                        <div key={msg.id} className={`chat-bubble-row ${msg.from}`}>
                            <div className={`chat-bubble ${msg.from}`}>
                                <p>{msg.text}</p>
                                <span className="chat-bubble-time">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="chat-input-bar">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Escribí un mensaje..."
                        value={messageInput}
                        onChange={e => setMessageInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={handleSend}
                        disabled={!messageInput.trim()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    // ==================== INBOX VIEW ====================
    return (
        <div className="messages-screen">
            {/* Header */}
            <div className="inbox-header">
                <h2>💬 Mensajes</h2>
                {totalUnread > 0 && <span className="inbox-unread-total">{totalUnread} nuevos</span>}
            </div>

            {/* Conversation List */}
            <div className="conversation-list">
                {conversations.length === 0 ? (
                    <div className="no-messages">
                        <span className="no-messages-icon">💬</span>
                        <h3>Sin mensajes</h3>
                        <p>Buscá jugadores y enviales un mensaje para empezar a chatear</p>
                    </div>
                ) : (
                    conversations.map(conv => (
                        <button
                            key={conv.id}
                            className={`conversation-item ${conv.unread > 0 ? 'has-unread' : ''}`}
                            onClick={() => openChat(conv)}
                        >
                            <div className="conv-avatar-wrapper">
                                <img src={conv.player.avatar} alt="" className="conv-avatar" />
                                {conv.player.online && <span className="conv-online-dot" />}
                            </div>
                            <div className="conv-info">
                                <div className="conv-top">
                                    <strong>{conv.player.name} {getLevelEmoji(conv.player.level)}</strong>
                                    <span className="conv-time">{conv.lastTime}</span>
                                </div>
                                <div className="conv-bottom">
                                    <p className={conv.unread > 0 ? 'unread' : ''}>{conv.lastMessage}</p>
                                    {conv.unread > 0 && <span className="conv-unread-badge">{conv.unread}</span>}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessagesScreen;