package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Match;
import com.edutech.progressive.repository.MatchRepository;
import com.edutech.progressive.service.MatchService;

@Service
public class MatchServiceImplJpa implements MatchService {
    List<Match> matches = new ArrayList<>();
    private MatchRepository matchRepository;
    
    
    public MatchServiceImplJpa(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Match> getAllMatches()throws SQLException{
        return matches;
    }

    public Match getMatchById(int matchId)throws SQLException{
        return null;
    }

    public Integer addMatch(Match match)throws SQLException{
        return -1;
    }

    public void updateMatch(Match match)throws SQLException{
        
    }

    public void deleteMatch(int matchId)throws SQLException{

    }

    public List<Match> getAllMatchesByStatus(String status) throws SQLException{
        return null;
    }
}