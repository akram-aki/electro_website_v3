import { useState, useEffect } from 'react';
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import useWindowSize from "../hooks/useWindowSize";
import PropTypes from 'prop-types';

const Rumble2025 = ({ type = 'double' }) => {
  const [width, height] = useWindowSize();
  const [bracketData, setBracketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tournamentName, setTournamentName] = useState("Tournament Bracket");
  const [activeMatch, setActiveMatch] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await fetch('/api/tournaments');
        const json = await res.json();
        if (res.ok && json.data && json.data.length > 0) {
          // Find first tournament with bracket_data
          const activeTournament = json.data.find(t => t.bracket_data);
          if (activeTournament) {
            setBracketData(activeTournament.bracket_data);
            setTournamentName(activeTournament.title);
            
            // Find active match
            const upperLive = activeTournament.bracket_data.upper.find(m => m.isLive);
            const lowerLive = activeTournament.bracket_data.lower.find(m => m.isLive);
            setActiveMatch(upperLive || lowerLive || null);
          }
        }
      } catch (e) {
        console.error("Failed to fetch tournament", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();

    // Poll every 10 seconds for live updates
    const interval = setInterval(fetchTournament, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#272936] flex flex-col min-h-screen items-center justify-center text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#70a939]"></div>
        <div className="mt-4 text-xl font-bold text-[#70a939]">Loading Tournament...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#1a1c23] overflow-hidden">
      {/* Absolute Positioned Title */}
      <div className="absolute top-6 left-0 right-0 z-10 pointer-events-none flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black text-white text-center uppercase tracking-wider drop-shadow-lg bg-[#1a1c23]/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          {tournamentName}
        </h1>
        {activeMatch && (
            <div className="mt-2 flex items-center gap-2 bg-red-600/90 text-white px-4 py-1 rounded-full animate-pulse shadow-lg backdrop-blur-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                <span className="font-bold tracking-wide uppercase text-sm md:text-base">
                    Active Match: {activeMatch.participants[0]?.name || 'TBD'} vs {activeMatch.participants[1]?.name || 'TBD'}
                </span>
            </div>
        )}
      </div>

      {/* Full Screen Bracket Container */}
      <div className="w-full h-full flex items-center justify-center">
        {!bracketData ? (
           <div className="flex flex-col items-center gap-6 p-12 text-center z-20">
             <div className="text-6xl text-gray-600">🏆</div>
             <h2 className="text-3xl text-white font-bold">No Active Tournament</h2>
             <p className="text-gray-400 text-lg max-w-md">
               There is currently no active tournament to display. Please check back later for updates!
             </p>
           </div>
        ) : (
          type === 'single' ? (
            <SingleEliminationBracket
              matchComponent={Match}
              matches={bracketData}
              svgWrapper={({ children, ...props }) => (
                <SVGViewer
                  width={width}
                  height={height}
                  {...props}
                  SVGBackground="rgb(26, 28, 35)"
                  background="rgb(26, 28, 35)"
                >
                  {children}
                </SVGViewer>
              )}
            />
          ) : (
            <DoubleEliminationBracket
              matches={bracketData}
              matchComponent={Match}
              svgWrapper={({ children, ...props }) => (
                <SVGViewer
                  width={width}
                  height={height}
                  {...props}
                  SVGBackground="rgb(26, 28, 35)"
                  background="rgb(26, 28, 35)"
                >
                  {children}
                </SVGViewer>
              )}
            />
          )
        )}
      </div>
    </div>
  );
};

Rumble2025.propTypes = {
  type: PropTypes.string,
};

export default Rumble2025;
