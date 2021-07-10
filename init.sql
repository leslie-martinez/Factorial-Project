CREATE TABLE metrics (ID SERIAL PRIMARY KEY,
                                        NAME VARCHAR(255) NOT NULL,
                                                          VALUE NUMERIC NOT NULL,
                                                                        DATETIME TIMESTAMP NOT NULL DEFAULT NOW());


INSERT INTO metrics (NAME, VALUE)
VALUES ('J.K. Rowling',
        46);