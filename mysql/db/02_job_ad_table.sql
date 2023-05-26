CREATE TABLE IF NOT EXISTS JobAdvertisement(
    ad_id INT NOT NULL AUTO_INCREMENT,
    creator_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    organization VARCHAR(100) NOT NULL,
    setting VARCHAR(15) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(15) NOT NULL,
    pay_range_min INT NOT NULL,
    pay_range_max INT NOT NULL,
    domain VARCHAR(50),
    is_open BOOLEAN NOT NULL,
    external_url VARCHAR(1000),
    application_count INT NOT NULL DEFAULT 0,
    view_count INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES AppUser(user_id) ON
    DELETE CASCADE,
    PRIMARY KEY (ad_id),
    CHECK (setting IN ("On-site", "Remote", "Hybrid")),
    CHECK (type IN ("Internship", "Part-time Job", "Job", "Contract",
    "Project-based"))
);
