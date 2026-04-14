package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.CricketerDAO;
import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.service.CricketerService;

@Service
public class CricketerServiceImplJdbc implements CricketerService  {

    public CricketerServiceImplJdbc() {
    }
    CricketerDAO cricketerDAO;
    
    public CricketerServiceImplJdbc(CricketerDAO cricketerDAO) {
        this.cricketerDAO = cricketerDAO;
    }

    @Override
    public List<Cricketer> getAllCricketers() throws SQLException {
        return cricketerDAO.getAllCricketers();
    }

    @Override
    public Integer addCricketer(Cricketer cricketer) throws SQLException{
        return cricketerDAO.addCricketer(cricketer);
    }
     public Comparator<Cricketer> cricketerComparator = new Comparator<Cricketer>() {

        @Override
        public int compare(Cricketer arg0, Cricketer arg1) {
            return Integer.compare(arg0.getExperience(), arg1.getExperience());
        }
          
    };
    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() throws SQLException{
        List<Cricketer> c=cricketerDAO.getAllCricketers();
        Collections.sort(c, cricketerComparator);
        return c;

    }
    public void updateCricketer(Cricketer cricketer) throws SQLException
    {
       cricketerDAO.updateCricketer(cricketer);
    }
    public void deleteCricketer(int cricketerId) throws SQLException
    {
        cricketerDAO.deleteCricketer(cricketerId);
    }
    public Cricketer getCricketerById(int cricketerId)throws SQLException
    {
        return cricketerDAO.getCricketerById(cricketerId) ;
    }

}