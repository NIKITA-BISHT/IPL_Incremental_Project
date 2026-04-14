package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Match;
import com.edutech.progressive.repository.MatchRepository;

@Service
public class MatchServiceImplJpa {

    @Autowired
    MatchRepository matchRepository;

    public List<Match> getAllMatches() throws SQLException {
        return new ArrayList<>();
    }

    public Match getMatchById(int matchId) throws SQLException {
        return null;
    }

    public int addMatch(Match match) throws SQLException {
        return -1;
    }

    public void updateMatch(Match match) throws SQLException {
    }

    public void deleteMatch(int matchId) throws SQLException {
    }

    public List<Match> getAllMatchesByStatus(String status) throws SQLException {
        return null;
    }
}