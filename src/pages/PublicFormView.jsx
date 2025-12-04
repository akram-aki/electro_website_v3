import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header/Index";
import Footer from "../components/Footer/Index";

const PublicFormView = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Form not found");
        }

        setForm(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (formId) fetchForm();
  }, [formId]);

  const handleInputChange = (e, fieldLabel) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [fieldLabel]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_id: formId,
          data: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f4f4f2]">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border-4 border-[#70a939] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-500 font-medium">Loading form...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f4f4f2]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-red-500"
          >
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Unable to Load Form
            </h1>
            <p className="text-gray-600">
              {error ||
                "The form you are looking for does not exist or has been removed."}
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f4f4f2]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Your submission has been received successfully.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#70a939] font-bold hover:text-green-700 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <span>Submit another response</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!form.is_active) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f4f4f2]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border-t-4 border-yellow-400"
          >
            <div className="text-yellow-400 text-5xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Form Closed
            </h1>
            <p className="text-gray-600">
              This form is currently not accepting responses.
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f2] font-sora">
      <div className="xl:mt-16 xl:mx-16 mt-8 mx-6">
        <Header />
      </div>

      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#70a939]/5 to-transparent -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-[#70a939] to-[#5a8a2d] p-8 md:p-10 text-white relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <h1 className="text-3xl md:text-4xl font-bold relative z-10 leading-tight">
              {form.title}
            </h1>
            {form.description && (
              <p className="mt-4 text-green-50 text-lg relative z-10 opacity-95 font-light leading-relaxed">
                {form.description}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            {form.fields.map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex flex-col group"
              >
                <label className="font-semibold text-gray-700 mb-2 flex items-center group-focus-within:text-[#70a939] transition-colors">
                  {field.label}
                  {field.required && (
                    <span
                      className="text-red-500 ml-1 text-sm"
                      title="Required"
                    >
                      *
                    </span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#70a939]/50 focus:border-[#70a939] transition-all duration-300 resize-y min-h-[120px]"
                    rows="4"
                    required={field.required}
                    onChange={(e) => handleInputChange(e, field.label)}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  />
                ) : field.type === "select" ? (
                  <div className="relative">
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pr-10 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#70a939]/50 focus:border-[#70a939] transition-all duration-300 cursor-pointer"
                      required={field.required}
                      onChange={(e) => handleInputChange(e, field.label)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {field.options &&
                        field.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                ) : field.type === "checkbox" ? (
                  <label className="flex items-start mt-2 cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-[#70a939] border-gray-300 rounded focus:ring-[#70a939] cursor-pointer"
                        required={field.required}
                        onChange={(e) => handleInputChange(e, field.label)}
                      />
                    </div>
                    <div className="ml-3 text-gray-600 text-sm select-none">
                      Yes, I confirm/agree to this
                    </div>
                  </label>
                ) : (
                  <input
                    type={field.type}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#70a939]/50 focus:border-[#70a939] transition-all duration-300"
                    required={field.required}
                    onChange={(e) => handleInputChange(e, field.label)}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: form.fields.length * 0.1 + 0.3 }}
            >
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 relative overflow-hidden ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-[#70a939] to-[#5a8a2d] hover:shadow-green-500/30 hover:-translate-y-1 active:translate-y-0"
                }`}
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Response"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicFormView;
