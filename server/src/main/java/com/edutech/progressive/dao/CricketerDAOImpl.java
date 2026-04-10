package com.edutech.progressive.dao;

import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Cricketer;

public class CricketerDAOImpl implements CricketerDAO {
    List<Cricketer> list = new ArrayList<>();

    @Override
    public int addCricketer(Cricketer cricketer) {
        list.add(cricketer);
        return -1;
    }

    @Override
    public Cricketer getCricketerById(int cricketerId) {
        Cricketer c = list.get(cricketerId);
        if(list.contains(c)){
            return c;
        }
        return null;
    }

    @Override
    public void updateCricketer(Cricketer cricketer) {
        
    }

    @Override
    public void deleteCricketer(int cricketerId) {
       
    }

    @Override
    public List<Cricketer> getAllCricketers() {
        return list;
    }

}
