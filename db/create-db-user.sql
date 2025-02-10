CREATE USER 'user'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
