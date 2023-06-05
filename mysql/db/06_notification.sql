CREATE TABLE IF NOT EXISTS `Notification` (
    notification_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    details VARCHAR(1000) NOT NULL,
    PRIMARY KEY (notification_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
)
