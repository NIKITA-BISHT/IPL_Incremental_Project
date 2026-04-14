package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.repository.CricketerRepository;
import com.edutech.progressive.service.CricketerService;

@Service
public class CricketerServiceImplJpa implements CricketerService{
    List<Cricketer> cricketers = new ArrayList<>();

    private CricketerRepository cricketerRepository;
    
   public CricketerServiceImplJpa(CricketerRepository cricketerRepository) {
        this.cricketerRepository = cricketerRepository;
    }

   public List<Cricketer> getAllCricketers() throws SQLException{
    return cricketers;
   }

    public Integer addCricketer(Cricketer cricketer) throws SQLException{
        return -1;
    }

   public List<Cricketer> getAllCricketersSortedByExperience() throws SQLException{
    return cricketers;
   }

   
    public void updateCricketer(Cricketer cricketer) throws SQLException{

    }

    public void deleteCricketer(int cricketerId) throws SQLException{

    }

    public Cricketer getCricketerById(int cricketerId)throws SQLException {
        return null;
    }

    
    public List<Cricketer> getCricketersByTeam(int teamId) throws SQLException {
        return null;
    }
    
}