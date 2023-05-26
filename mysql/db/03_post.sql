CREATE TABLE IF NOT EXISTS Post(
    post_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    content VARCHAR(2048) NOT NULL,
    attachment BLOB,
    post_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON DELETE
    CASCADE,
    PRIMARY KEY (post_id)
);
