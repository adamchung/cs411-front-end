package com.example.demo.repository;

import com.example.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long> {

    @Query(value ="SELECT * FROM ACCOUNT",nativeQuery = true)
    List<Account> findAll();

    List<Account> findByEmail(String email);
    Account findByEmailAndPassword(String email, String password);
}
