package com.example.demo.repository;

import com.example.demo.entity.StockGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockGroupRepo extends JpaRepository<StockGroup, Long> {

    @Query(value = "SELECT * FROM SockGroups sg WHERE sg.account.email = :email",
    nativeQuery = true)
    List<StockGroup> findByAccountEmail(String email);
}
