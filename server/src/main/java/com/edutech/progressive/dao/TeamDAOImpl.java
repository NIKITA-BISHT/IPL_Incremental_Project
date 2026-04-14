package com.edutech.progressive.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Team;

public class TeamDAOImpl implements TeamDAO  {

     Connection conn;
    
    public TeamDAOImpl() throws SQLException {
        this.conn = DatabaseConnectionManager.getConnection();
    }
    @Override
    public int addTeam(Team team) throws SQLException {
        String sql = "insert into team (team_name,location,owner_name,establishment_year) values(?,?,?,?)";
        int count = -1;
            PreparedStatement ps = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, team.getTeamName());
            ps.setString(2, team.getLocation());
            ps.setString(3,  team.getOwnerName());
            ps.setInt(4, team.getEstablishmentYear());
            count = ps.executeUpdate();
              if(count>0)
                {
               ResultSet rs = ps.getGeneratedKeys();
           if(rs.next())
           {
             team.setTeamId(rs.getInt(1));
             return rs.getInt(1);

            }
        }
        return count;
    }

    @Override
    public Team getTeamById(int teamId) throws SQLException {
         String sql = "Select * from team where team_id=?";
        Team team = null;
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, teamId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                team = new Team(rs.getInt("team_id"), rs.getString("team_name"), rs.getString("location"),
                        rs.getString("owner_name"), rs.getInt("establishment_year"));
            }
        return team;
    }

    @Override
    public void updateTeam(Team team) throws SQLException {
         String sql = "update team set team_name=?,location=?,owner_name=?,establishment_year=? where team_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            // ps.setInt(1, team.getTeamId());
            ps.setString(1, team.getTeamName());
            ps.setString(2, team.getLocation());
            ps.setString(3, team.getOwnerName());
            ps.setInt(4, team.getEstablishmentYear());
            ps.setInt(5, team.getTeamId());
            ps.executeUpdate();
    }

    @Override
    public void deleteTeam(int teamId) throws SQLException {
          String sql = "delete from team where team_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, teamId);
            ps.executeUpdate();
    }

    @Override
    public List<Team> getAllTeams() throws SQLException{
          List<Team> list = new ArrayList<>();
       String sql = "select * from team";
          PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(new Team(rs.getInt("team_id"),  rs.getString("team_name"), rs.getString("location"),
                        rs.getString("owner_name"), rs.getInt("establishment_year")));
            }
       return list;
    }



}