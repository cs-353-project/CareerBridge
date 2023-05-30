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

CREATE TABLE IF NOT EXISTS SkillInJobAdvertisement(
    ad_id INT NOT NULL,
    skill_id INT NOT NULL AUTO_INCREMENT,
    skill_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (ad_id) REFERENCES JobAdvertisement(ad_id) ON
    DELETE CASCADE,
    PRIMARY KEY (skill_id)
);

CREATE TABLE IF NOT EXISTS DegreeInJobAdvertisement(
    degree_id INT NOT NULL,
    ad_id INT NOT NULL,
    FOREIGN KEY (degree_id) REFERENCES Degree(degree_id) ON
    DELETE CASCADE,
    FOREIGN KEY (ad_id) REFERENCES JobAdvertisement(ad_id) ON
    DELETE CASCADE,
    PRIMARY KEY (degree_id, ad_id)
);

CREATE TABLE IF NOT EXISTS JobAdvertisementResponse(
    application_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    ad_id INT NOT NULL,
    apply_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    response_date DATETIME,
    response VARCHAR(15),
    cv BLOB,
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON
    DELETE CASCADE,
    FOREIGN KEY (ad_id) REFERENCES JobAdvertisement(ad_id) ON
    DELETE CASCADE,
    PRIMARY KEY (application_id),
    CHECK (response IN ("Waiting", "Interview", "Accepted", "Rejected")),
    UNIQUE (profile_id, ad_id)
);
