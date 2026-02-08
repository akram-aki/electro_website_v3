import { useState, useEffect } from "react";

const ActiveTournament = () => {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTournament();
  }, []);

  const fetchTournament = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tournaments");
      const json = await res.json();
      if (res.ok && json.data && json.data.length > 0) {
        // Find first tournament with bracket_data
        const activeTournament = json.data.find((t) => t.bracket_data);
        if (activeTournament) {
          setTournament(activeTournament);
        } else {
          setError("No active tournament found with bracket data.");
        }
      } else {
        setError("No tournaments found.");
      }
    } catch (e) {
      console.error("Failed to fetch tournament", e);
      setError("Failed to fetch tournament data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLive = async (match) => {
    if (!tournament || !tournament.bracket_data) return;

    const newBracketData = { ...tournament.bracket_data };
    
    // Reset all matches isLive to false
    newBracketData.upper.forEach(m => m.isLive = false);
    newBracketData.lower.forEach(m => m.isLive = false);

    // Find and set the selected match to live
    const findMatch = (id) => {
      let m = newBracketData.upper.find(m => m.id === id);
      if (m) return { match: m, type: 'upper' };
      m = newBracketData.lower.find(m => m.id === id);
      if (m) return { match: m, type: 'lower' };
      return null;
    };

    const targetMatchObj = findMatch(match.id);
    if (targetMatchObj) {
        targetMatchObj.match.isLive = true;
    }

    await saveBracketData(newBracketData, `Match #${match.id} is now LIVE`);
  };

  const handleEndLive = async () => {
    if (!tournament || !tournament.bracket_data) return;

    const newBracketData = { ...tournament.bracket_data };
    newBracketData.upper.forEach(m => m.isLive = false);
    newBracketData.lower.forEach(m => m.isLive = false);

    await saveBracketData(newBracketData, "Live match ended");
  };

  const saveBracketData = async (newBracketData, successMessage) => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("adminToken") || "{}");
        const token = tokenData.token;

        const res = await fetch("/api/tournaments", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id: tournament.id,
                bracket_data: newBracketData
            })
        });

        if (res.ok) {
            setSuccess(successMessage);
            setTournament({ ...tournament, bracket_data: newBracketData });
            setTimeout(() => setSuccess(""), 3000);
        } else {
            const errData = await res.json();
            setError(errData.error || "Failed to update tournament");
        }
    } catch (e) {
        console.error("Update error", e);
        setError("Failed to update tournament");
    }
  };

  const handleWinner = async (match, winnerParticipant, loserParticipant) => {
    if (!tournament || !tournament.bracket_data) return;

    const newBracketData = { ...tournament.bracket_data };
    
    // Helper to find match in upper or lower bracket
    const findMatch = (id) => {
      let m = newBracketData.upper.find(m => m.id === id);
      if (m) return { match: m, type: 'upper' };
      m = newBracketData.lower.find(m => m.id === id);
      if (m) return { match: m, type: 'lower' };
      return null;
    };

    // 1. Update current match winner
    const currentMatchObj = findMatch(match.id);
    if (!currentMatchObj) {
        setError("Match not found in bracket data");
        return;
    }
    const currentMatch = currentMatchObj.match;

    // Update participants in current match
    currentMatch.participants = currentMatch.participants.map(p => {
        if (p.id === winnerParticipant.id) {
            return { ...p, isWinner: true, resultText: 'Win' };
        }
        if (p.id === loserParticipant.id) {
            return { ...p, isWinner: false, resultText: 'Loss' };
        }
        return p;
    });
    currentMatch.state = 'score-done'; // Or 'completed' depending on convention
    currentMatch.isLive = false; // Auto turn off live if winner selected

    // 2. Move Winner to Next Match
    if (currentMatch.nextMatchId) {
        const nextMatchObj = findMatch(currentMatch.nextMatchId);
        if (nextMatchObj) {
            const nextMatch = nextMatchObj.match;
            // Check if already added to avoid duplicates
            if (!nextMatch.participants.find(p => p.id === winnerParticipant.id)) {
                // Reset status for next match
                const nextParticipant = { ...winnerParticipant, isWinner: false, resultText: null, status: null };
                nextMatch.participants.push(nextParticipant);
            }
        }
    }

    // 3. Move Loser to Next Loser Match (if exists)
    if (currentMatch.nextLooserMatchId) {
        const nextLoserMatchObj = findMatch(currentMatch.nextLooserMatchId);
        if (nextLoserMatchObj) {
            const nextLoserMatch = nextLoserMatchObj.match;
             if (!nextLoserMatch.participants.find(p => p.id === loserParticipant.id)) {
                const nextLoserParticipant = { ...loserParticipant, isWinner: false, resultText: null, status: null };
                nextLoserMatch.participants.push(nextLoserParticipant);
            }
        }
    }

    await saveBracketData(newBracketData, `Updated match ${match.id}: ${winnerParticipant.name} won!`);
  };

  const renderMatch = (match) => {
    // Only show matches that are ready (have 2 participants) and not yet completed (no winner set)
    const isReady = match.participants.length === 2;
    const isCompleted = match.participants.some(p => p.isWinner);

    if (!isReady || isCompleted) return null;

    return (
      <div key={match.id} className={`bg-white p-4 rounded shadow mb-4 border ${match.isLive ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <span className="font-bold text-gray-500">Match #{match.id} (Round {match.tournamentRoundText})</span>
                {match.isLive && <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded animate-pulse">LIVE</span>}
            </div>
            <div className="flex gap-2">
                 {!match.isLive ? (
                    <button 
                        onClick={() => handleLive(match)}
                        className="text-xs bg-gray-800 hover:bg-black text-white px-3 py-1 rounded transition-colors"
                    >
                        Set Live
                    </button>
                 ) : (
                     <button 
                        onClick={() => handleEndLive()}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                    >
                        End Live
                    </button>
                 )}
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Team 1 */}
            <div className="flex-1 flex flex-col items-center p-4 bg-gray-50 rounded w-full">
                <span className="text-xl font-bold mb-2">{match.participants[0].name}</span>
                <button 
                    onClick={() => handleWinner(match, match.participants[0], match.participants[1])}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full"
                >
                    Select Winner
                </button>
            </div>

            <div className="text-gray-400 font-bold">VS</div>

            {/* Team 2 */}
            <div className="flex-1 flex flex-col items-center p-4 bg-gray-50 rounded w-full">
                <span className="text-xl font-bold mb-2">{match.participants[1].name}</span>
                <button 
                    onClick={() => handleWinner(match, match.participants[1], match.participants[0])}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full"
                >
                    Select Winner
                </button>
            </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center p-10">Loading tournament data...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!tournament || !tournament.bracket_data) return <div className="text-center p-10">No active tournament data found.</div>;

  const { upper, lower } = tournament.bracket_data;
  
  // Filter for active matches
  const activeUpperMatches = upper.filter(m => m.participants.length === 2 && !m.participants.some(p => p.isWinner));
  const activeLowerMatches = lower.filter(m => m.participants.length === 2 && !m.participants.some(p => p.isWinner));

  const hasActiveMatches = activeUpperMatches.length > 0 || activeLowerMatches.length > 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#70a939] mb-6">Active Matches</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
        </div>
      )}

      {!hasActiveMatches && (
          <div className="text-center text-gray-500 py-10 bg-gray-100 rounded">
              No active matches currently ready to be played.
          </div>
      )}

      {activeUpperMatches.length > 0 && (
          <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Upper Bracket</h3>
              <div className="grid gap-4">
                  {activeUpperMatches.map(renderMatch)}
              </div>
          </div>
      )}

      {activeLowerMatches.length > 0 && (
          <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Lower Bracket</h3>
              <div className="grid gap-4">
                  {activeLowerMatches.map(renderMatch)}
              </div>
          </div>
      )}
    </div>
  );
};

export default ActiveTournament;
