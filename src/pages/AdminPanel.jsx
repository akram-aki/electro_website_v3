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
                const apps = querySnapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter((app) => app.isVisible !== false);
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
            setApplications((prev) =>
                prev.map((app) => (app.id === id ? { ...app, status } : app))
            );
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const hideApplication = async (id) => {
        try {
            await updateDoc(doc(db, 'registrations', id), { isVisible: false });
            setApplications((prev) => prev.filter((app) => app.id !== id));
        } catch (error) {
            console.error('Error hiding application:', error);
        }
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Accepted':
                return 'bg-green-100 text-green-700 px-2 py-1 rounded';
            case 'Rejected':
                return 'bg-red-100 text-red-700 px-2 py-1 rounded';
            default:
                return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded';
        }
    };

    const getBorderClasses = (status) => {
        switch (status) {
            case 'Accepted':
                return 'border-l-4 border-green-600';
            case 'Rejected':
                return 'border-l-4 border-red-600';
            default:
                return 'border-l-4 border-yellow-400';
        }
    };

    return (
        <div className="flex flex-col mx-4 md:mx-20 my-10">
            <div className="bg-gray-100 min-h-screen p-6">
                <h1 className="text-2xl font-bold text-[#70a939] text-center">
                    Admin Panel - Applications
                </h1>
                {loading ? (
                    <p className="text-center mt-4">Loading applications...</p>
                ) : (
                    <div className="mt-6 bg-white p-6 rounded shadow-md">
                        {applications.length === 0 ? (
                            <p className="text-center">No applications received yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => {
                                    const status = app.status || 'Pending';
                                    return (
                                        <div
                                            key={app.id}
                                            className={`p-4 rounded bg-gray-50 border ${getBorderClasses(
                                                status
                                            )}`}
                                        >
                                            <h2 className="text-xl font-semibold mb-2">
                                                {app.teamInfo.teamName}
                                            </h2>
                                            <p>
                                                <strong>University:</strong> {app.teamInfo.university}
                                            </p>
                                            <p>
                                                <strong>Wilaya:</strong> {app.teamInfo.wilaya}
                                            </p>
                                            <p>
                                                <strong>Leader:</strong> {app.teamInfo.teamLeaderName}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {app.teamInfo.email}
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> {app.teamInfo.phone}
                                            </p>
                                            <div className="mt-2">
                                                <strong>Status:</strong>{' '}
                                                <span className={getStatusClasses(status)}>
                                                    {status}
                                                </span>
                                            </div>
                                            {app.members && app.members.length > 0 && (
                                                <div className="mt-4">
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        Team Members:
                                                    </h3>
                                                    <ul className="list-disc list-inside bg-gray-100 p-4 rounded space-y-2">
                                                        {app.members.map((member, index) => (
                                                            <li
                                                                key={index}
                                                                className="border-b py-2 last:border-b-0"
                                                            >
                                                                <p>
                                                                    <strong>Name:</strong> {member.fullName}
                                                                </p>
                                                                <p>
                                                                    <strong>Discord:</strong> {member.discordUsername}
                                                                </p>
                                                                <p>
                                                                    <strong>Email:</strong> {member.email}
                                                                </p>
                                                                <p>
                                                                    <strong>Phone:</strong> {member.phone}
                                                                </p>
                                                                <p>
                                                                    <strong>Student ID:</strong> {member.studentId}
                                                                </p>
                                                                <p>
                                                                    <strong>Projects/Experience:</strong> {member.projects || 'N/A'}
                                                                </p>
                                                                <p>
                                                                    <strong>GitHub:</strong> {member.github || 'N/A'}
                                                                </p>
                                                                <p>
                                                                    <strong>LinkedIn:</strong> {member.linkedin || 'N/A'}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <button
                                                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                                                    onClick={() =>
                                                        updateApplicationStatus(app.id, 'Accepted')
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                                                    onClick={() =>
                                                        updateApplicationStatus(app.id, 'Rejected')
                                                    }
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded"
                                                    onClick={() => hideApplication(app.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
