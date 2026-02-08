export class participantObject {
    constructor(id, resultText, isWinner, status, name) {
        this.id = id;
        this.resultText = resultText;
        this.isWinner = isWinner;
        this.status = status;
        this.name = name;
    }
}
export class matchObject {
    constructor(id, name, nextMatchId, nextLooserMatchId, tournamentRoundText, state, participants) {
        this.id = id;
        this.name = name;
        this.nextMatchId = nextMatchId;
        this.nextLooserMatchId = nextLooserMatchId;
        this.tournamentRoundText = tournamentRoundText;
        this.state = state;
        this.participants = participants;
    }
    addParticipant(participant) {
        this.participants.push(participant);
    }   
}

export class tournament{
    constructor(upper, lower) {
        this.upper = upper;
        this.lower = lower;
        this.matchIdCounter = 0;
    }
    gameSetup(teams) {
        const participants = [];
        for (let i = 0; i < teams.length; i++) {
            const participant = new participantObject(i, null, false, null, teams[i]);
            participants.push(participant);
        }
        
        // Initial Round 1 matches
        for (let i = 0; i < teams.length; i+=2) {
            const match = new matchObject();
            match.id = this.matchIdCounter++;
            match.nextMatchId = null;
            match.nextLooserMatchId = null;
            match.tournamentRoundText = '1';
            match.state = 'scheduled';
            match.participants = [];
            match.addParticipant(participants[i]);
            match.addParticipant(participants[i+1]);
            this.addMatch('upper', match);
        }
        
        const upperRounds = this.generateUpperBracket();
        this.generateLowerBracket(upperRounds);
        this.createGrandFinal();
    }
    
    generateUpperBracket() {
        // We need to track rounds for linking to lower bracket
        // Round 1 is already in this.upper, but we need to identify them
        // Assuming perfect power of 2 for now for simpler round tracking logic base
        
        let currentRoundMatches = [...this.upper];
        let roundIndex = 1;
        const rounds = [currentRoundMatches]; // Round 1
        
        // Loop through matches to generate subsequent rounds
        // Note: this.upper grows as we add matches, but we only want to process pairs from the "current round"
        
        let startIdx = 0;
        let endIdx = this.upper.length;
        
        while (endIdx - startIdx > 1) {
            roundIndex++;
            const newRoundMatches = [];
            
            for (let i = startIdx; i + 1 < endIdx; i += 2) {
                const nextMatchId = this.matchIdCounter++;
                
                // Link previous winners to this new match
                this.upper[i].nextMatchId = nextMatchId;
                this.upper[i+1].nextMatchId = nextMatchId;
                
                const match = new matchObject();
                match.id = nextMatchId;
                match.nextMatchId = null;
                match.nextLooserMatchId = null;
                match.tournamentRoundText = `${roundIndex}`;
                match.state = 'scheduled';
                match.participants = [];
                
                this.addMatch('upper', match);
                newRoundMatches.push(match);
            }
            
            rounds.push(newRoundMatches);
            startIdx = endIdx;
            endIdx = this.upper.length;
        }
        
        return rounds;
    }

