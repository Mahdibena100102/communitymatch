CREATE DATABASE community_match;
USE community_match;

CREATE TABLE mosque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    moque_name VARCHAR(255) NOT NULL UNIQUE,
    manager_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE admin_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mosque_id INT NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    password_reset_token VARCHAR(255),
    password_reset_token_expiration DATETIME,
    FOREIGN KEY (mosque_id) REFERENCES mosque(id) ON DELETE CASCADE
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    verification_token VARCHAR(255) NOT NULL,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    password_reset_token VARCHAR(255),
    password_reset_token_expiration DATETIME,
    pending_admin_verification BOOLEAN NOT NULL DEFAULT true,
    gender VARCHAR(10) NOT NULL,
    mosque_id INT NOT NULL,
    guardian_first_name VARCHAR(255),
    guardian_surname VARCHAR(255),
    guardian_phone_number VARCHAR(30),
    guardian_email VARCHAR(100),
    FOREIGN KEY (mosque_id) REFERENCES mosque(id) ON DELETE CASCADE
);

CREATE TABLE marriage_profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    profession VARCHAR(255) NOT NULL,
    height INT NOT NULL,
    weight DECIMAL NOT NULL,
    ethnicity VARCHAR(100) NOT NULL,
    education VARCHAR(255) NOT NULL,
    living_arrangment VARCHAR(255) NOT NULL,
    about_me TEXT NOT NULL,
    looking_for TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE interest_expressed (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id_expressing_interest INT NOT NULL,
    interest_expressed_towards_id INT NOT NULL,
    date_expressed DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id_expressing_interest) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_expressed_towards_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    male_id INT NOT NULL,
    female_id INT NOT NULL,
    date_matched DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    resolved BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (male_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (female_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE pass (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id_passing INT NOT NULL,
    user_id_passed INT NOT NULL,
    date_passed DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id_passing) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_passed) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reporter_id INT NOT NULL,
    reported_id INT NOT NULL,
    reason TEXT NOT NULL,
    FOREIGN KEY (reporter_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES user(id) ON DELETE CASCADE
);
