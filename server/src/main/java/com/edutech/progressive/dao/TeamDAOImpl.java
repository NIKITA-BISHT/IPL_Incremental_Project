package com.edutech.progressive.dao;

import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Team;

public class TeamDAOImpl implements TeamDAO {
    List<Team> teamList = new ArrayList<>();

    @Override
    public int addTeam(Team team) {
        teamList.add(team);
        return -1;
        
    }

    @Override
    public Team getTeamById(int teamId) {
        Team t = teamList.get(teamId);
        if(teamList.contains(t)){
            return t;
        }
        return null;
    }

    @Override
    public void updateTeam(Team team) {
        
    }

    @Override
    public void deleteTeam(int teamId) {
        
    }

    @Override
    public List<Team> getAllTeams() {
       return teamList;
    }



}
