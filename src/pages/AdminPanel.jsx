import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Header from '../components/Header/Index';

const AdminPanel = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'registrations'));
                const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setApplications(apps);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const updateApplicationStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'registrations', id), { status });
            setApplications(applications.map(app => (app.id === id ? { ...app, status } : app)));
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    return (
        <div className="flex flex-col mx-4 md:mx-20 my-10">
            <div className="bg-gray-100 min-h-screen p-6">
                <h1 className="text-2xl font-bold text-[#70a939] text-center">Admin Panel - Applications</h1>
                {loading ? (
                    <p className="text-center mt-4">Loading applications...</p>
                ) : (
                    <div className="mt-6 bg-white p-6 rounded shadow-md">
                        {applications.length === 0 ? (
                            <p className="text-center">No applications received yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="border p-4 rounded bg-gray-50">
                                        <h2 className="text-xl font-semibold">{app.teamInfo.teamName}</h2>
                                        <p><strong>University:</strong> {app.teamInfo.university}</p>
                                        <p><strong>Wilaya:</strong> {app.teamInfo.wilaya}</p>
                                        <p><strong>Leader:</strong> {app.teamInfo.teamLeaderName}</p>
                                        <p><strong>Email:</strong> {app.teamInfo.email}</p>
                                        <p><strong>Phone:</strong> {app.teamInfo.phone}</p>
                                        <p><strong>Status:</strong> {app.status || 'Pending'}</p>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                                                onClick={() => updateApplicationStatus(app.id, 'Accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                                                onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
