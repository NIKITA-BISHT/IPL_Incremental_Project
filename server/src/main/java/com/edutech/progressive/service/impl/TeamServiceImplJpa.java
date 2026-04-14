package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import com.edutech.progressive.entity.Team;
import com.edutech.progressive.repository.TeamRepository;
import com.edutech.progressive.service.TeamService;
@Service
public class TeamServiceImplJpa implements TeamService {
    private TeamRepository teamRepository;
    public TeamServiceImplJpa(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }
    public List<Team> getAllTeams()throws SQLException{
        return teamRepository.findAll();
    }
    public int addTeam(Team team)throws SQLException{
        Team addedTeam =  teamRepository.save(team);;
        return addedTeam.getTeamId();
    }
    public List<Team> getAllTeamsSortedByName()throws SQLException{
        List<Team> things = new ArrayList<>(teamRepository.findAll());
        Collections.sort(things);
        return things;
    }
    public Team getTeamById(int teamId) throws SQLException{
        return teamRepository.findByTeamId(teamId);
    }
    public void updateTeam(Team team, int teamId) throws SQLException{
        Team existingTeam = teamRepository.findById(teamId).orElse(null);
        if(existingTeam!=null){
            existingTeam.setTeamId(team.getTeamId());
            existingTeam.setTeamName(team.getTeamName());
            existingTeam.setLocation(team.getLocation());
            existingTeam.setEstablishmentYear(team.getEstablishmentYear());
            existingTeam.setOwnerName(team.getOwnerName());
            teamRepository.save(existingTeam);
        }
    }
    public void deleteTeam(int teamId)throws SQLException {
        teamRepository.deleteById(teamId);
    }

}