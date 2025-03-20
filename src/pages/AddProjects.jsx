import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const AddProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectAuthor, setProjectAuthor] = useState('');
    const [projectImageFile, setProjectImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoadingProjects(false);
            }
        };

        fetchProjects();
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

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        if (!projectTitle || !projectAuthor || !projectImageFile) {
            alert("Please fill in all fields and select an image.");
            return;
        }
        setUploading(true);
        try {
            const imageUrl = await uploadImageToCloudinary(projectImageFile);
            const newProject = {
                projectTitle,
                projectAuthor,
                projectImg: imageUrl,
            };
            const docRef = await addDoc(collection(db, 'projects'), newProject);
            alert("Project added successfully!");
            setProjects(prev => [...prev, { id: docRef.id, ...newProject }]);
            setProjectTitle('');
            setProjectAuthor('');
            setProjectImageFile(null);
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Error adding project. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, 'projects', id));
            setProjects(prev => prev.filter(project => project.id !== id));
            alert("Project deleted successfully!");
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Error deleting project. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Projects</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Current Projects</h2>
                {loadingProjects ? (
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p>No projects available.</p>
                ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {projects.map((project) => (
                            <div key={project.id} className="border p-4 rounded shadow">
                                <h3 className="text-xl font-bold">{project.projectTitle}</h3>
                                <p className="text-gray-600">By {project.projectAuthor}</p>
                                {project.projectImg && (
                                    <img
                                        src={project.projectImg}
                                        alt={project.projectTitle}
                                        className="mt-2 w-full h-48 object-cover rounded"
                                    />
                                )}
                                <button
                                    onClick={() => handleDeleteProject(project.id)}
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
                <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Project Title</label>
                        <input
                            type="text"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter project title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Project Author</label>
                        <input
                            type="text"
                            value={projectAuthor}
                            onChange={(e) => setProjectAuthor(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter project author"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Project Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProjectImageFile(e.target.files[0])}
                            className="w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-[#70a939] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {uploading ? 'Uploading...' : 'Add Project'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default AddProjects;