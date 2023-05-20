CREATE TABLE IF NOT EXISTS Profile(
    profile_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    avatar BLOB,
    country VARCHAR(50),
    external_portfolio_url VARCHAR(100),
    address VARCHAR(300),
    biography TEXT,
    is_private BOOLEAN NOT NULL,
    resume BLOB,
    phone_number VARCHAR(50),
    is_application_specific BOOLEAN NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES AppUser(user_id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id)
);
