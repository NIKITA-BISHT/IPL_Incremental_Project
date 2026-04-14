package com.edutech.progressive.dao;

import java.sql.Statement;
import java.sql.Connection;
// import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Match;

public class MatchDAOImpl implements MatchDAO {
 Connection conn;
    
    public MatchDAOImpl() throws SQLException {
        this.conn = DatabaseConnectionManager.getConnection();
    }

    @Override
    public int addMatch(Match match) throws SQLException {
           String sql = "insert into matches (first_team_id,second_team_id,match_date,venue,result,status,winner_team_id) values(?,?,?,?,?,?,?)";
        int count = -1;
            PreparedStatement ps = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, match.getFirstTeamId());
            ps.setInt(2, match.getSecondTeamId());
            ps.setDate(3, new java.sql.Date(match.getMatchDate().getTime()));
            ps.setString(4, match.getVenue());
            ps.setString(5, match.getResult());
            ps.setString(6, match.getStatus());
            ps.setInt(7, match.getWinnerTeamId());
            count = ps.executeUpdate();
            if(count>0)
                {
               ResultSet rs = ps.getGeneratedKeys();
           if(rs.next())
           {
             match.setMatchId(rs.getInt(1));
             int key =rs.getInt(1);
             return key;
            }

            
        }
        return count;
}

    @Override
    public Match getMatchById(int matchId) throws SQLException{
         String sql = "Select * from matches where match_id=?";
        Match match = null;
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, matchId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                match = new Match(rs.getInt("match_id"), rs.getInt("first_team_id"),rs.getInt("second_team_id"), rs.getDate("match_date"), rs.getString("venue"), rs.getString("result"),
                        rs.getString("status"), rs.getInt("winner_team_id"));
            }
        return match;
    }

    @Override
    public void updateMatch(Match match) throws SQLException{
       String sql = "update matches set first_team_id=?, second_team_id=? , match_date=? ,venue=?,result=?,status=?,winner_team_id=? where match_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, match.getFirstTeamId());
            ps.setInt(2, match.getSecondTeamId());
            ps.setDate(3,  new java.sql.Date(match.getMatchDate().getTime()));
            ps.setString(4, match.getVenue());
            ps.setString(5, match.getResult());
            ps.setString(6, match.getStatus());
            ps.setInt(7, match.getWinnerTeamId());
            ps.setInt(8, match.getMatchId());
            ps.executeUpdate();
    }

    @Override
    public void deleteMatch(int matchId)throws SQLException {
         String sql = "delete from matches where match_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, matchId);
            ps.executeUpdate();

    }

    @Override
    public List<Match> getAllMatches()throws SQLException {
        List<Match> list = new ArrayList<>();
       String sql = "select * from matches";
          PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(new Match(rs.getInt("match_id"), rs.getInt("first_team_id"),rs.getInt("second_team_id"), rs.getDate("match_date"), rs.getString("venue"), rs.getString("result"),
                        rs.getString("status"), rs.getInt("winner_team_id")));
            }
       return list;
    }

}