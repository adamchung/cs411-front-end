DROP TABLE IF EXISTS ACCOUNT;
CREATE TABLE ACCOUNT (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(250),
    password    VARCHAR(250)
);



--DROP TABLE IF EXISTS ARTICLE;
CREATE TABLE ARTICLE (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(250),
    text        VARCHAR(250),
    articleDate DATE,
    positvity   FLOAT
);


--DROP TABLE IF EXISTS STOCK;
CREATE TABLE STOCK (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    ticker          VARCHAR(250),
    marketCap       VARCHAR(250),
    corporateName   VARCHAR(250),
    volume          FLOAT,
    prices          FLOAT,
    tradeDate       DATE
);



--DROP TABLE IF EXISTS STOCKGROUP;