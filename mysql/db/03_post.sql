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

CREATE TABLE IF NOT EXISTS Comment(
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(2048) NOT NULL,
    commented_at DATETIME NOT NULL,
    comment_id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE
    CASCADE,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON DELETE
    CASCADE,
    PRIMARY KEY (comment_id)
);
