import React, { useState } from 'react';
import Header from '../components/Header/Index';

const JoinClubForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        familyName: '',
        email: '',
        phone: '',
        studentCardNumber: '',
        gender: '',
        yearOfStudies: '',
        major: '',
        faculty: '',
        motivation: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/club-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Success - show thank you page
            setSubmitted(true);
            console.log('Registration successful:', data);

        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Failed to submit registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render thank you page if submitted
    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <Header hidden={true} />
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <h1 className="text-3xl font-bold mb-4">Thank You for Your Interest!</h1>
                    <p className="text-lg text-gray-700">We'll review your application and get back to you soon.</p>
                    <p className="text-sm text-gray-500 mt-4">You can expect to hear from us within 3-5 business days.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-4 md:mx-20 my-10 justify-center">
            <Header hidden={true} className="mb-5" />
            <div className="flex justify-center pb-6 bg-gray-100 min-h-screen">
                <form
                    className="w-full max-w-3xl bg-white border border-[#70a939] p-6 md:p-8 rounded shadow-md"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-[#70a939] mt-6">JOIN ELECTRO SCIENTIFIC CLUB</h1>
                    <h2 className="text-center text-xl md:text-2xl font-semibold mt-2">MEMBERSHIP APPLICATION</h2>
                    <p className="text-center text-gray-700 mt-1">University of Boumerdes</p>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Family Name:</label>
                            <input
                                type="text"
                                name="familyName"
                                value={formData.familyName}
                                onChange={handleInputChange}
                                placeholder="Enter your family name"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1">Phone Number:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Student Card Number:</label>
                            <input
                                type="text"
                                name="studentCardNumber"
                                value={formData.studentCardNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your student ID"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Gender:</label>
                        <div className="flex space-x-6 mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                    required
                                />
                                Male
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                    required
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">Academic Information</h3>

                    <div className="mt-4">
                        <label className="block mb-1">Year of Studies:</label>
                        <select
                            name="yearOfStudies"
                            value={formData.yearOfStudies}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        >
                            <option value="">Select your year of studies</option>
                            <option value="L1">L1 (First Year License)</option>
                            <option value="L2">L2 (Second Year License)</option>
                            <option value="L3">L3 (Third Year License)</option>
                            <option value="M1">M1 (First Year Master)</option>
                            <option value="M2">M2 (Second Year Master)</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Major:</label>
                        <select
                            name="major"
                            value={formData.major}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        >
                            <option value="">Select your major</option>
                            <option value="Science and Technology">Science and Technology</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Electrotechnics">Electrotechnics</option>
                            <option value="Electromechanics">Electromechanics</option>
                            <option value="Automation">Automation</option>
                            <option value="Mechanics">Mechanics</option>
                            <option value="Telecommunication">Telecommunication</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Faculty:</label>
                        <select
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        >
                            <option value="">Select your faculty</option>
                            <option value="Faculty of Technology">Faculty of Technology</option>
                            <option value="Faculty of Science">Faculty of Science</option>
                            <option value="Faculty of Hydrocarbons and Chemistry">Faculty of Hydrocarbons and Chemistry</option>
                            <option value="Faculty of Economics and Science">Faculty of Economics and Science</option>
                            <option value="Faculty of Law">Faculty of Law</option>
                            <option value="Institute of Electrical and Electronic Engineering">Institute of Electrical and Electronic Engineering</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <label className="block mb-1">Motivation:</label>
                        <textarea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleInputChange}
                            placeholder="Tell us why you want to join the Electro Scientific Club and what you hope to contribute..."
                            required
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939] resize-vertical"
                        />
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200">
                        <h3 className="text-lg font-semibold text-[#70a939] mb-2">Club Benefits</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Access to workshops and technical training sessions</li>
                            <li>Participation in robotics competitions and projects</li>
                            <li>Networking opportunities with industry professionals</li>
                            <li>Leadership and team collaboration experience</li>
                            <li>Access to club resources and equipment</li>
                        </ul>
                    </div>

                    <p className="mt-6 text-center text-gray-700">
                        Applications will be reviewed very shortly! Be on the lookout for an email from us!
                    </p>
                    <p className="mt-2 text-center text-gray-700">
                        For any inquiries, contact us at{' '}
                        <a href="mailto:electro.sc@univ-boumerdes.dz" className="text-[#70a939] underline">
                            electro.sc@univ-boumerdes.dz
                        </a>
                    </p>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
                            <p className="text-red-700 text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-8 w-full font-semibold py-2 px-4 rounded transition duration-300 ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                                : 'bg-[#70a939] hover:bg-green-600 text-white'
                        }`}
                    >
                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

function JoinClub() {
    return (
        <div>
            <JoinClubForm />
        </div>
    );
}

export default JoinClub;
