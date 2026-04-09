package com.edutech.progressive.dao;

import com.edutech.progressive.entity.Match;

import java.util.List;

public interface MatchDAO {
    int addMatch(Match match);
    Match getMatchById(int matchId);
    void updateMatch(Match match);
    void deleteMatch(int matchId);
    List<Match> getAllMatches();
}