package com.edutech.progressive.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.edutech.progressive.entity.Cricketer;

public interface CricketerRepository extends JpaRepository<Cricketer, Integer> {

    Cricketer findByCricketerId(int cricketerId);

    List<Cricketer> findByTeam_TeamId(int teamId);

    @Modifying
    @Transactional
    @Query("delete from Cricketer c where c.team.teamId = ?1")
    void deleteByTeamId(int teamId);
}