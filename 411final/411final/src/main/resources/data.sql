INSERT INTO ACCOUNT (email, password) VALUES
    ('ex1@email.com','exPass'),
    ('ex2@email.com','exPass'),
    ('ex3@email.com','exPass'),
    ('ex4@email.com','exPass');

INSERT INTO ARTICLE (title, text, articledate, positvity) VALUES
    ('test title', 'test text', '2020-02-02', 0.5);



INSERT INTO STOCK (ticker, marketCap, corporateName, volume, prices, tradedate) VALUES
    ('AAPL', 'something billion','Apple', 100.0, 55.55, '2020-02-02');

--DROP TABLE IF EXISTS STOCKGROUP;