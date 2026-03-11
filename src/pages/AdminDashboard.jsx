import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, getCountFromServer } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Plus, Trash2, Home, BarChart2, Music, Loader2, Image as ImageIcon, FileAudio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('content'); // 'content' or 'analytics'
    const [activeCollection, setActiveCollection] = useState('meditations'); // 'meditations' or 'sacred_sounds'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ users: 0, meditations: 0, sounds: 0 });

    // Form state
    const [showForm, setShowForm] = useState(false);
    const [formSaving, setFormSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        time: '',
        colorClass: 'bg-divine-blue',
        categories: ''
    });
    const audioInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Fetch data whenever collection changes
    useEffect(() => {
        fetchData();
        if (activeTab === 'analytics') {
            fetchAnalytics();
        }
    }, [activeCollection, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, activeCollection));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const usersSnap = await getDocs(collection(db, 'users'));
            const medSnap = await getDocs(collection(db, 'meditations'));
            const soundSnap = await getDocs(collection(db, 'sacred_sounds'));

            setStats({
                users: usersSnap.size,
                meditations: medSnap.size,
                sounds: soundSnap.size
            });
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        
        try {
            await deleteDoc(doc(db, activeCollection, id));
            fetchData();
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Failed to delete.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormSaving(true);
        
        try {
            let audioUrl = '';
            let imageUrl = '';

            // Upload Audio
            if (audioFile) {
                const audioRef = ref(storage, `content/${activeCollection}/audio/${Date.now()}_${audioFile.name}`);
                await uploadBytes(audioRef, audioFile);
                audioUrl = await getDownloadURL(audioRef);
            }

            // Upload Image
            if (imageFile) {
                const imageRef = ref(storage, `content/${activeCollection}/images/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            // Save to Firestore
            const newData = {
                title: formData.title,
                subtitle: formData.subtitle,
                time: formData.time,
                colorClass: formData.colorClass,
                categories: formData.categories.split(',').map(c => c.trim()),
                audioUrl: audioUrl || '',
                imageUrl: imageUrl || '',
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, activeCollection), newData);
            
            // Re-fetch and clear
            fetchData();
            setShowForm(false);
            setFormData({ title: '', subtitle: '', time: '', colorClass: 'bg-divine-blue', categories: '' });
            setAudioFile(null);
            setImageFile(null);
            if (audioInputRef.current) audioInputRef.current.value = '';
            if (imageInputRef.current) imageInputRef.current.value = '';

        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save content. Check permissions and storage setup.");
        } finally {
            setFormSaving(false);
        }
    };

    // Very basic styling approach customized for the admin
    const adminStyles = {
        container: { display: 'flex', height: '100vh', backgroundColor: '#1e1e2d', color: '#fff', fontFamily: 'Inter, sans-serif' },
        sidebar: { width: '250px', backgroundColor: '#151521', padding: '20px', display: 'flex', flexDirection: 'column' },
        sidebarItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', transition: 'background 0.2s' },
        activeItem: { backgroundColor: '#4f46e5' },
        main: { flex: 1, padding: '40px', overflowY: 'auto' },
        card: { backgroundColor: '#2b2b40', padding: '20px', borderRadius: '12px', marginBottom: '20px' },
        input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #3f3f5a', backgroundColor: '#1e1e2d', color: '#fff', marginBottom: '15px' },
        btn: { padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#4f46e5', color: '#fff', cursor: 'pointer', fontWeight: 'bold' },
        table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
        th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #3f3f5a', color: '#a1a1aa' },
        td: { padding: '12px', borderBottom: '1px solid #3f3f5a' }
    };

    return (
        <div style={adminStyles.container}>
            {/* Sidebar */}
            <div style={adminStyles.sidebar}>
                <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', backgroundColor: '#fbbf24', borderRadius: '50%' }}></div>
                    Ritam Admin
                </h2>

                <div 
                    style={{ ...adminStyles.sidebarItem, ...(activeTab === 'analytics' ? adminStyles.activeItem : {}) }}
                    onClick={() => setActiveTab('analytics')}
                >
                    <BarChart2 size={20} /> Analytics
                </div>
                <div 
                    style={{ ...adminStyles.sidebarItem, ...(activeTab === 'content' ? adminStyles.activeItem : {}) }}
                    onClick={() => setActiveTab('content')}
                >
                    <Music size={20} /> Content Manager
                </div>
                <div style={{ flex: 1 }}></div>
                <div 
                    style={adminStyles.sidebarItem}
                    onClick={() => navigate('/home')}
                >
                    <Home size={20} /> Back to App
                </div>
            </div>

            {/* Main Content */}
            <div style={adminStyles.main}>
                {activeTab === 'analytics' && (
                    <div>
                        <h1>Platform Overview</h1>
                        <p style={{ color: '#a1a1aa', marginBottom: '30px' }}>High level stats summarizing user engagement and content library.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            <div style={adminStyles.card}>
                                <h3 style={{ margin: 0, color: '#a1a1aa' }}>Total Users</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginTop: '10px' }}>{stats.users}</div>
                            </div>
                            <div style={adminStyles.card}>
                                <h3 style={{ margin: 0, color: '#a1a1aa' }}>Meditations</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginTop: '10px', color: '#8b5cf6' }}>{stats.meditations}</div>
                            </div>
                            <div style={adminStyles.card}>
                                <h3 style={{ margin: 0, color: '#a1a1aa' }}>Sacred Sounds</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginTop: '10px', color: '#ec4899' }}>{stats.sounds}</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h1>Content Manager</h1>
                            <button style={adminStyles.btn} onClick={() => setShowForm(!showForm)}>
                                <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
                                {showForm ? 'Cancel' : 'Add New Audio'}
                            </button>
                        </div>

                        {/* Collection Toggles */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <button 
                                style={{ ...adminStyles.btn, backgroundColor: activeCollection === 'meditations' ? '#4f46e5' : '#3f3f5a' }}
                                onClick={() => setActiveCollection('meditations')}
                            >
                                Meditations
                            </button>
                            <button 
                                style={{ ...adminStyles.btn, backgroundColor: activeCollection === 'sacred_sounds' ? '#4f46e5' : '#3f3f5a' }}
                                onClick={() => setActiveCollection('sacred_sounds')}
                            >
                                Sacred Sounds
                            </button>
                        </div>

                        {showForm && (
                            <div style={adminStyles.card}>
                                <h2>Add New {activeCollection === 'meditations' ? 'Meditation' : 'Sacred Sound'}</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label>Title</label>
                                            <input style={adminStyles.input} placeholder="e.g. Deep Sleep Journey" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                        </div>
                                        <div>
                                            <label>Subtitle / Instructor</label>
                                            <input style={adminStyles.input} placeholder="e.g. Guided by Sarah" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                                        </div>
                                        <div>
                                            <label>Duration</label>
                                            <input style={adminStyles.input} placeholder="e.g. 15 Mins" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                                        </div>
                                        <div>
                                            <label>Categories (comma separated)</label>
                                            <input style={adminStyles.input} placeholder="e.g. Sleep, Popular" value={formData.categories} onChange={e => setFormData({...formData, categories: e.target.value})} />
                                        </div>
                                        <div>
                                            <label><FileAudio size={16} style={{verticalAlign: 'bottom'}} /> Audio File (Optional to upload securely)</label>
                                            <input type="file" accept="audio/*" style={adminStyles.input} ref={audioInputRef} onChange={e => setAudioFile(e.target.files[0])} />
                                        </div>
                                        <div>
                                            <label><ImageIcon size={16} style={{verticalAlign: 'bottom'}} /> Cover Image (Optional)</label>
                                            <input type="file" accept="image/*" style={adminStyles.input} ref={imageInputRef} onChange={e => setImageFile(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <button type="submit" style={{ ...adminStyles.btn, marginTop: '10px', width: '100%', padding: '15px' }} disabled={formSaving}>
                                        {formSaving ? <Loader2 className="animate-spin" size={20} /> : 'Save Content to Database'}
                                    </button>
                                </form>
                            </div>
                        )}

                        <div style={adminStyles.card}>
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '40px' }}><Loader2 className="animate-spin" size={32} /></div>
                            ) : (
                                <table style={adminStyles.table}>
                                    <thead>
                                        <tr>
                                            <th style={adminStyles.th}>Title</th>
                                            <th style={adminStyles.th}>Duration</th>
                                            <th style={adminStyles.th}>Categories</th>
                                            <th style={adminStyles.th}>Media</th>
                                            <th style={adminStyles.th}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.length === 0 ? (
                                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No records found in this collection.</td></tr>
                                        ) : items.map(item => (
                                            <tr key={item.id}>
                                                <td style={adminStyles.td}>
                                                    <strong>{item.title}</strong><br/>
                                                    <span style={{color: '#a1a1aa', fontSize: '0.85rem'}}>{item.subtitle}</span>
                                                </td>
                                                <td style={adminStyles.td}>{item.time}</td>
                                                <td style={adminStyles.td}>
                                                    {Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}
                                                </td>
                                                <td style={adminStyles.td}>
                                                    <div style={{display: 'flex', gap: '5px'}}>
                                                        {item.audioUrl && <span style={{backgroundColor: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem'}}>Audio</span>}
                                                    </div>
                                                </td>
                                                <td style={adminStyles.td}>
                                                    <button onClick={() => handleDelete(item.id)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
