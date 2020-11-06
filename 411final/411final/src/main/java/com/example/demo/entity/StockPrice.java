package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockPrice {
    @Id
    public String ticker;
    public Double volume;
    public Double low;
    public Double high;
    public Double open;
    public Double close;
    @Column(name="tradeDate")
    public Date date;
}
