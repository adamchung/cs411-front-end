package com.example.demo.repository;

import com.example.demo.entity.StockInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockInfoRepo extends JpaRepository<StockInfo, Long> {
    List<StockInfo> findByTicker(String ticker);
}
