-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS listings;
CREATE TABLE listings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR ,
    content VARCHAR NOT NULL
);

INSERT INTO listings (title, content) VALUES 
('Lost dog', 'Help I lost my dog'),
('Breaking News', 'HI!'),
('Dogs', 'I found mine.');
