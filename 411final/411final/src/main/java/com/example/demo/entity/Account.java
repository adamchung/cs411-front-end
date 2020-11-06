package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity                 // defines this object as an Entity. Entities are special objects that are represented in tables
@AllArgsConstructor     // automatically creates an all argument constructor
@NoArgsConstructor
@Data               // creates getters and setters for all variables
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public String email;
    public String password;

    @OneToOne(optional = true)
    @JoinColumn(name="stockGroupId", referencedColumnName = "id")
    public StockGroup stockGroup;

}
