package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class GeneralController {

    final Logger log = LoggerFactory.getLogger(GeneralController.class);
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    StockInfoRepo stockInfoRepo;
    @Autowired
    StockPriceRepo stockPriceRepo;
    @Autowired
    StockGroupRepo stockGroupRepo;
    @Autowired
    ArticleRepo articleRepo;


    /**
     *
     */


    @PostMapping("/account")
    Account createAccount(@RequestBody Account newAccount) {
        return accountRepo.save(newAccount);
    }

    @PutMapping("/account/{id}")
    Account replaceAccount(@RequestBody Account newAccount, @PathVariable Long id) {
        return accountRepo.findById(id)
                .map(account -> {
                    account.setPassword(newAccount.getPassword());
                    account.setEmail(newAccount.getEmail());
                    return accountRepo.save(account);
                })
                .orElseGet(() -> {
                    newAccount.setId(id);
                    return accountRepo.save(newAccount);
                });
    }

    @RequestMapping("/account")
    @ResponseBody
    public List<Account> account(@RequestParam(required=false) String email) {
        log.info("account");
        log.info(email);
        if (email == null || email == "") {

            log.info("returning all accounts");

            return accountRepo.findAll();
        }
        return accountRepo.findByEmail(email);
    }

    @DeleteMapping("/account/{id}")
    void deleteAccount(@PathVariable Long id) {
        accountRepo.deleteById(id);
    }


    /**
     *
     */

    @PostMapping("/article")
    Article newArticle(@RequestBody Article newArticle) {
        return articleRepo.save(newArticle);
    }

    @RequestMapping("/article")
    @ResponseBody
    public List<Article> article(@RequestParam(required=false) String title) {
        log.info("article");
        log.info(title);
        if (title == null || title == "") {

            log.info("returning all articles");

            return articleRepo.findAll();
        }
        return articleRepo.findByTitle(title);
    }

    @PutMapping("/article/{id}")
    Article replaceArticle(@RequestBody Article newArticle, @PathVariable Long id) {
        return articleRepo.findById(id)
                .map(employee -> {
                    employee.setTitle(newArticle.getTitle());
                    employee.setText(newArticle.getText());
                    employee.setArticleDate(newArticle.getArticleDate());
                    employee.setPositivity(newArticle.getPositivity());
                    return articleRepo.save(employee);
                })
                .orElseGet(() -> {
                    newArticle.setId(id);
                    return articleRepo.save(newArticle);
                });
    }

    @DeleteMapping("/article/{id}")
    void deleteArticle(@PathVariable Long id) {
        articleRepo.deleteById(id);
    }


    /**
     *
     */


    @PostMapping("/stockprice")
    StockPrice newStockPrice(@RequestBody StockPrice newStockPrice) {
        return stockPriceRepo.save(newStockPrice);
    }

    @RequestMapping("/stockprice/{ticker}")
    @ResponseBody
    public List<StockPrice> stockPrice(@PathVariable("ticker") String ticker) throws IOException {
        log.info("stock");
        log.info(ticker);
        if (ticker == null || ticker == "") {
            log.info("returning all stocks");
            return stockPriceRepo.findAll();
        }
        List<StockPrice> ret = stockPriceRepo.findByTicker(ticker);
        return ret;
    }

    @RequestMapping("/stockprice-date/{date}")
    @ResponseBody
    public List<StockPrice> stockPriceByDate(@PathVariable("date") String date) throws IOException {
      log.info("stock by date");
      log.info(date);
      if (date == null || date == "") {
        log.info("returning all stocks");
        return stockPriceRepo.findAll();
      }
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
      List<StockPrice> ret;
      try {
        ret = stockPriceRepo.findByDate(formatter.parse(date));
      } catch (ParseException e){
        ret = stockPriceRepo.findAll();
      }
      return ret;
    }

    @PutMapping("/stockprice/{id}")
    StockPrice replaceStockPrice(@RequestBody StockPrice newStockPrice, @PathVariable Long id) {
        return stockPriceRepo.findById(id)
                .map(stockPrice -> {
                    stockPrice.setTicker(newStockPrice.getTicker());
                    stockPrice.setClose(newStockPrice.getClose());
                    stockPrice.setDate(newStockPrice.getDate());
                    stockPrice.setHigh(newStockPrice.getHigh());
                    stockPrice.setLow(newStockPrice.getLow());
                    stockPrice.setOpen(newStockPrice.getOpen());
                    stockPrice.setVolume(newStockPrice.getVolume());
                    return stockPriceRepo.save(stockPrice);
                })
                .orElseGet(() -> {
                    return stockPriceRepo.save(newStockPrice);
                });
    }

    @DeleteMapping("/stock/{id}")
    void deleteStockPrice(@PathVariable Long id) {
        stockPriceRepo.deleteById(id);
    }

  @GetMapping("/deleteStock")
  void deleteStockInfo(@RequestParam Long id, @RequestParam String ticker) {
    Optional<StockGroup> osg = stockGroupRepo.findById(id);
    if(osg.isPresent()){
      StockGroup sg = osg.get();
      List<StockInfo> l = sg.getOpenStockInfos();
      for (StockInfo s : l) {
        String t = s.getTicker();
        if (t.equals(ticker)){
          l.remove(s);
          sg.setOpenStockInfos(l);
          stockGroupRepo.delete(sg);
          stockGroupRepo.save(sg);
          break;
        }
      }
    }
  }

    /**
     *
     */


    @RequestMapping("/stockGroup")
    @ResponseBody
    public List<StockGroup> stockGroup(@RequestParam(required=false) String email) {
        log.info("stockGroup");
        log.info(email);
        if (email == null || email == "") {

            log.info("returning all users");

            return stockGroupRepo.findAll();
        }
        return stockGroupRepo.findByAccountEmail(email);
    }

    @DeleteMapping("/stockGroup/{id}")
    void deleteStockGroup(@PathVariable Long id) {
        stockGroupRepo.deleteById(id);
    }


  @GetMapping("/addToStockGroup/{id}")
  void addStockInfoToStockGroup(@PathVariable Long id, @RequestParam String ticker) {
    log.info("add stock info to stock group");

    StockInfo si = stockInfoRepo.findByTicker(ticker);
    Optional<StockGroup> sg = stockGroupRepo.findById(id);
    if(si != null && sg.isPresent()){
      List<StockInfo> l = sg.get().getOpenStockInfos();
      l.add(si);
      sg.get().setOpenStockInfos(l);
      stockGroupRepo.save(sg.get());
      log.info("stock group updated");
    }
  }

  @GetMapping("/updateCorporateName/{ticker}")
  void updateCorporateName(@PathVariable String ticker, @RequestParam String name) {
    log.info("update corporate name");

    StockInfo si = stockInfoRepo.findByTicker(ticker);
    if(si != null){
      si.setCorporateName(name);
      stockInfoRepo.save(si);
      log.info("updated name");
    }
  }

//  @GetMapping("/queryDate/{date}")
//  void updateCorporateName(@PathVariable String date) {
//    log.info("update corporate name");
//
//    StockInfo si = stockInfoRepo.findByTicker(ticker);
//    if(si != null){
//      si.setCorporateName(name);
//      stockInfoRepo.save(si);
//      log.info("updated name");
//    }
//  }


    /**
     *
     */


    @RequestMapping("/validate")
    @ResponseBody
    public Boolean validate(@RequestParam(name="email",required=true) String email, @RequestParam(name="password",required=true) String password) {

        Account user = accountRepo.findByEmailAndPassword(email, password);

        if (user == null) {
            return false;
        }
        return true;
    }

}
