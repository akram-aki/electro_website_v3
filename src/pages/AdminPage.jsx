import { useState, useEffect } from "react";
import Header from "../components/Header/Index";
import FormBuilder from "../components/Admin/FormBuilder";
import ActiveFormsList from "../components/Admin/ActiveFormsList";
import SubmissionsViewer from "../components/Admin/SubmissionsViewer";
import TournamentCreator from "../components/Admin/TournamentCreator";
import ActiveTournament from "../components/Admin/ActiveTournament";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("add-new-form");
  const [selectedForm, setSelectedForm] = useState(null);
  const [tokenInput, setTokenInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const tokenData = localStorage.getItem("adminToken");
    if (tokenData) {
      const tokenObj = JSON.parse(tokenData);
      if (new Date(tokenObj.expiresAt) > new Date()) {
        setLoggedIn(true);
      } else {
        localStorage.removeItem("adminToken");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setLoginError("");

    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenInput.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
        const tokenObj = { token: tokenInput.trim(), expiresAt };
        localStorage.setItem("adminToken", JSON.stringify(tokenObj));
        setLoggedIn(true);
      } else {
        setLoginError("Invalid Admin Token");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLoggedIn(false);
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#70a939]">
            Admin Access
          </h2>
          {loginError && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Admin Token
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter secret token..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#70a939] hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "add-new-form":
        return <FormBuilder />;
      case "create-tournament":
        return <TournamentCreator />;
      case "active-tournament":
        return <ActiveTournament />;
      case "active-forms":
        return (
          <ActiveFormsList
            onViewSubmissions={(form) => {
              setSelectedForm(form);
              setActiveTab("view-submissions");
            }}
          />
        );
      case "view-submissions":
        return (
          <SubmissionsViewer
            form={selectedForm}
            onBack={() => setActiveTab("active-forms")}
          />
        );
      default:
        return <FormBuilder />;
    }
  };

  // eslint-disable-next-line react/prop-types
  const TabButton = ({ id, label }) => {
    if (id === "view-submissions" && activeTab !== "view-submissions")
      return null; // Only show if active

    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
          activeTab === id
            ? "bg-[#70a939] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col mx-4 md:mx-20 my-10">
      <Header hidden={true} className="mb-5" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#70a939] mb-4 md:mb-0">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Clear Session
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-300 mb-6">
        <TabButton id="add-new-form" label="Add New Form" />
        <TabButton id="create-tournament" label="Create Tournament" />
        <TabButton id="active-tournament" label="Active Tournament" />
        <TabButton id="active-forms" label="Active Forms" />
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
