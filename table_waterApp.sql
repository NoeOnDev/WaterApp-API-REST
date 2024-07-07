SELECT * FROM Users;
SELECT * FROM Notification;
SELECT * FROM NotificationHistory;
SELECT * FROM Street;
SELECT * FROM SuggestedMessage;
SELECT * FROM UserNotification;
SELECT * FROM NotificationStreet;

CREATE TABLE Street (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    street VARCHAR(100) REFERENCES Street(name),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('User', 'Admin')) NOT NULL
);

CREATE TABLE Notification (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id INTEGER REFERENCES Users(id)
);

CREATE TABLE NotificationHistory (
    id SERIAL PRIMARY KEY,
    notification_id INTEGER REFERENCES Notification(id),
    admin_id INTEGER REFERENCES Users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SuggestedMessage (
    id SERIAL PRIMARY KEY,
    message TEXT UNIQUE NOT NULL,
    admin_id INTEGER REFERENCES Users(id)
);

CREATE TABLE UserNotification (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    notification_id INTEGER REFERENCES Notification(id),
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NotificationStreet (
    id SERIAL PRIMARY KEY,
    notification_id INTEGER REFERENCES Notification(id),
    street_id INTEGER REFERENCES Street(id)
);

-- Eliminar registros de las tablas
DELETE FROM UserNotification WHERE user_id IN (SELECT id FROM Users);
DELETE FROM SuggestedMessage WHERE admin_id IN (SELECT id FROM Users);
DELETE FROM NotificationHistory WHERE admin_id IN (SELECT id FROM Users);
DELETE FROM Notification WHERE admin_id IN (SELECT id FROM Users);
DELETE FROM Users;

-- Eliminar tablas
DROP TABLE IF EXISTS UserNotification CASCADE;
DROP TABLE IF EXISTS NotificationStreet CASCADE;
DROP TABLE IF EXISTS SuggestedMessage CASCADE;
DROP TABLE IF EXISTS Street CASCADE;
DROP TABLE IF EXISTS NotificationHistory CASCADE;
DROP TABLE IF EXISTS Notification CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
