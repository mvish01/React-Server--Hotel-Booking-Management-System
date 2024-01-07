DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Confirmation;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  Role VARCHAR(255),
  email VARCHAR(255),
  phoneNumber BIGINT,
  password VARCHAR(255)
);



CREATE TABLE Room ( 
room_number INT PRIMARY KEY,
room_type VARCHAR(255), 
capacity INT, price_per_night FLOAT,
 images VARCHAR(255), 
ac_non_ac VARCHAR(255), 
bed_type VARCHAR(255), 
room_size VARCHAR(255) );

CREATE TABLE Reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  room_number INT,
  check_in_date VARCHAR(255),
  check_out_date VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (room_number) REFERENCES Room(room_number)
);

CREATE TABLE Confirmation (
  confirmation_id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT,
  amount FLOAT,
  payment_date VARCHAR(255),
  FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);
CREATE TABLE Feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reservation_id INT,
    feedback_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);

User
INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('Michael', 'Johnson', 'Customer', 'michael.johnson@example.com', 5551234567, 'mike123');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('Emily', 'Wilson', 'Customer', 'emily.wilson@example.com', 4449876543, 'emily456');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('David', 'Lee', 'Customer', 'david.lee@example.com', 1112223333, 'davidpass');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('Jessica', 'Brown', 'Customer', 'jessica.brown@example.com', 7778889999, 'jess123');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('William', 'Miller', 'Customer', 'william.miller@example.com', 3334445555, 'william456');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('Sophia', 'Taylor', 'Customer', 'sophia.taylor@example.com', 6667778888, 'sophia123');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('James', 'Anderson', 'Customer', 'james.anderson@example.com', 2223334444, 'james456');

INSERT INTO User (firstName, lastName, Role, email, phoneNumber, password)
VALUES ('Olivia', 'Johnson', 'Customer', 'olivia.johnson@example.com', 8889990000, 'olivia123');

Room:

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (103, 'Standard', 2, 110.00, 'room103.jpg', 'AC', 'Double', '22 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (104, 'Deluxe', 3, 160.00, 'room104.jpg', 'AC', 'King', '35 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (105, 'Suite', 4, 250.00, 'room105.jpg', 'AC', 'Queen', '40 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (106, 'Standard', 2, 100.00, 'room106.jpg', 'AC', 'Twin', '18 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (107, 'Deluxe', 3, 170.00, 'room107.jpg', 'AC', 'King', '38 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (108, 'Standard', 2, 120.00, 'room108.jpg', 'Non-AC', 'Single', '15 sqm');

INSERT INTO Room (room_number, room_type, capacity, price_per_night, images, ac_non_ac, bed_type, room_size)
VALUES (109, 'Suite', 4, 270.00, 'room109.jpg', 'AC', 'King', '42 sqm');

Reservation:

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (3, 103, '2023-09-05', '2023-09-10');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (4, 104, '2023-10-20', '2023-10-25');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (5, 105, '2023-11-15', '2023-11-20');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (6, 106, '2023-12-01', '2023-12-05');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (7, 107, '2024-01-08', '2024-01-15');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (8, 108, '2024-02-14', '2024-02-20');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (9, 109, '2024-03-10', '2024-03-15');

INSERT INTO Reservation (user_id, room_number, check_in_date, check_out_date)
VALUES (10, 101, '2024-04-05', '2024-04-10');


Confirmation:

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (3, 450.00, '2023-09-05');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (4, 850.00, '2023-10-20');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (5, 600.00, '2023-11-15');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (6, 400.00, '2023-12-01');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (7, 950.00, '2024-01-08');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (8, 500.00, '2024-02-14');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (9, 900.00, '2024-03-10');

INSERT INTO Confirmation (reservation_id, amount, payment_date)
VALUES (10, 350.00, '2024-04-05');
