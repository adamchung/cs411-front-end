package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;



@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    public List<StockInfo> openStockInfos;

    @OneToMany
    public List<Article> openArticles;

    @OneToOne(mappedBy = "stockGroup")
    public Account account;
}
