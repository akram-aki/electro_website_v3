import { useState } from "react";

const FormBuilder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type,
        label: "",
        required: false,
        options: type === "select" || type === "radio" ? "" : undefined, // comma separated for simplified UI
      },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!title.trim()) {
      setError("Form title is required");
      setLoading(false);
      return;
    }

    if (fields.length === 0) {
      setError("Add at least one field");
      setLoading(false);
      return;
    }

    // Process fields (convert options string to array)
    const processedFields = fields.map((f) => ({
      ...f,
      options: f.options
        ? f.options
            .split(",")
            .map((o) => o.trim())
            .filter((o) => o)
        : undefined,
    }));

    const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
    const token = tokenData.token;

    if (!token) {
      setError("Admin token missing. Please re-login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          fields: processedFields,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create form");
      }

      setSuccess("Form created successfully!");
      setTitle("");
      setDescription("");
      setFields([]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#70a939]">
        Create New Form
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Form Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Hackathon Registration"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief details about this form..."
            rows="3"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 font-bold">Form Fields</label>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => addField("text")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Text
              </button>
              <button
                type="button"
                onClick={() => addField("email")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Email
              </button>
              <button
                type="button"
                onClick={() => addField("number")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Number
              </button>
              <button
                type="button"
                onClick={() => addField("textarea")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Long Text
              </button>
              <button
                type="button"
                onClick={() => addField("select")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Dropdown
              </button>
              <button
                type="button"
                onClick={() => addField("checkbox")}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                + Checkbox
              </button>
            </div>
          </div>

          {fields.length === 0 && (
            <p className="text-gray-500 text-sm italic">No fields added yet.</p>
          )}

          <div className="space-y-3">
            {fields.map((field) => (
              <div
                key={field.id}
                className="border p-4 rounded bg-gray-50 flex flex-col gap-3 relative"
              >
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>

                <div className="flex gap-4 items-center">
                  <span className="text-xs font-bold uppercase bg-gray-200 px-2 py-1 rounded">
                    {field.type}
                  </span>
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Field Label (e.g., Full Name)"
                      value={field.label}
                      onChange={(e) =>
                        updateField(field.id, "label", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-12">
                  <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(field.id, "required", e.target.checked)
                      }
                    />
                    Required
                  </label>

                  {(field.type === "select" || field.type === "radio") && (
                    <input
                      type="text"
                      className="flex-grow p-2 border border-gray-300 rounded text-sm"
                      placeholder="Options (comma separated: Option A, Option B)"
                      value={field.options || ""}
                      onChange={(e) =>
                        updateField(field.id, "options", e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#70a939] hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300"
        >
          {loading ? "Creating Form..." : "Publish Form"}
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
