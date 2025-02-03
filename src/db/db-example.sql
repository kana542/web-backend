DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Nutrition (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    meal_date DATE NOT NULL,
    meal_time TIME NOT NULL,
    meal VARCHAR(100),
    calories INT,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fat DECIMAL(5,2),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)

CREATE TABLE Activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    activity_date DATE NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)

ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

INSERT INTO Users
  VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (3, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

INSERT INTO Activities (user_id, activity_date, activity_type, duration_minutes, calories_burned, notes, created_at) VALUES
    (1, '2024-01-10', 'Running', 45, 450, 'Morning jog in the park', '2024-01-10 08:30:00'),
    (2, '2024-01-10', 'Swimming', 45, 400, 'Pool workout', '2024-01-10 07:00:00'),
    (3, '2024-01-10', 'Swimming', 90, 600, 'Team practice', '2024-01-10 17:00:00');

INSERT INTO Nutrition (user_id, meal_date, meal_time, meal, calories, protein, carbs, fat, notes, created_at) VALUES
    (1, '2024-01-10', '12:00:00', 'Chicken salad sandwich', 450, 35.0, 45.0, 15.0, 'Whole grain bread', '2024-01-10 12:15:00'),
    (2, '2024-01-10', '07:30:00', 'Protein smoothie', 300, 25.0, 40.0, 5.0, 'Pre-workout meal', '2024-01-10 07:35:00'),
    (3, '2024-01-10', '09:00:00', 'Eggs and toast', 400, 22.0, 35.0, 20.0, 'Three eggs with whole grain toast', '2024-01-10 09:15:00');


-- hakeminen: ravintokeskiarvo (kk)
SELECT
    DATE_FORMAT(meal_date, '%Y-%m') as month,
    AVG(calories) as avg_daily_calories,
    AVG(protein) as avg_daily_protein,
    AVG(carbs) as avg_daily_carbs,
    AVG(fat) as avg_daily_fat
FROM Nutrition
WHERE user_id = 1
GROUP BY DATE_FORMAT(meal_date, '%Y-%m')
ORDER BY month DESC;

-- päivittäminen: kalorimäärän päivittäminen
UPDATE Nutrition
SET calories = 400, notes = CONCAT(notes, ' (Updated calories)')
WHERE meal_id = 1;

-- poistaminen: aktiviteetin poisto
DELETE FROM Activities
WHERE activity_id = 1;
