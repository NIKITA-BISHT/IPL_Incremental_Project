package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.MatchDAO;
import com.edutech.progressive.entity.Match;
import com.edutech.progressive.service.MatchService;

@Service
public class MatchServiceImplJdbc implements MatchService {

   
    public MatchServiceImplJdbc() {
   }

    MatchDAO matchDAO;
    
    public MatchServiceImplJdbc(MatchDAO matchDAO) {
      this.matchDAO = matchDAO;
   }

    @Override
    public Integer addMatch(Match match) throws SQLException {
       return matchDAO.addMatch(match);
    }

    @Override
    public Match getMatchById(int matchId) throws SQLException{
       return matchDAO.getMatchById(matchId);
    }

    @Override
    public void updateMatch(Match match)throws SQLException {
       matchDAO.updateMatch(match);
    }

    @Override
    public void deleteMatch(int matchId)throws SQLException {
       matchDAO.deleteMatch(matchId);
    }

    @Override
    public List<Match> getAllMatches() throws SQLException{
       return  matchDAO.getAllMatches();
    }
    


}