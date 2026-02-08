import { useState } from "react";
import { tournament } from "../../../testing.js";

const TournamentCreator = () => {
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("groups");
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addTeam = () => {
    if (!currentTeam.trim()) return;
    if (teams.includes(currentTeam.trim())) {
      setError("Team already added");
      return;
    }
    setTeams([...teams, currentTeam.trim()]);
    setCurrentTeam("");
    setError("");
  };

  const removeTeam = (teamToRemove) => {
    setTeams(teams.filter((team) => team !== teamToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!title.trim()) {
      setError("Tournament title is required");
      setLoading(false);
      return;
    }

    if (teams.length < 2) {
      setError("At least two teams are required");
      setLoading(false);
      return;
    }

    const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
    const token = tokenData.token;

    if (!token) {
      setError("Admin token missing. Please re-login.");
      setLoading(false);
      return;
    }

    let bracketData = null;
    if (format === 'elimination' || format === 'double_elimination') {
       try {
         const t = new tournament([], []);
         t.gameSetup(teams);
         bracketData = t;
       } catch (e) {
         console.error("Bracket generation failed:", e);
         setError("Failed to generate bracket structure");
         setLoading(false);
         return;
       }
    }

    try {
      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          format,
          teams,
          bracket_data: bracketData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create tournament");
      }

      setSuccess("Tournament created successfully!");
      setTitle("");
      setFormat("groups");
      setTeams([]);
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
        Create New Tournament
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
            Tournament Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Summer Championship"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Format
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="groups">Groups</option>
            <option value="elimination">Elimination</option>
            <option value="double_elimination">Double Elimination</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Participating Teams
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded"
              value={currentTeam}
              onChange={(e) => setCurrentTeam(e.target.value)}
              placeholder="Enter team name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTeam();
                }
              }}
            />
            <button
              type="button"
              onClick={addTeam}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700 font-bold"
            >
              Add
            </button>
          </div>

          {teams.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No teams added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-3">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 border border-gray-300"
                >
                  <span>{team}</span>
                  <button
                    type="button"
                    onClick={() => removeTeam(team)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#70a939] hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300"
        >
          {loading ? "Creating Tournament..." : "Create Tournament"}
        </button>
      </form>
    </div>
  );
};

export default TournamentCreator;



