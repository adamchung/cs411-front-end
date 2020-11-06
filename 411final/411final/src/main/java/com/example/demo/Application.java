package com.example.demo;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import java.text.SimpleDateFormat;
import java.util.Date;


@SpringBootApplication
@Slf4j
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}




	@Bean
	public CommandLineRunner commandLineRunner(AccountRepo accountRepo, ArticleRepo articleRepo, StockPriceRepo stockPriceRepo, StockInfoRepo stockInfoRepo, StockGroupRepo stockGroupRepo) {
		return args -> {
			log.info("Started some stuff.");

			//Initialize dummy accounts
			Account ac1 = new Account();
			ac1.setEmail("test1@email");
			ac1.setPassword("pass1");
			accountRepo.save(ac1);

			Account ac2 = new Account();
			ac2.setEmail("test2@email");
			ac2.setPassword("pass2");
			accountRepo.save(ac2);

			//Initialize dummy stock data
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

			//AAPL
			StockInfo si1 = new StockInfo();
			si1.setTicker("AAPL");
			si1.setCorporateName("Apple Inc");
			si1.setMarketCap(1.0);
			stockInfoRepo.save(si1);

			StockPrice sp1 = new StockPrice();
			sp1.setTicker("AAPL");
			sp1.setDate(formatter.parse("2020-11-05"));
			sp1.setOpen(117.95);
			sp1.setHigh(119.62);
			sp1.setLow(116.87);
			sp1.setClose(119.03);
			stockPriceRepo.save(sp1);

			StockPrice sp2 = new StockPrice();
			sp2.setTicker("AAPL");
			sp2.setDate(formatter.parse("2020-11-04"));
			sp2.setOpen(114.14);
			sp2.setHigh(115.59);
			sp2.setLow(112.35);
			sp2.setClose(114.95);
			stockPriceRepo.save(sp2);

			StockPrice sp3 = new StockPrice();
			sp3.setTicker("AAPL");
			sp3.setDate(formatter.parse("2020-11-03"));
			sp3.setOpen(109.66);
			sp3.setHigh(111.49);
			sp3.setLow(108.73);
			sp3.setClose(110.44);
			stockPriceRepo.save(sp3);

			//GOOG
			StockInfo si2 = new StockInfo();
			si2.setTicker("GOOG");
			si2.setCorporateName("gOOgle");
			si2.setMarketCap(2.0);
			stockInfoRepo.save(si2);

      StockPrice sp4 = new StockPrice();
      sp4.setTicker("GOOG");
      sp4.setDate(formatter.parse("2020-11-05"));
      sp4.setOpen(1147.95);
      sp4.setHigh(1219.62);
      sp4.setLow(1136.87);
      sp4.setClose(1419.03);
			stockPriceRepo.save(sp4);

      StockPrice sp5 = new StockPrice();
      sp5.setTicker("GOOG");
      sp5.setDate(formatter.parse("2020-11-04"));
      sp5.setOpen(1114.14);
      sp5.setHigh(1215.59);
      sp5.setLow(1142.35);
      sp5.setClose(1414.95);
			stockPriceRepo.save(sp5);

      StockPrice sp6 = new StockPrice();
      sp6.setTicker("GOOG");
      sp6.setDate(formatter.parse("2020-11-03"));
      sp6.setOpen(1019.66);
      sp6.setHigh(1111.49);
      sp6.setLow(1018.73);
      sp6.setClose(1110.44);
			stockPriceRepo.save(sp6);

			//MSFT
			StockInfo si3 = new StockInfo();
			si3.setTicker("MSFT");
			si3.setCorporateName("microSOFT");
			si3.setMarketCap(2.0);
			stockInfoRepo.save(si3);

      StockPrice sp7 = new StockPrice();
      sp7.setTicker("MSFT");
      sp7.setDate(formatter.parse("2020-11-05"));
      sp7.setOpen(11147.95);
      sp7.setHigh(12129.62);
      sp7.setLow(11336.87);
      sp7.setClose(14419.03);
			stockPriceRepo.save(sp7);

      StockPrice sp8 = new StockPrice();
      sp8.setTicker("MSFT");
      sp8.setDate(formatter.parse("2020-11-04"));
      sp8.setOpen(11154.14);
      sp8.setHigh(12615.59);
      sp8.setLow(17142.35);
      sp8.setClose(14184.95);
			stockPriceRepo.save(sp8);

      StockPrice sp9 = new StockPrice();
      sp9.setTicker("MSFT");
      sp9.setDate(formatter.parse("2020-11-03"));
      sp9.setOpen(10199.66);
      sp9.setHigh(11111.49);
      sp9.setLow(10128.73);
      sp9.setClose(13110.44);
			stockPriceRepo.save(sp9);



			//Initialize dummy article data
/*
			//AAPL
			Article ar1 = new Article();
			ar1.setTitle("AAPL and the Rollout of the iPhone 12 and 5G");
			ar1.setArticleDate(formatter.parse("2020-10-21"));
			StringBuilder sb = new StringBuilder();
			File f = new File("D:\\Classes\\CS411\\cs411-front-end\\411final\\411final\\src\\main\\java\\com\\example\\demo\\dummy_data\\a1_text");
			Scanner sc = new Scanner(f);
			while (sc.hasNextLine()){
				sb.append(sc.nextLine());
			}
			ar1.setText(sb.toString());
			ar1.setPositivity(0f);
			articleRepo.save(ar1);
			sc.close();

			Article ar2 = new Article();
			ar2.setTitle("Apple iPhone 12 first-day preorders reportedly more than doubled those of the iPhone 11, buoyed by interest in the iPhone 12 Pro");
			ar2.setArticleDate(formatter.parse("2020-10-19"));
			sb = new StringBuilder();
			f = new File("D:\\Classes\\CS411\\cs411-front-end\\411final\\411final\\src\\main\\java\\com\\example\\demo\\dummy_data\\a2_text");
			sc = new Scanner(f);
			while (sc.hasNextLine()){
				sb.append(sc.nextLine());
			}
			ar2.setText(sb.toString());
			ar2.setPositivity(1f);
			articleRepo.save(ar2);
			sc.close();
*/

			//Initialize dummy portfolios (stock groups)
			StockGroup sg1 = new StockGroup();
			sg1.setAccount(ac1);
			List<StockInfo> ssi1 = new ArrayList<StockInfo>();
			ssi1.add(si1);
			ssi1.add(si2);
			sg1.setOpenStockInfos(ssi1);
			stockGroupRepo.save(sg1);
/*
			StockGroup sg2 = new StockGroup();
			sg2.setAccount(ac1);
			List<StockInfo> ssi2 = new ArrayList<StockInfo>();
			ssi2.add(si1);
			ssi2.add(si3);
			sg2.setOpenStockInfos(ssi2);
			stockGroupRepo.save(sg2);
*/
      /*
			StockGroup sg3 = new StockGroup();
      sg3.setAccount(ac2);
			List<StockInfo> ssi3 = new ArrayList<StockInfo>();
			ssi3.add(si3);
			ssi3.add(si2);
      sg3.setOpenStockInfos(ssi3);
			stockGroupRepo.save(sg3);
*/

			log.info("Finished some stuff.");

		};
	}

}
