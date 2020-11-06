package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    public String ticker;
    @Column(name="tradeDate")
    public Date date;
    public Double volume;
    public Double low;
    public Double high;
    public Double open;
    public Double close;
}
