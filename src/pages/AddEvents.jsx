import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const AddEvents = () => {
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventBulletPoint1, setEventBulletPoint1] = useState('');
    const [eventBulletPoint2, setEventBulletPoint2] = useState('');
    const [eventImageFile, setEventImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'events'));
                const eventsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoadingEvents(false);
            }
        };

        fetchEvents();
    }, []);

    const uploadImageToCloudinary = async (file) => {
        const cloudName = 'dyzpjvipc';
        const uploadPreset = 'unsigned_uploads';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error('Image upload failed');
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        if (!eventTitle || !eventDescription || !eventBulletPoint1 || !eventBulletPoint2 || !eventImageFile) {
            alert("Please fill in all fields and select an image.");
            return;
        }
        setUploading(true);
        try {
            const imageUrl = await uploadImageToCloudinary(eventImageFile);
            const newEvent = {
                eventTitle,
                eventDescription,
                eventBulletPoint1,
                eventBulletPoint2,
                eventImg: imageUrl,
            };
            const docRef = await addDoc(collection(db, 'events'), newEvent);
            alert("Event added successfully!");
            setEvents(prev => [...prev, { id: docRef.id, ...newEvent }]);
            setEventTitle('');
            setEventDescription('');
            setEventBulletPoint1('');
            setEventBulletPoint2('');
            setEventImageFile(null);
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Error adding event. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteDoc(doc(db, 'events', id));
            setEvents(prev => prev.filter(event => event.id !== id));
            alert("Event deleted successfully!");
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Error deleting event. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Events</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Current Events</h2>
                {loadingEvents ? (
                    <p>Loading events...</p>
                ) : events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {events.map((event) => (
                            <div key={event.id} className="border p-4 rounded shadow">
                                <h3 className="text-xl font-bold">{event.eventTitle}</h3>
                                <p className="mt-2">{event.eventDescription}</p>
                                <ul className="list-disc ml-5 mt-2">
                                    <li>{event.eventBulletPoint1}</li>
                                    <li>{event.eventBulletPoint2}</li>
                                </ul>
                                {event.eventImg && (
                                    <img
                                        src={event.eventImg}
                                        alt={event.eventTitle}
                                        className="mt-2 w-full h-48 object-cover rounded"
                                    />
                                )}
                                <button
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="border p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Event Title</label>
                        <input
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter event title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Event Description</label>
                        <textarea
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter event description"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Bullet Point 1</label>
                        <input
                            type="text"
                            value={eventBulletPoint1}
                            onChange={(e) => setEventBulletPoint1(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter first bullet point"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Bullet Point 2</label>
                        <input
                            type="text"
                            value={eventBulletPoint2}
                            onChange={(e) => setEventBulletPoint2(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter second bullet point"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Event Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEventImageFile(e.target.files[0])}
                            className="w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-[#70a939] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {uploading ? 'Uploading...' : 'Add Event'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default AddEvents;
