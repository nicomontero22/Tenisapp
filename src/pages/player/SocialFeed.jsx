import React, { useState } from 'react';
import './SocialFeed.css';

const SocialFeed = ({ currentUser }) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPostType, setNewPostType] = useState('result'); // 'result', 'text', 'photo'
    const [newPostData, setNewPostData] = useState({
        text: '', opponent: '', score1: '', score2: '', score3: '', score4: '',
        won: true, surface: 'clay', clubName: '', photoUrl: '',
    });
    const [posts, setPosts] = useState([
        {
            id: 1,
            type: 'result',
            author: { name: 'Carlos Martínez', avatar: 'https://i.pravatar.cc/150?img=11', level: 'advanced' },
            content: { opponent: 'Roberto Sánchez', score: '6-3, 7-5', won: true, surface: 'Polvo de ladrillo', clubName: 'Club River Plate' },
            text: '¡Gran partido hoy! Costó pero se ganó 💪',
            likes: 12, liked: false,
            comments: [
                { id: 1, author: { name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=5' }, text: '¡Felicitaciones Carlitos! 🎾', time: 'Hace 1h' },
                { id: 2, author: { name: 'Diego Pérez', avatar: 'https://i.pravatar.cc/150?img=15' }, text: 'Bien ahí crack!', time: 'Hace 45min' },
            ],
            time: 'Hace 2 horas',
            showComments: false,
        },
        {
            id: 2,
            type: 'text',
            author: { name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=5', level: 'intermediate' },
            text: '¿Alguien para un dobles mañana a las 18hs en Lawn Tennis? Somos 3, falta 1! 🙋‍♀️',
            likes: 8, liked: true,
            comments: [
                { id: 1, author: { name: 'Fernando Ruiz', avatar: 'https://i.pravatar.cc/150?img=53' }, text: 'Yo me sumo! Te mando mensaje', time: 'Hace 30min' },
            ],
            time: 'Hace 3 horas',
            showComments: false,
        },
        {
            id: 3,
            type: 'result',
            author: { name: 'Lucía Fernández', avatar: 'https://i.pravatar.cc/150?img=9', level: 'advanced' },
            content: { opponent: 'Camila Herrera', score: '4-6, 6-4, 7-6', won: true, surface: 'Cemento', clubName: 'Buenos Aires Tenis' },
            text: 'Partidazo épico! 3 sets, tiebreak en el tercero. Casi no la cuento 😅',
            likes: 24, liked: false,
            comments: [
                { id: 1, author: { name: 'Camila Herrera', avatar: 'https://i.pravatar.cc/150?img=23' }, text: 'Revancha la semana que viene! Jugaste increíble', time: 'Hace 2h' },
                { id: 2, author: { name: 'Carlos Martínez', avatar: 'https://i.pravatar.cc/150?img=11' }, text: '3 sets en cemento es durísimo, bien ahí!', time: 'Hace 1h' },
                { id: 3, author: { name: 'Martín González', avatar: 'https://i.pravatar.cc/150?img=33' }, text: '🔥🔥🔥', time: 'Hace 50min' },
            ],
            time: 'Hace 5 horas',
            showComments: false,
        },
        {
            id: 4,
            type: 'photo',
            author: { name: 'Diego Pérez', avatar: 'https://i.pravatar.cc/150?img=15', level: 'beginner' },
            text: 'Primer torneo! No gané pero la pasé genial. Gracias a todos por el aguante 🏆',
            photoUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=400&fit=crop',
            likes: 18, liked: false,
            comments: [],
            time: 'Hace 8 horas',
            showComments: false,
        },
        {
            id: 5,
            type: 'result',
            author: { name: 'Roberto Sánchez', avatar: 'https://i.pravatar.cc/150?img=12', level: 'professional' },
            content: { opponent: 'Nicolás Aguirre', score: '6-2, 6-1', won: true, surface: 'Césped', clubName: 'Club Hindú' },
            text: 'Buen entrenamiento con Nico. Césped en perfecto estado 🌱',
            likes: 15, liked: false,
            comments: [],
            time: 'Hace 1 día',
            showComments: false,
        },
    ]);

    const [commentTexts, setCommentTexts] = useState({});

    const handleLike = (postId) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
            }
            return p;
        }));
    };

    const toggleComments = (postId) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return { ...p, showComments: !p.showComments };
            }
            return p;
        }));
    };

    const handleComment = (postId) => {
        const text = commentTexts[postId];
        if (!text?.trim()) return;

        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    showComments: true,
                    comments: [...p.comments, {
                        id: Date.now(),
                        author: { name: currentUser?.name || 'Vos', avatar: currentUser?.avatar || '' },
                        text: text.trim(),
                        time: 'Ahora',
                    }]
                };
            }
            return p;
        }));
        setCommentTexts({ ...commentTexts, [postId]: '' });
    };

    const handlePublishPost = () => {
        const newPost = {
            id: Date.now(),
            type: newPostType,
            author: {
                name: currentUser?.name || 'Vos',
                avatar: currentUser?.avatar || '',
                level: currentUser?.profile?.skillLevel || 'intermediate',
            },
            text: newPostData.text,
            likes: 0, liked: false,
            comments: [],
            time: 'Ahora',
            showComments: false,
        };

        if (newPostType === 'result') {
            newPost.content = {
                opponent: newPostData.opponent,
                score: [newPostData.score1, newPostData.score2, newPostData.score3, newPostData.score4].filter(Boolean).join(', '),
                won: newPostData.won,
                surface: newPostData.surface,
                clubName: newPostData.clubName,
            };
        }

        if (newPostType === 'photo' && newPostData.photoUrl) {
            newPost.photoUrl = newPostData.photoUrl;
        }

        setPosts([newPost, ...posts]);
        setShowNewPost(false);
        setNewPostData({ text: '', opponent: '', score1: '', score2: '', score3: '', score4: '', won: true, surface: 'clay', clubName: '', photoUrl: '' });
    };

    const getLevelBadge = (level) => {
        const map = {
            beginner: { emoji: '🌱', color: '#D1FAE5' },
            intermediate: { emoji: '📈', color: '#FEF3C7' },
            advanced: { emoji: '⭐', color: '#DBEAFE' },
            professional: { emoji: '🏆', color: '#EDE9FE' },
        };
        return map[level] || map.intermediate;
    };

    return (
        <div className="social-feed">
            {/* New Post Button */}
            <button className="new-post-btn" onClick={() => setShowNewPost(true)}>
                <span className="new-post-avatar">
                    {currentUser?.avatar ? (
                        <img src={currentUser.avatar} alt="" />
                    ) : (
                        <span>{(currentUser?.name || 'U').charAt(0)}</span>
                    )}
                </span>
                <span className="new-post-placeholder">¿Cómo te fue hoy? Publicá tu resultado...</span>
                <span className="new-post-icon">📝</span>
            </button>

            {/* Posts */}
            {posts.map(post => {
                const levelBadge = getLevelBadge(post.author.level);
                return (
                    <div key={post.id} className="feed-post">
                        {/* Post Header */}
                        <div className="post-header">
                            <img src={post.author.avatar} alt="" className="post-avatar" />
                            <div className="post-author-info">
                                <div className="post-author-row">
                                    <strong>{post.author.name}</strong>
                                    <span className="post-level-badge" style={{ background: levelBadge.color }}>{levelBadge.emoji}</span>
                                </div>
                                <span className="post-time">{post.time}</span>
                            </div>
                        </div>

                        {/* Match Result Card */}
                        {post.type === 'result' && post.content && (
                            <div className={`result-card ${post.content.won ? 'won' : 'lost'}`}>
                                <div className="result-badge">{post.content.won ? '🏆 Victoria' : '😤 Derrota'}</div>
                                <div className="result-details">
                                    <span className="result-vs">vs {post.content.opponent}</span>
                                    <span className="result-score">{post.content.score}</span>
                                </div>
                                <div className="result-meta">
                                    <span>📍 {post.content.clubName}</span>
                                    <span>🏟️ {post.content.surface}</span>
                                </div>
                            </div>
                        )}

                        {/* Photo */}
                        {post.type === 'photo' && post.photoUrl && (
                            <div className="post-photo">
                                <img src={post.photoUrl} alt="Publicación" />
                            </div>
                        )}

                        {/* Text */}
                        {post.text && <p className="post-text">{post.text}</p>}

                        {/* Actions */}
                        <div className="post-actions">
                            <button className={`post-action-btn ${post.liked ? 'liked' : ''}`} onClick={() => handleLike(post.id)}>
                                {post.liked ? '❤️' : '🤍'} {post.likes}
                            </button>
                            <button className="post-action-btn" onClick={() => toggleComments(post.id)}>
                                💬 {post.comments.length}
                            </button>
                            <button className="post-action-btn">
                                🔗 Compartir
                            </button>
                        </div>

                        {/* Comments */}
                        {post.showComments && (
                            <div className="post-comments">
                                {post.comments.map(comment => (
                                    <div key={comment.id} className="comment-item">
                                        <img src={comment.author.avatar} alt="" className="comment-avatar" />
                                        <div className="comment-content">
                                            <div className="comment-bubble">
                                                <strong>{comment.author.name}</strong>
                                                <p>{comment.text}</p>
                                            </div>
                                            <span className="comment-time">{comment.time}</span>
                                        </div>
                                    </div>
                                ))}

                                {/* Add comment */}
                                <div className="add-comment">
                                    <input
                                        type="text"
                                        placeholder="Escribí un comentario..."
                                        value={commentTexts[post.id] || ''}
                                        onChange={e => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                                        onKeyDown={e => { if (e.key === 'Enter') handleComment(post.id); }}
                                        className="comment-input"
                                    />
                                    <button
                                        className="comment-send"
                                        onClick={() => handleComment(post.id)}
                                        disabled={!(commentTexts[post.id] || '').trim()}
                                    >
                                        ➤
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* New Post Modal */}
            {showNewPost && (
                <div className="new-post-overlay" onClick={() => setShowNewPost(false)}>
                    <div className="new-post-modal" onClick={e => e.stopPropagation()}>
                        <div className="new-post-modal-header">
                            <h3>Nueva Publicación</h3>
                            <button className="modal-close-x" onClick={() => setShowNewPost(false)}>✕</button>
                        </div>

                        {/* Post type selector */}
                        <div className="post-type-selector">
                            {[
                                { key: 'result', label: '🎾 Resultado', desc: 'Publicá cómo te fue' },
                                { key: 'text', label: '💬 Texto', desc: 'Escribí algo' },
                                { key: 'photo', label: '📷 Foto', desc: 'Compartí una imagen' },
                            ].map(t => (
                                <button
                                    key={t.key}
                                    className={`post-type-btn ${newPostType === t.key ? 'active' : ''}`}
                                    onClick={() => setNewPostType(t.key)}
                                >
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="new-post-modal-body">
                            {/* Result fields */}
                            {newPostType === 'result' && (
                                <div className="result-form">
                                    <div className="result-form-row">
                                        <label>Rival</label>
                                        <input
                                            type="text" placeholder="Nombre del rival"
                                            value={newPostData.opponent}
                                            onChange={e => setNewPostData({ ...newPostData, opponent: e.target.value })}
                                            className="form-input-feed"
                                        />
                                    </div>

                                    <div className="result-form-row">
                                        <label>Resultado</label>
                                        <div className="score-inputs">
                                            <input type="text" placeholder="Set 1" value={newPostData.score1} onChange={e => setNewPostData({ ...newPostData, score1: e.target.value })} className="score-input" />
                                            <input type="text" placeholder="Set 2" value={newPostData.score2} onChange={e => setNewPostData({ ...newPostData, score2: e.target.value })} className="score-input" />
                                            <input type="text" placeholder="Set 3" value={newPostData.score3} onChange={e => setNewPostData({ ...newPostData, score3: e.target.value })} className="score-input" />
                                        </div>
                                    </div>

                                    <div className="result-form-row">
                                        <label>¿Ganaste?</label>
                                        <div className="win-toggle">
                                            <button className={`win-btn ${newPostData.won ? 'active' : ''}`} onClick={() => setNewPostData({ ...newPostData, won: true })}>🏆 Sí</button>
                                            <button className={`win-btn loss ${!newPostData.won ? 'active' : ''}`} onClick={() => setNewPostData({ ...newPostData, won: false })}>😤 No</button>
                                        </div>
                                    </div>

                                    <div className="result-form-row">
                                        <label>Club</label>
                                        <input type="text" placeholder="¿Dónde jugaron?" value={newPostData.clubName} onChange={e => setNewPostData({ ...newPostData, clubName: e.target.value })} className="form-input-feed" />
                                    </div>
                                </div>
                            )}

                            {/* Photo URL */}
                            {newPostType === 'photo' && (
                                <div className="result-form-row">
                                    <label>URL de la foto</label>
                                    <input type="text" placeholder="https://..." value={newPostData.photoUrl} onChange={e => setNewPostData({ ...newPostData, photoUrl: e.target.value })} className="form-input-feed" />
                                    {newPostData.photoUrl && (
                                        <img src={newPostData.photoUrl} alt="Preview" className="photo-preview" />
                                    )}
                                </div>
                            )}

                            {/* Text (all types) */}
                            <textarea
                                className="new-post-textarea"
                                placeholder={newPostType === 'result' ? '¿Cómo estuvo el partido?' : newPostType === 'photo' ? 'Agregá una descripción...' : '¿Qué querés compartir?'}
                                value={newPostData.text}
                                onChange={e => setNewPostData({ ...newPostData, text: e.target.value })}
                                rows={3}
                                maxLength={500}
                            />
                        </div>

                        <div className="new-post-modal-footer">
                            <button className="btn-cancel-post" onClick={() => setShowNewPost(false)}>Cancelar</button>
                            <button
                                className="btn-publish-post"
                                onClick={handlePublishPost}
                                disabled={!newPostData.text.trim() && newPostType === 'text'}
                            >
                                📤 Publicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialFeed;