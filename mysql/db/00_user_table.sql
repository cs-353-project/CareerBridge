CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `AppUser` (
  `user_id` int NOT NULL,
  `user_role` varchar(50) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE,
  PRIMARY KEY (`user_id`),
  CHECK (`user_role` IN ('Professional', 'Recruiter', 'Skill Assessor', 'CareerExpert'))
);

CREATE TABLE `Admin` (
  `user_id` int NOT NULL,
  can_approve_applications boolean NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE,
  PRIMARY KEY (`user_id`)
);

CREATE VIEW `UserLogin` AS
  SELECT u.user_id, u.first_name, u.last_name, u.email, u.password, au.user_role,
    CASE
      WHEN ad.can_approve_applications IS NOT NULL
        THEN 1
        ELSE 0
      END AS is_admin
  FROM `User` u
  LEFT OUTER JOIN `AppUser` au ON u.user_id = au.user_id
  LEFT OUTER JOIN `Admin` ad ON u.user_id = ad.user_id
