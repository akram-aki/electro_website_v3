import React, { useState } from 'react';
import Header from '../components/Header/Index';
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp

const RegistrationForm = () => {
    const [teamInfo, setTeamInfo] = useState({
        teamName: '',
        university: '',
        wilaya: '',
        teamLeaderName: '',
        email: '',
        phone: '',
    });

    const [members, setMembers] = useState([
        {
            fullName: '',
            studentId: '',
            email: '',
            phone: '',
            discordUsername: '',
            projects: '',
            github: '',
            linkedin: '',
            needsAccommodation: false,
        },
    ]);

    const [signature, setSignature] = useState('');
    const [signatureDate, setSignatureDate] = useState('');
    const [technicalSheet, setTechnicalSheet] = useState(null);
    const [studentIDs, setStudentIDs] = useState(null);

    const addMember = () => {
        const allFilled = members.every(member =>
            member.fullName.trim() !== "" &&
            member.studentId.trim() !== "" &&
            member.email.trim() !== "" &&
            member.discordUsername.trim() !== "" &&
            member.phone.trim() !== ""
        );

        if (!allFilled) {
            alert("Please fill in all required fields before adding a new member.");
            return;
        }

        if (members.length < 4) {
            setMembers([
                ...members,
                {
                    fullName: "",
                    studentId: "",
                    email: "",
                    discordUsername: "",
                    phone: "",
                    projects: "",
                    github: "",
                    linkedin: "",
                }
            ]);
        }
    };
    //auto deploy test
    const removeMember = (index) => {
        if (members.length === 1) {
            alert("You must have at least one member.");
            return;
        }
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const handleTeamInfoChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo({ ...teamInfo, [name]: value });
    };

    const handleMemberChange = (e, index) => {
        const { name, value } = e.target;
        const newMembers = [...members];

        newMembers[index][name] = name === "needsAccommodation" ? value === "true" : value;
        setMembers(newMembers);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'registrations'), {
                teamInfo,
                members,
                signature,
                signatureDate,
                submittedAt: serverTimestamp(),
            });
            alert("Thank you for your registration! Keep an eye out for the confirmation email from us.");
        } catch (error) {
            console.error("Error submitting registration:", error);
            alert("Error submitting registration. Please try again later.");
        }
        console.log({
            teamInfo,
            members,
            signature,
            signatureDate,
            technicalSheet,
            studentIDs,
        });
    };

    return (
        <div className='flex flex-col mx-4 md:mx-20 my-10 justify-center'>
            <Header hidden={true} className='mb-5' />
            <div className="flex justify-center pb-6 bg-gray-100 min-h-screen">

                <form
                    className="w-full max-w-3xl bg-white border border-[#70a939] p-6 md:p-8 rounded shadow-md"
                    onSubmit={handleSubmit}
                >
                    <div className="-m-6 md:-m-8">
                        <img src="RUMBLE_TIME_1.png" alt="" className="w-full h-auto block" />
                    </div>

                    <h1 className="text-center text-2xl md:text-3xl font-bold text-[#70a939] md:mt-16">ELECTROBOT RUMBLE 2025</h1>
                    <h2 className="text-center text-xl md:text-2xl font-semibold mt-2">REGISTRATION FORM</h2>
                    <p className="text-center text-gray-700 mt-1">Organized by Electro Scientific Club</p>

                    <h3 className="mt-6 text-lg md:text-xl font-semibold text-[#70a939]">Team Information</h3>
                    <div className="mt-4">
                        <label className="block mb-1">Team Name:</label>
                        <input
                            type="text"
                            name="teamName"
                            value={teamInfo.teamName}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter your team name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">University:</label>
                        <input
                            type="text"
                            name="university"
                            value={teamInfo.university}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter your university"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Wilaya:</label>
                        <input
                            type="text"
                            name="wilaya"
                            value={teamInfo.wilaya}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter your wilaya"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Team Leader Name:</label>
                        <input
                            type="text"
                            name="teamLeaderName"
                            value={teamInfo.teamLeaderName}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter the team leader's name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Team Leader Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={teamInfo.email}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Team Leader Phone Number:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={teamInfo.phone}
                            onChange={handleTeamInfoChange}
                            placeholder="Enter phone number"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">
                        Team Members (Maximum of 3 members including the leader)
                    </h3>
                    {members.map((member, index) => (
                        <div key={index} className="mt-6 p-4 border border-gray-200 rounded bg-gray-50">
                            <h4 className="text-lg font-semibold text-[#70a939]">Member {index + 1}</h4>
                            <div className="mt-3">
                                <label className="block mb-1">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={member.fullName}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Enter full name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">Student ID:</label>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={member.studentId}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Enter student ID"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Enter email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">Discord Username:</label>
                                <input
                                    type="text"
                                    name="discordUsername"
                                    value={member.discordUsername}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Enter Discord username"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">Phone Number:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={member.phone}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Enter phone number"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">Projects / Experience</label>
                                <input
                                    type="text"
                                    name="projects"
                                    value={member.projects || ''}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="Projects or experience you had with robotics."
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">GitHub profile (if exists)</label>
                                <input
                                    type="text"
                                    name="github"
                                    value={member.github || ''}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="https://github.com/username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block mb-1">LinkedIn profile (if exists)</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={member.linkedin || ''}
                                    onChange={(e) => handleMemberChange(e, index)}
                                    placeholder="https://linkedin.com/username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                />
                            </div><div className="mt-3">
                                <label className="block mb-1">Need Accommodation?</label>
                                <div className="flex space-x-4 mt-1">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="needsAccommodation"
                                            value="true"
                                            checked={member.needsAccommodation === true}
                                            onChange={(e) => handleMemberChange(e, index)}
                                            className="mr-2"
                                        />
                                        Yes
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="needsAccommodation"
                                            value="false"
                                            checked={member.needsAccommodation === false}
                                            onChange={(e) => handleMemberChange(e, index)}
                                            className="mr-2"
                                        />
                                        No
                                    </label>
                                </div>
                            </div>


                            <button
                                type="button"
                                className="mt-4 rounded-sm bg-red-800 w-full sm:w-1/3 py-1 text-white text-sm"
                                onClick={() => removeMember(index)}
                            >
                                - REMOVE MEMBER
                            </button>
                        </div>
                    ))}
                    <button
                        className="mt-4 rounded-sm bg-[#70a939] w-full sm:w-1/2 py-1 text-white"
                        onClick={addMember}
                        type="button"
                    >
                        + ADD A MEMBER
                    </button>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">Competition Rules Agreement</h3>
                    <p className="mt-2 text-gray-700">
                        By signing this form, you agree to abide by all the rules and regulations of the Electrobot Rumble, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Respecting all participants and organizers.</li>
                        <li>Ensuring your robot complies with the technical specifications.</li>
                        <li>Accepting the jury’s final decisions.</li>
                    </ul>

                    <p className="mt-6 text-center text-gray-700">
                        Submission Deadline: April 4th, 2025
                    </p>
                    <p className="mt-2 text-center text-gray-700">
                        For any inquiries, contact us at{' '}
                        <a href="mailto:electro.sc@univ-boumerdes.dz" className="text-[#70a939] underline">
                            electro.sc@univ-boumerdes.dz
                        </a>
                    </p>

                    <button
                        type="submit"
                        className="mt-8 w-full bg-[#70a939] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                        Submit Registration
                    </button>
                </form>
            </div>
        </div>
    );
};

function ElectroBotRumble() {
    return (
        <div>
            <RegistrationForm />
        </div>
    );
}

export default ElectroBotRumble;
