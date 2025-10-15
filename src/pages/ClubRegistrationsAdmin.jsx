import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Index';

const ClubRegistrationsAdmin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [adminToken, setAdminToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchRegistrations = async () => {
        if (!adminToken.trim()) {
            setError('Please enter admin token');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/club-registrations-admin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch registrations');
            }

            setRegistrations(data.data);
            setAuthenticated(true);
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setError(error.message);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        fetchRegistrations();
    };

    const updateRegistrationStatus = async (id, status) => {
        setUpdatingStatus(id);
        setError('');

        try {
            const response = await fetch('/api/update-registration-status', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update status');
            }

            // Update the registration in the local state
            setRegistrations(prev => 
                prev.map(reg => 
                    reg.id === id 
                        ? { ...reg, status, updated_at: data.data.updated_at }
                        : reg
                )
            );

        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.message);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const deleteRegistration = async (id) => {
        if (!confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
            return;
        }

        setDeletingId(id);
        setError('');

        try {
            const response = await fetch('/api/delete-registration', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete registration');
            }

            // Remove the registration from the local state
            setRegistrations(prev => prev.filter(reg => reg.id !== id));

        } catch (error) {
            console.error('Error deleting registration:', error);
            setError(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-700 bg-green-100';
            case 'rejected': return 'text-red-700 bg-red-100';
            default: return 'text-yellow-700 bg-yellow-100';
        }
    };

    if (!authenticated) {
        return (
            <div className="flex flex-col mx-4 md:mx-20 my-10 justify-center">
                <Header hidden={true} className="mb-5" />
                <div className="flex justify-center pb-6 bg-gray-100 min-h-screen">
                    <div className="w-full max-w-md bg-white border border-[#70a939] p-6 md:p-8 rounded shadow-md">
                        <h1 className="text-center text-2xl md:text-3xl font-bold text-[#70a939] mb-6">
                            Club Registrations Admin
                        </h1>
                        
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Admin Token:</label>
                                <input
                                    type="password"
                                    value={adminToken}
                                    onChange={(e) => setAdminToken(e.target.value)}
                                    placeholder="Enter admin token"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full font-semibold py-2 px-4 rounded transition duration-300 ${
                                    loading 
                                        ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                                        : 'bg-[#70a939] hover:bg-green-600 text-white'
                                }`}
                            >
                                {loading ? 'Loading...' : 'Access Registrations'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-4 md:mx-20 my-10">
            <Header hidden={true} className="mb-5" />
            <div className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-[#70a939]">
                            Club Registrations ({registrations.length})
                        </h1>
                        <button
                            onClick={fetchRegistrations}
                            disabled={loading}
                            className="bg-[#70a939] hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
                        >
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="grid gap-6">
                        {registrations.map((registration) => (
                            <div key={registration.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {registration.name} {registration.family_name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(registration.status)}`}>
                                            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                        </span>
                                        <div className="flex gap-2">
                                            {registration.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                                                        disabled={updatingStatus === registration.id || deletingId === registration.id}
                                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition duration-300 disabled:bg-gray-400"
                                                    >
                                                        {updatingStatus === registration.id ? 'Updating...' : 'Accept'}
                                                    </button>
                                                    <button
                                                        onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                                                        disabled={updatingStatus === registration.id || deletingId === registration.id}
                                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition duration-300 disabled:bg-gray-400"
                                                    >
                                                        {updatingStatus === registration.id ? 'Updating...' : 'Reject'}
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => deleteRegistration(registration.id)}
                                                disabled={deletingId === registration.id || updatingStatus === registration.id}
                                                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition duration-300 disabled:bg-gray-400"
                                                title="Delete registration permanently"
                                            >
                                                {deletingId === registration.id ? 'Deleting...' : '🗑️ Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <strong>Email:</strong> {registration.email}
                                    </div>
                                    <div>
                                        <strong>Phone:</strong> {registration.phone}  
                                    </div>
                                    <div>
                                        <strong>Student ID:</strong> {registration.student_card_number}
                                    </div>
                                    <div>
                                        <strong>Gender:</strong> {registration.gender}
                                    </div>
                                    <div>
                                        <strong>Year:</strong> {registration.year_of_studies}
                                    </div>
                                    <div>
                                        <strong>Major:</strong> {registration.major}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <strong>Faculty:</strong> {registration.faculty}
                                </div>

                                <div className="mb-4">
                                    <strong>Motivation:</strong>
                                    <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded">
                                        {registration.motivation}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-500">
                                    <strong>Submitted:</strong> {formatDate(registration.created_at)}
                                    {registration.updated_at !== registration.created_at && (
                                        <span className="ml-4">
                                            <strong>Updated:</strong> {formatDate(registration.updated_at)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {registrations.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No registrations found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClubRegistrationsAdmin;
