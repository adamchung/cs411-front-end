package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockInfo {
    @Id
    public String ticker;
    @Column(name="marketCap")
    public Double marketCap;
    @Column(name="corporateName")
    public String corporateName;
}
