package com.edutech.progressive.dao;

import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Match;

public class MatchDAOImpl implements MatchDAO {
    List<Match> matchList = new ArrayList<>();

    @Override
    public int addMatch(Match match) {
        matchList.add(match);
        return -1;
    }

    @Override
    public Match getMatchById(int matchId) {
        Match m = matchList.get(matchId);
        if(matchList.contains(m)){
            return m;
        }
        return null;
    }

    @Override
    public void updateMatch(Match match) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateMatch'");
    }

    @Override
    public void deleteMatch(int matchId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteMatch'");
    }

    @Override
    public List<Match> getAllMatches() {
       return matchList;
    }

}
