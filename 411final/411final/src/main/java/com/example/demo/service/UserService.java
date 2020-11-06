package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private AccountRepo accountRepo;

    public List<Account> getAllUsers() {
        return accountRepo.findAll();
    }


}
