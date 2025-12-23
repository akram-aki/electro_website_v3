import { useState, useEffect } from "react";

const SubmissionsViewer = ({ form, onBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, [form.id]);

  const fetchSubmissions = async () => {
    const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
    const token = tokenData.token;

    if (!token) {
      setError("Admin token missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/submissions?form_id=${form.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch submissions");
      }

      setSubmissions(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!form) return null;

  const fields = form.fields || []; // Safety check

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-semibold text-lg"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-[#70a939]">
            {form.title} - Submissions
          </h2>
        </div>
        <button
          onClick={fetchSubmissions}
          className="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500 italic">No submissions received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                {fields.map((field) => (
                  <th
                    key={field.id}
                    className="py-3 px-4 border-b text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(submission.submitted_at)}
                  </td>
                  {fields.map((field) => (
                    <td
                      key={field.id}
                      className="py-4 px-4 text-sm text-gray-900"
                    >
                      {/* Handle different value types if necessary */}
                      {typeof submission.data[field.label] === "boolean"
                        ? submission.data[field.label]
                          ? "Yes"
                          : "No"
                        : submission.data[field.label] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsViewer;
