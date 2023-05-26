CREATE TABLE IF NOT EXISTS SkillAssessment(
    skill_id INT NOT NULL,
    assessor_id INT NOT NULL,
    rating VARCHAR(10) NOT NULL,
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id) ON DELETE CASCADE,
    FOREIGN KEY (assessor_id) REFERENCES User(user_id) ON DELETE CASCADE,
    PRIMARY KEY (skill_id, assessor_id)
);
