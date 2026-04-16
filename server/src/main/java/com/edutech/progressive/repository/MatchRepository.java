package com.edutech.progressive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.progressive.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Integer> {
}
