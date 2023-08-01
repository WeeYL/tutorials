DROP TABLE posts;

--@block
CREATE TABLE posts (
    id INTEGER primary key auto_increment,
    caption varchar(255) not null, 
    image varchar(255) not null
);

--@Block
DROP TABLE posts

--@Block
SELECT * FROM posts;

--@Block
DELETE FROM posts;

--@Block
INSERT INTO posts (caption, image) VALUES ("ROLANDLO","https://zca.sg/img/1")

--@block
SELECT * FROM posts WHERE id = 1