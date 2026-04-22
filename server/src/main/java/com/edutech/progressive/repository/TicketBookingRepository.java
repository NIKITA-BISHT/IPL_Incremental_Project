package com.edutech.progressive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.edutech.progressive.entity.TicketBooking;

public interface TicketBookingRepository extends JpaRepository<TicketBooking, Integer> {

    List<TicketBooking> findByEmail(String email);
    
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM ticket_booking WHERE match_id IN (SELECT match_id FROM matches WHERE first_team_id = ?1 OR second_team_id = ?1)", nativeQuery = true)
    void deleteByTeamId(int teamId);

    @Modifying
    @Transactional
    @Query("DELETE FROM TicketBooking tb WHERE tb.match.matchId = ?1")
    void deleteByMatchId(int matchId);
}