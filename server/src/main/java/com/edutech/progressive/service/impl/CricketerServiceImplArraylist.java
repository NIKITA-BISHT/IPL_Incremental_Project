package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.service.CricketerService;

@Service
public class CricketerServiceImplArraylist implements CricketerService {

    List<Cricketer> cricketers = new ArrayList<>();
    @Override
    public List<Cricketer> getAllCricketers() {
        
        return cricketers;

    }

    @Override
    public Integer addCricketer(Cricketer cricketer) {
       cricketers.add(cricketer);
       return cricketers.size();
    }

    public Comparator<Cricketer> cricketerComparator = new Comparator<Cricketer>() {

        @Override
        public int compare(Cricketer arg0, Cricketer arg1) {
            return Integer.compare(arg0.getExperience(), arg1.getExperience());
        }
          
    };

    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() {
        Collections.sort(cricketers, cricketerComparator);
        return cricketers;
       
    }

}