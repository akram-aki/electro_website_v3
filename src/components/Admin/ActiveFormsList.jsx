import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ActiveFormsList = ({ onViewSubmissions }) => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchForms = async () => {
        // Get stored token
        const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
        const token = tokenData.token; 
        
        if (!token) {
             setError('Admin token missing. Please re-login.');
             setLoading(false);
             return;
        }

        try {
            const response = await fetch('/api/forms?admin=true', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to fetch forms');
            setForms(data.data);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
        const token = tokenData.token;
        if (!token) {
            alert('Admin token missing. Please re-login.');
            return;
        }

        try {
            const response = await fetch(`/api/forms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ is_active: !currentStatus })
            });
            
            if (response.ok) {
                setForms(forms.map(f => f.id === id ? { ...f, is_active: !currentStatus } : f));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update status');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    const deleteForm = async (id) => {
        if (!confirm("Are you sure you want to delete this form?")) return;
        
        const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
        const token = tokenData.token;
        if (!token) {
            alert('Admin token missing. Please re-login.');
            return;
        }

        try {
            const response = await fetch(`/api/forms/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                setForms(forms.filter(f => f.id !== id));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete form');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete form');
        }
    };

    const copyLink = (id) => {
        const url = `${window.location.origin}/forms/${id}`;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    if (loading) return <p>Loading forms...</p>;

    return (
        <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#70a939]">Active Forms</h2>
                <button onClick={fetchForms} className="text-sm text-gray-600 hover:text-gray-900">Refresh</button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            {forms.length === 0 ? (
                <p className="text-gray-500 italic">No forms created yet.</p>
            ) : (
                <div className="space-y-4">
                    {forms.map(form => (
                        <div key={form.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{form.title}</h3>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${form.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                        {form.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">{form.description || 'No description'}</p>
                                <p className="text-xs text-gray-400 mt-1">Created: {new Date(form.created_at).toLocaleDateString()}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={() => copyLink(form.id)}
                                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                                >
                                    Copy Link
                                </button>
                                <button 
                                    onClick={() => onViewSubmissions(form)}
                                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1 rounded text-sm font-medium"
                                >
                                    Submissions
                                </button>
                                <button 
                                    onClick={() => toggleStatus(form.id, form.is_active)}
                                    className={`px-3 py-1 rounded text-sm font-medium ${form.is_active ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                                >
                                    {form.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button 
                                    onClick={() => deleteForm(form.id)}
                                    className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm font-medium"
                                >
                                    Delete
                                </button>
                                <Link 
                                    to={`/forms/${form.id}`} 
                                    target="_blank"
                                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveFormsList;


