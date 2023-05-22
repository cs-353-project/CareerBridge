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

CREATE TABLE IF NOT EXISTS Experience(
    experience_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    description TEXT,
    current_status VARCHAR(25),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id),
    CHECK (current_status IN ('Working', 'Past Working Experience'))
);

CREATE TABLE IF NOT EXISTS Degree(
    degree_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (degree_id)
);

CREATE TABLE IF NOT EXISTS EducationalExperience(
    experience_id INT NOT NULL,
    grade VARCHAR(50),
    field_of_study VARCHAR(50),
    school_name VARCHAR(50) NOT NULL,
    degree_id INT NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(experience_id) ON DELETE CASCADE,
    -- FOREIGN KEY (school_name) REFERENCES School(school_name) ON DELETE CASCADE,
    FOREIGN KEY (degree_id) REFERENCES Degree(degree_id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id)
);

CREATE TABLE IF NOT EXISTS WorkExperience(
    experience_id INT NOT NULL,
    setting VARCHAR(25) NOT NULL,
    type VARCHAR(15),
    company_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(experience_id) ON DELETE CASCADE,
    -- FOREIGN KEY (company_name) REFERENCES Company(company_name) ON DELETE CASCADE,
    PRIMARY KEY (experience_id),
    CHECK (type IN ('Internship', 'Part-time Job', 'Job', 'Contract', 'Project-based')),
    CHECK (setting IN ('On-site', 'Remote', 'Hybrid'))
);

CREATE TABLE IF NOT EXISTS VoluntaryExperience(
    experience_id INT NOT NULL,
    responsibility TEXT,
    organization_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES Experience(experience_id) ON DELETE CASCADE,
    -- FOREIGN KEY (organization_name) REFERENCES NonProfitOrganization(organization_name) ON DELETE CASCADE,
    PRIMARY KEY (experience_id)
);

CREATE TABLE IF NOT EXISTS TestScore(
    test_score_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    test_name VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    test_date DATETIME,
    score VARCHAR(50),
    attachment BLOB,
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON
    DELETE CASCADE,
    PRIMARY KEY (test_score_id)
);

CREATE TABLE IF NOT EXISTS Publication(
    publication_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    publication_date DATETIME,
    publisher VARCHAR(100),
    publication_url VARCHAR(100),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON
    DELETE CASCADE,
    PRIMARY KEY (publication_id)
);

CREATE TABLE IF NOT EXISTS Project(
    project_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    start_date DATETIME,
    end_date DATETIME,
    project_url VARCHAR(100),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id)
);

CREATE TABLE IF NOT EXISTS Award(
    award_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    issue_date DATETIME,
    issuer VARCHAR(100),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE,
    PRIMARY KEY (award_id)
);

CREATE TABLE IF NOT EXISTS LanguageProficiency(
    language_id INT NOT NULL AUTO_INCREMENT,
    profile_id INT NOT NULL,
    language_name VARCHAR(50) NOT NULL,
    proficiency VARCHAR(50),
    FOREIGN KEY (profile_id) REFERENCES Profile(profile_id) ON DELETE CASCADE,
    PRIMARY KEY (language_id)
);
