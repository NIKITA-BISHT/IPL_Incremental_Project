package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import com.edutech.progressive.entity.Team;
import com.edutech.progressive.service.TeamService;

public class TeamServiceImplArraylist implements TeamService {
 
    private List<Team> lt = new ArrayList<>();

    @Override
    public List<Team> getAllTeams() {
        return lt;
    }

    @Override
    public int addTeam(Team team) {
        lt.add(team);
        return lt.size();
    }

    @Override
    public List<Team> getAllTeamsSortedByName() {
        List<Team> sortedTeams = new ArrayList<>(lt);
        sortedTeams.sort(Comparator.comparing(Team::getTeamName));
        return sortedTeams;
    }

    @Override
    public void emptyArrayList() {
        lt.clear();
        TeamService.super.emptyArrayList();
    }
}
