package com.example.demo.repository;

import com.example.demo.entity.StockPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockPriceRepo extends JpaRepository<StockPrice, Long> {
    @Query(name =   "SELECT * " +
                    "FROM StockPice sp " +
                    "WHERE sp.ticker = :ticker",
            nativeQuery = true)
    List<StockPrice> findByTicker(String ticker);
    List<StockPrice> findByTickerAndDate(String ticker, Date tradeDate);
}
