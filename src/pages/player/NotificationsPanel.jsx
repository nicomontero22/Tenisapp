import React, { useState } from 'react';
import './NotificationsPanel.css';

const NotificationsPanel = ({ isOpen, onClose, onNavigate }) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1, type: 'booking_confirmed', read: false, time: 'Hace 5 min',
            title: 'Reserva confirmada',
            message: 'Tu reserva en Club River Plate - Cancha 1 para el 12/02 a las 18:00 fue confirmada.',
            icon: '✅', color: '#00A86B', bg: '#E6F9F1',
            action: { tab: 'profile', section: 'bookings' },
        },
        {
            id: 2, type: 'new_message', read: false, time: 'Hace 15 min',
            title: 'Nuevo mensaje de Carlos Martínez',
            message: '¿Jugamos el viernes?',
            icon: '💬', color: '#3B82F6', bg: '#DBEAFE',
            action: { tab: 'bookings' }, // bookings tab = messages
            avatar: 'https://i.pravatar.cc/150?img=11',
        },
        {
            id: 3, type: 'challenge', read: false, time: 'Hace 30 min',
            title: '¡Roberto Sánchez te desafió!',
            message: 'Quiere jugar un partido de singles esta semana. ¿Aceptás?',
            icon: '⚔️', color: '#EF4444', bg: '#FEE2E2',
            action: { tab: 'search' },
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        {
            id: 4, type: 'reminder', read: false, time: 'Hace 1h',
            title: '⏰ Recordatorio: partido en 1 hora',
            message: 'Tu reserva en Club Hindú - Cancha 3 es a las 10:00. ¡No te olvides!',
            icon: '⏰', color: '#F59E0B', bg: '#FEF3C7',
            action: { tab: 'profile', section: 'bookings' },
        },
        {
            id: 5, type: 'result_posted', read: true, time: 'Hace 3h',
            title: 'Ana López publicó un resultado',
            message: 'Ganó 6-3, 6-4 contra Martín González. Mirá el post.',
            icon: '🎾', color: '#8B5CF6', bg: '#EDE9FE',
            action: { tab: 'profile', section: 'feed' },
            avatar: 'https://i.pravatar.cc/150?img=5',
        },
        {
            id: 6, type: 'like', read: true, time: 'Hace 4h',
            title: 'A Lucía Fernández le gustó tu publicación',
            message: 'Tu post sobre el partido contra Carlos tiene 12 likes.',
            icon: '❤️', color: '#EF4444', bg: '#FEE2E2',
            action: { tab: 'profile', section: 'feed' },
            avatar: 'https://i.pravatar.cc/150?img=9',
        },
        {
            id: 7, type: 'comment', read: true, time: 'Hace 5h',
            title: 'Diego Pérez comentó en tu publicación',
            message: '"Bien ahí crack!" en tu resultado vs Roberto.',
            icon: '💬', color: '#3B82F6', bg: '#DBEAFE',
            action: { tab: 'profile', section: 'feed' },
            avatar: 'https://i.pravatar.cc/150?img=15',
        },
        {
            id: 8, type: 'booking_cancelled', read: true, time: 'Hace 1 día',
            title: 'Reserva cancelada',
            message: 'Tu reserva en Club Náutico Hacoaj del 28/01 fue cancelada. Seña devuelta.',
            icon: '❌', color: '#EF4444', bg: '#FEE2E2',
            action: { tab: 'profile', section: 'bookings' },
        },
        {
            id: 9, type: 'reminder', read: true, time: 'Hace 2 días',
            title: '⏰ Recordatorio: partido mañana',
            message: 'Mañana tenés reserva en Lawn Tennis a las 16:00. ¡Preparate!',
            icon: '⏰', color: '#F59E0B', bg: '#FEF3C7',
            action: { tab: 'profile', section: 'bookings' },
        },
        {
            id: 10, type: 'challenge', read: true, time: 'Hace 3 días',
            title: '¡Camila Herrera te desafió!',
            message: 'Quiere jugar un partido de dobles mixto el fin de semana.',
            icon: '⚔️', color: '#EF4444', bg: '#FEE2E2',
            action: { tab: 'search' },
            avatar: 'https://i.pravatar.cc/150?img=23',
        },
    ]);

    const [filter, setFilter] = useState('all');

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = filter === 'all'
        ? notifications
        : filter === 'unread'
            ? notifications.filter(n => !n.read)
            : notifications.filter(n => n.type === filter);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleNotificationClick = (notif) => {
        markAsRead(notif.id);
        if (notif.action && onNavigate) {
            onNavigate(notif.action);
        }
        onClose();
    };

    const clearAll = () => {
        setNotifications([]);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="notif-backdrop" onClick={onClose} />
            <div className="notifications-panel">
                {/* Header */}
                <div className="notif-header">
                    <div className="notif-header-left">
                        <h3>Notificaciones</h3>
                        {unreadCount > 0 && <span className="notif-unread-badge">{unreadCount}</span>}
                    </div>
                    <div className="notif-header-actions">
                        {unreadCount > 0 && (
                            <button className="notif-action-btn" onClick={markAllRead}>
                                Marcar todo leído
                            </button>
                        )}
                        <button className="notif-close" onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* Quick Filters */}
                <div className="notif-filters">
                    {[
                        { key: 'all', label: 'Todas' },
                        { key: 'unread', label: `Sin leer (${unreadCount})` },
                        { key: 'booking_confirmed', label: '📅 Reservas' },
                        { key: 'new_message', label: '💬 Mensajes' },
                        { key: 'challenge', label: '⚔️ Desafíos' },
                    ].map(f => (
                        <button
                            key={f.key}
                            className={`notif-filter ${filter === f.key ? 'active' : ''}`}
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="notif-list">
                    {filteredNotifications.length === 0 ? (
                        <div className="notif-empty">
                            <span>🔔</span>
                            <p>No hay notificaciones</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notif => (
                            <button
                                key={notif.id}
                                className={`notif-item ${!notif.read ? 'unread' : ''}`}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <div className="notif-icon-wrapper" style={{ background: notif.bg }}>
                                    {notif.avatar ? (
                                        <img src={notif.avatar} alt="" className="notif-avatar" />
                                    ) : (
                                        <span className="notif-icon">{notif.icon}</span>
                                    )}
                                </div>
                                <div className="notif-content">
                                    <strong className="notif-title">{notif.title}</strong>
                                    <p className="notif-message">{notif.message}</p>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                                {!notif.read && <span className="notif-dot" />}
                                <svg className="notif-arrow" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M6 3l5 5-5 5" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className="notif-footer">
                        <button className="notif-clear-btn" onClick={clearAll}>
                            🗑️ Borrar todas
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

// Bell icon component to use in Header
export const NotificationBell = ({ count, onClick }) => {
    return (
        <button className="notification-bell" onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {count > 0 && (
                <span className="bell-badge">{count > 9 ? '9+' : count}</span>
            )}
        </button>
    );
};

export default NotificationsPanel;