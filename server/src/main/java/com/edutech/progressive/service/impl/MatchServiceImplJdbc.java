package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.MatchDAO;
import com.edutech.progressive.entity.Match;
import com.edutech.progressive.service.MatchService;

public class MatchServiceImplJdbc implements MatchService {

    private final MatchDAO matchDAO;

    public MatchServiceImplJdbc(MatchDAO matchDAO) {
        this.matchDAO = matchDAO;
    }

    @Override
    public List<Match> getAllMatches() {
        return new ArrayList<>();
    }

    @Override
    public Match getMatchById(int matchId) {
        return null;
    }

    @Override
    public Integer addMatch(Match match) {
        return -1;
    }

    @Override
    public void updateMatch(Match match) {
    }

    @Override
    public void deleteMatch(int matchId) {
    }
}