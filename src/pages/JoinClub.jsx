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
    const [showTerms, setShowTerms] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedRights, setAcceptedRights] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Instead of submitting directly, show terms & conditions
        setShowTerms(true);
    };

    const handleFinalSubmit = async () => {
        if (!acceptedTerms || !acceptedRights) {
            setError('You must accept both terms and conditions to proceed.');
            return;
        }

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

    // Render terms & conditions page
    if (showTerms) {
        return (
            <div className="flex flex-col mx-4 md:mx-20 my-10 justify-center">
                <Header hidden={true} className="mb-5" />
                <div className="flex justify-center pb-6 bg-gray-100 min-h-screen">
                    <div className="w-full max-w-4xl bg-white border border-[#70a939] p-6 md:p-8 rounded shadow-md">
                        <h1 className="text-center text-2xl md:text-3xl font-bold text-[#70a939] mb-6">
                            Terms & Conditions | الأحكام والشروط
                        </h1>
                        
                        <div className="mb-8 p-4 bg-gray-50 rounded">
                            <p className="text-gray-700 mb-4">
                                Here you can find all terms and conditions related to the club membership. Accept all our terms and welcome.
                            </p>
                            <p className="text-gray-700 text-right" dir="rtl">
                                هنا يمكنك العثور على كل الأحكام والشروط التي تتعلق بعضوية النادي. اقبل كل شروطنا ومرحبا بك في النادي.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#70a939] mb-4">Internal Rules | القواعد الداخلية</h3>
                            
                            <div className="space-y-4">
                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 1:</strong> All members must show discipline and respect all decisions that will be made by the majority of members.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 1:</strong> يجب على جميع الأعضاء التحلي بالانضباط واحترام جميع القرارات التي ستتخذها غالبية الأعضاء.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 2:</strong> Members must be up to date and active with regard to the various activities of the club.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 2:</strong> يجب أن يكون الأعضاء دائما موجودين ونشطين فيما يتعلق بأنشطة النادي المختلفة.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 3:</strong> Any material that leaves the office must be reported to the equipment manager and must be used in a project.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 3:</strong> يجب الإبلاغ عن أي مادة أو مكونات أو أجهزة تغادر المكتب إلى مدير المعدات ويجب استخدامها في المشروع ما.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 4:</strong> Members can only keep borrowed components for a limited period of 14 days.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 4:</strong> يمكن للأعضاء الاحتفاظ بالمكونات المستعارة فقط لفترة محدودة مدتها 14 يومًا.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 5:</strong> Any damaged material and components must be reimbursed by its user.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 5:</strong> يجب تعويض أي مواد ومكونات تالفة من قبل المستخدم الذي أتلفها.
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#70a939] pl-4">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Article 6:</strong> Political practices of all kinds are prohibited.
                                    </p>
                                    <p className="text-gray-700 text-right" dir="rtl">
                                        <strong>المادة 6:</strong> ممنوع الممارسات السياسية بكامل أنواعها.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 rounded">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>PS:</strong> By completing this form you accept and submit to the club's internal regulations.
                                </p>
                                <p className="text-sm text-gray-700 text-right" dir="rtl">
                                    <strong>ملاحظة:</strong> من خلال إكمال هذا النموذج، فإنك تقبل وتخضع للقواعد الداخلية للنادي.
                                </p>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-[#70a939] mb-3">
                                I Agree To The Terms | أقبل القواعد *
                            </h4>
                            <div className="flex space-x-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="acceptedTerms"
                                        value={true}
                                        checked={acceptedTerms === true}
                                        onChange={(e) => setAcceptedTerms(true)}
                                        className="mr-2"
                                        required
                                    />
                                    Yes | نعم
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="acceptedTerms"
                                        value={false}
                                        checked={acceptedTerms === false}
                                        onChange={(e) => setAcceptedTerms(false)}
                                        className="mr-2"
                                        required
                                    />
                                    No | لا
                                </label>
                            </div>
                        </div>

                        {/* Registration Rights */}
                        <div className="mb-6 p-4 bg-blue-50 rounded">
                            <h4 className="text-lg font-semibold text-[#70a939] mb-3">
                                Registration Rights | حقوق التسجيل
                            </h4>
                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Your pre-registration has been successfully completed. To confirm your registration, please go to the club office to give us the following files:
                                </p>
                                <p className="text-gray-700 text-right mb-4" dir="rtl">
                                    تم إكمال التسجيل المسبق الخاص بك بنجاح. لتأكيد تسجيلك، يرجى الذهاب إلى مكتب النادي لتزويدنا بالملفات التالية:
                                </p>
                                
                                <ol className="list-decimal list-inside text-gray-700 mb-2">
                                    <li>Identity Photo.</li>
                                    <li>School Certificate.</li>
                                    <li>Registration fees (500 DA).</li>
                                </ol>
                                
                                <ol className="list-decimal list-inside text-gray-700 text-right" dir="rtl">
                                    <li>صورة الهوية.</li>
                                    <li>شهادة مدرسية.</li>
                                    <li>رسوم التسجيل (500 دج).</li>
                                </ol>
                            </div>
                            
                            <div className="mb-4">
                                <h5 className="font-semibold mb-2">I Agree | أنا أقبل *</h5>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="acceptedRights"
                                            value={true}
                                            checked={acceptedRights === true}
                                            onChange={(e) => setAcceptedRights(true)}
                                            className="mr-2"
                                            required
                                        />
                                        Yes | نعم
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="acceptedRights"
                                            value={false}
                                            checked={acceptedRights === false}
                                            onChange={(e) => setAcceptedRights(false)}
                                            className="mr-2"
                                            required
                                        />
                                        No | لا
                                    </label>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-700 text-center">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowTerms(false)}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                            >
                                Back to Form | العودة إلى النموذج
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting || !acceptedTerms || !acceptedRights}
                                className={`flex-1 font-semibold py-2 px-4 rounded transition duration-300 ${
                                    isSubmitting || !acceptedTerms || !acceptedRights
                                        ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                                        : 'bg-[#70a939] hover:bg-green-600 text-white'
                                }`}
                            >
                                {isSubmitting ? 'Submitting... | إرسال...' : 'Submit Registration | إرسال التسجيل'}
                            </button>
                        </div>
                    </div>
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

                    {/* Club Description in English and Arabic */}
                    <div className="mt-8 mb-8 p-6 bg-gray-50 rounded border border-gray-200">
                        <div className="mb-4">
                            <p className="text-gray-700 leading-relaxed">
                                Electro Club is a scientific space that was created on 25 October 2011. It's domiciled within the faculty of technology at the M'hamed Bougara University Of Boumerdes (U.M.B.B).
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                The Electro Scientific Club door is open to all the ambitious students that wishing to follow more closely the evolution of technology, in particular electronics and robotics.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                If you are a fan of electronics technologies and want to be a member, please fill this form and answer the questions to join the ELECTRO family.
                            </p>
                        </div>
                        
                        <hr className="my-4 border-gray-300" />
                        
                        <div dir="rtl">
                            <p className="text-gray-700 leading-relaxed text-right">
                                النادي الكترو هو فضاء علمي تم إنشاؤه في 25 أكتوبر 2011. يقع مقره داخل كلية التكنولوجيا في جامعة امحمد بوقرة ببومرداس.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2 text-right">
                                أبواب النادي العلمي الكترو مفتوح لكل الطلبة الطموحين والذين يرغبون في تطوير أنفسهم في مجال التكنولوجيا خاصة في الالكترونيات والروبوتات.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2 text-right">
                                اذا كنت من محبي تكنولوجية الالكترونيات وترغب في أن تكون عضوا في النادي فيرجى ملئ هذه الاستمارة والاجابة على أسئلتنا للانضمام الى عائلة الكترو.
                            </p>
                        </div>
                    </div>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block mb-1">
                                Name | الاسم <span className="text-red-500">*</span>
                            </label>
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
                            <label className="block mb-1">
                                Family Name | اللقب <span className="text-red-500">*</span>
                            </label>
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
                        <label className="block mb-1">
                            Email | البريد الالكتروني <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mb-2">
                            يرجى كتابة البريد الالكتروني بشكل صحيح لانه الوسيلة التي بها سنتصل بك
                        </p>
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
                            <label className="block mb-1">
                                Phone Number | رقم الهاتف <span className="text-red-500">*</span>
                            </label>
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
                            <label className="block mb-1">
                                Student Card Number | رقم التسجيل <span className="text-red-500">*</span>
                            </label>
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
                        <label className="block mb-1">
                            Gender | الجنس <span className="text-red-500">*</span>
                        </label>
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
                                Male | ذكر
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
                                Female | أنثى
                            </label>
                        </div>
                    </div>

                    <h3 className="mt-8 text-lg md:text-xl font-semibold text-[#70a939]">Academic Information</h3>

                    <div className="mt-4">
                        <label className="block mb-1">
                            Year of Studies | مستوى التعليم <span className="text-red-500">*</span>
                        </label>
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
                        <label className="block mb-1">
                            Major | ما هو تخصصك <span className="text-red-500">*</span>
                        </label>
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
                        <label className="block mb-1">
                            Faculty | الكلية <span className="text-red-500">*</span>
                        </label>
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
                        <label className="block mb-1">
                            Motivation | تحفيزك <span className="text-red-500">*</span>
                        </label>
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
                        {isSubmitting ? 'Submitting Application... | إرسال الطلب...' : 'Continue | متابعة'}
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
