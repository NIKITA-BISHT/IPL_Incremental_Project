package com.edutech.progressive.service.impl;

import com.edutech.progressive.dao.CricketerDAO;
import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.service.CricketerService;
import java.util.Collections;
import java.util.List;

public class CricketerServiceImplJdbc implements CricketerService {
    private CricketerDAO cricketerDAO;

    public CricketerServiceImplJdbc(CricketerDAO cricketerDAO) {
        this.cricketerDAO = cricketerDAO;
    }

    @Override
    public List<Cricketer> getAllCricketers() {
        return cricketerDAO.getAllCricketers();
    }

    @Override
    public Integer addCricketer(Cricketer cricketer) {
        cricketerDAO.addCricketer(cricketer);
        return getAllCricketers().size();
    }

    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() {
        List<Cricketer> list = cricketerDAO.getAllCricketers();
        Collections.sort(list);
        return list;
    }

    @Override
    public void updateCricketer(Cricketer cricketer) {
        cricketerDAO.updateCricketer(cricketer);
    }

    @Override
    public void deleteCricketer(int cricketerId) {
        cricketerDAO.deleteCricketer(cricketerId);
    }

    @Override
    public Cricketer getCricketerById(int cricketerId) {
        return cricketerDAO.getCricketerById(cricketerId);
    }

}