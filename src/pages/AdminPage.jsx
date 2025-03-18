import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Header from '../components/Header/Index';
import AdminPanel from './AdminPanel';

const AdminPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const tokenData = localStorage.getItem('adminToken');
        if (tokenData) {
            const tokenObj = JSON.parse(tokenData);
            if (new Date(tokenObj.expiresAt) > new Date()) {
                setLoggedIn(true);
            } else {
                localStorage.removeItem('adminToken');
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username), where('password', '==', password));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setError('Invalid username or password');
                return;
            }
            let userDoc = null;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            });
            if (!userDoc.isAdmin) {
                setError('Access denied: not an admin');
                return;
            }
            const token = Math.random().toString(36).substring(2);
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 4);
            const tokenObj = { token, expiresAt };
            localStorage.setItem('adminToken', JSON.stringify(tokenObj));
            setLoggedIn(true);
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setLoggedIn(false);
    };

    if (loading) return <p>Loading...</p>;

    if (!loggedIn) {
        return (
            <div className="flex flex-col mx-4 md:mx-20 my-10 items-center">
                <Header hidden={true} className="mb-5" />
                <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
                    <h1 className="text-center text-2xl font-bold text-[#70a939]">Admin Login</h1>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    <form onSubmit={handleLogin} className="mt-4 space-y-4">
                        <div>
                            <label className="block mb-1">Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#70a939] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-4 md:mx-20 my-10">
            <Header hidden={true} className="mb-5" />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-[#70a939]">Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>
            <AdminPanel />
        </div>
    );
};

export default AdminPage;
