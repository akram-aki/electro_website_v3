import React, { useState } from 'react';
import Header from '../components/Header/Index';
const RegistrationForm = () => {
    const [teamInfo, setTeamInfo] = useState({
        teamName: '',
        university: '',
        wilaya: '',
        teamLeaderName: '',
        email: '',
        phone: '',
    });

    // State for 3 team members (including leader as first member)
    const [members, setMembers] = useState([
        { fullName: '', studentId: '', email: '', phone: '', discordUsername: '' },
        { fullName: '', studentId: '', email: '', phone: '', discordUsername: '' },
        { fullName: '', studentId: '', email: '', phone: '', discordUsername: '' },
    ]);

    // State for signature and attachments
    const [signature, setSignature] = useState('');
    const [signatureDate, setSignatureDate] = useState('');
    const [technicalSheet, setTechnicalSheet] = useState(null);
    const [studentIDs, setStudentIDs] = useState(null);

    // Handle changes in team info fields
    const handleTeamInfoChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo({ ...teamInfo, [name]: value });
    };

    // Handle changes for each team member
    const handleMemberChange = (e, index) => {
        const { name, value } = e.target;
        const newMembers = [...members];
        newMembers[index][name] = value;
        setMembers(newMembers);
    };

    // Handle form submission (pure frontend; adjust as needed)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            teamInfo,
            members,
            signature,
            signatureDate,
            technicalSheet,
            studentIDs,
        });
        alert("Registration submitted!");
    };

    return (
        <div className='flex flex-col mx-20 my-10 justify-center md:justify-center'>
            <Header hidden={true} className='mb-5' />
            <div className="flex justify-center pb-6 bg-gray-100 min-h-screen">
                <form className="w-full max-w-3xl bg-white border border-[#70a939] p-8 rounded shadow-md" onSubmit={handleSubmit}>

                    <h1 className="text-center text-3xl font-bold text-[#70a939]">ELECTROBOT RUMBLE 2025</h1>
                    <h2 className="text-center text-2xl font-semibold mt-2">REGISTRATION FORM</h2>
                    <p className="text-center text-gray-700 mt-1">Organized by Electro Scientific Club</p>

                    <h3 className="mt-6 text-xl font-semibold text-[#70a939]">Team Information</h3>
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
                        <label className="block mb-1">Email:</label>
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
                        <label className="block mb-1">Phone Number:</label>
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

                    <h3 className="mt-8 text-xl font-semibold text-[#70a939]">
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
                                <div className="mt-4">
                                    <label className="block mb-1">Discord Username:</label>
                                    <input
                                        type="tel"
                                        name="discordUsername"
                                        value={teamInfo.discordUsername}
                                        onChange={handleTeamInfoChange}
                                        placeholder="Enter Discord Username"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                                    />
                                </div>
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
                        </div>
                    ))}

                    <h3 className="mt-8 text-xl font-semibold text-[#70a939]">Competition Rules Agreement</h3>
                    <p className="mt-2 text-gray-700">
                        By signing this form, you agree to abide by all the rules and regulations of the Electrobot Rumble, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li>Respecting all participants and organizers.</li>
                        <li>Ensuring your robot complies with the technical specifications.</li>
                        <li>Accepting the jury’s final decisions.</li>
                        <li>Acknowledging that failure to adhere to the rules may result in disqualification.</li>
                    </ul>

                    <div className="mt-6">
                        <label className="block mb-1">Team Leader’s Signature:</label>
                        <input
                            type="text"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            placeholder="Type your signature"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Date:</label>
                        <input
                            type="date"
                            value={signatureDate}
                            onChange={(e) => setSignatureDate(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#70a939]"
                        />
                    </div>

                    <h3 className="mt-8 text-xl font-semibold text-[#70a939]">Required Attachments</h3>
                    <div className="mt-4">
                        <label className="block mb-1">
                            Technical Sheet of the Robot (detailed design and specifications):
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setTechnicalSheet(e.target.files[0])}
                            className="w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Student IDs of all team members:</label>
                        <input
                            type="file"
                            onChange={(e) => setStudentIDs(e.target.files[0])}
                            className="w-full"
                        />
                    </div>

                    <p className="mt-6 text-center text-gray-700">
                        Submission Deadline: ___________________________
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
    )
}

export default ElectroBotRumble