    generateLowerBracket(upperRounds) {
        // For N teams (power of 2), Upper has log2(N) rounds.
        // Lower has 2 * (UpperRounds - 1) rounds.
        
        // Upper Round 1 losers -> Lower Round 1
        
        const upperRound1 = upperRounds[0];
        let lowerRoundMatches = [];
        
        // Lower Round 1: Create matches for losers of Upper Round 1
        // Each match in Lower Round 1 takes 2 losers from Upper Round 1
        for (let i = 0; i < upperRound1.length; i += 2) {
            const matchId = this.matchIdCounter++;
            const match = new matchObject();
            match.id = matchId;
            match.name = 'Lower R1';
            match.tournamentRoundText = '1';
            match.state = 'scheduled';
            match.participants = []; // Will be filled with losers dynamically
            match.nextMatchId = null;
            match.nextLooserMatchId = null; // Elimination
            
            // Link Upper Round 1 matches to this Lower match
            upperRound1[i].nextLooserMatchId = matchId;
            upperRound1[i+1].nextLooserMatchId = matchId;
            
            this.addMatch('lower', match);
            lowerRoundMatches.push(match);
        }
        
        let currentLowerRound = lowerRoundMatches;
        
        // Now iterate through subsequent upper rounds to feed into lower bracket
        // Upper Rounds index 0 is R1.
        // We processed R1 losers into Lower R1.
        
        // The structure of Lower Bracket rounds for 8 teams (3 Upper Rounds):
        // L1: 2 matches (from U1 losers)
        // L2: 2 matches (L1 winners vs U2 losers)
        // L3: 1 match (L2 winners)
        // L4: 1 match (L3 winner vs U3 loser) -> Final of Lower Bracket
        
        // General Pattern:
        // Round L(2k-1): Winners of previous Lower Round play each other.
        // Round L(2k): Winners of L(2k-1) play Losers of Upper Round (k+1).
        
        // We already did L1 (index 0).
        
        const totalUpperRounds = upperRounds.length;
        // Number of rounds in lower bracket (excluding grand final feeding)
        
        let upperRoundIndexForLosers = 1; // Start taking losers from Upper Round 2
        
        // We need to loop until we have 1 survivor from Lower Bracket
        
        while (this.lower.length > 0) { // Safety break, logic inside
            // Check if we just finished the lower bracket (1 match left and it has a next match linked later? No, we link as we go)
             if (currentLowerRound.length === 1 && upperRoundIndexForLosers >= totalUpperRounds) {
                 break;
             }
             
             const nextRoundMatches = [];
             
             // Determining type of next lower round
             // If we just had matches populated by Upper Losers (like L2, L4...), the next round is purely internal (L3, L5...)
             // Wait, standard pattern:
             // L1 (fed by U1) -> L2 (fed by L1 + U2) -> L3 (fed by L2) -> L4 (fed by L3 + U3) ...
             
             // Current state: we just created L1.
             // Next is L2: takes L1 winners AND U2 losers.
             
             // Step 1: Create matches for next round (half the number of current matches if purely internal, or same number if feeding?)
             // Actually:
             // L1 (N/4 matches) -> L2 (N/4 matches, L1 winners vs U2 losers)
             // L2 -> L3 (N/8 matches, L2 winners vs L2 winners)
             // L3 -> L4 (N/8 matches, L3 winners vs U3 losers)
             
             // Let's iterate.
             
             // We have currentLowerRound (L1).
             // Next is L2.
             
             // If we have losers to accept from Upper Bracket:
             // And we don't need to consolidate first
             
             let shouldFeedFromUpper = false;
             let upperLosersRound = null;
             
             if (upperRoundIndexForLosers < totalUpperRounds) {
                 upperLosersRound = upperRounds[upperRoundIndexForLosers];
                 // If counts match, we feed. If current lower has more, we consolidate.
                 if (currentLowerRound.length === upperLosersRound.length) {
                     shouldFeedFromUpper = true;
                 }
             }

             if (shouldFeedFromUpper) {
                 // Create Link Round (L2, L4...)
                 // Same number of matches as previous lower round
                 // Participants: 1 from Prev Lower Match, 1 from Upper Loser
                 
                 for (let i = 0; i < currentLowerRound.length; i++) {
                     const matchId = this.matchIdCounter++;
                     const match = new matchObject();
                     match.id = matchId;
                     match.name = `Lower R${this.lower.length + 1}`; // approximate naming
                     match.state = 'scheduled';
                     match.participants = [];
                     
                     // Link previous lower match
                     currentLowerRound[i].nextMatchId = matchId;
                     
                     // Link upper loser
                     if (upperLosersRound[i]) {
                        upperLosersRound[i].nextLooserMatchId = matchId;
                     }
                     
                     this.addMatch('lower', match);
                     nextRoundMatches.push(match);
                 }
                 
                 upperRoundIndexForLosers++;
             } else {
                 // Consolidation Round (L3, L5...)
                 // Halves the number of matches
                 // Participants: 2 from Prev Lower Matches
                 
                 for (let i = 0; i < currentLowerRound.length; i += 2) {
                     const matchId = this.matchIdCounter++;
                     const match = new matchObject();
                     match.id = matchId;
                     match.name = `Lower R${this.lower.length + 1}`;
                     match.state = 'scheduled';
                     match.participants = [];
                     
                     currentLowerRound[i].nextMatchId = matchId;
                     if(currentLowerRound[i+1]) currentLowerRound[i+1].nextMatchId = matchId;
                     
                     this.addMatch('lower', match);
                     nextRoundMatches.push(match);
                 }
             }
             
             currentLowerRound = nextRoundMatches;
        }
    }

    createGrandFinal() {
        const grandFinalId = this.matchIdCounter++;
        const grandFinal = new matchObject();
        grandFinal.id = grandFinalId;
        grandFinal.name = 'Grand Final';
        grandFinal.state = 'scheduled';
        grandFinal.participants = [];
        
        // Link Upper Bracket Winner
        const upperFinal = this.upper[this.upper.length - 1];
        upperFinal.nextMatchId = grandFinalId;
        
        // Link Lower Bracket Winner
        const lowerFinal = this.lower[this.lower.length - 1];
        if (lowerFinal) {
            lowerFinal.nextMatchId = grandFinalId;
        }
        
        // Add to upper bracket or separate? usually part of tournament structure
        // Let's add to upper for now or just push to upper as the final match
        this.addMatch('upper', grandFinal);
    }
    addMatch(bracket,match) { 
    if(bracket==='upper')this.upper.push(match);
    else if(bracket==='lower')this.lower.push(match);
    }
}



