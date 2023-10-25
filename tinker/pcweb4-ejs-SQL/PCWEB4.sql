SELECT * FROM employees;
SELECT * FROM works_with;
--@block
USE company_data; 
--@block
show tables;
SELECT *
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'employees'
--@block
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_type = "employees";
SELECT * FROM employees;
--@block
SET AUTOCOMMIT = OFF;

--@block
DELETE FROM employees WHERE emp_id = 101;
--@block
SELECT * FROM employees;
--@block
ROLLBACK;
--@block
SELECT * FROM employees;
--@block
ALTER TABLE employees
ADD CONSTRAINT chk_to_meet_salary CHECK(salary <= 250000);
--@block
ALTER TABLE employees
DROP CONSTRAINT chk_to_meet_salary;

--@block
ALTER TABLE employees
ADD supservisor VARCHAR(50);
--@block
SELECT a.name AS employee, b.name AS supervisor
FROM employees AS a 
INNER JOIN employees AS b 
ON a.super_id = b.emp_id

--@block
CREATE VIEW supervisor_list AS 
SELECT a.name AS employee, b.name AS supervisor
FROM employees AS a 
INNER JOIN employees AS b 
ON a.super_id = b.emp_id

--@block
SELECT * FROM supervisor_list

--@block
SHOW INDEXES FROM employees;

--@block
CREATE INDEX name 
ON employees(name)

--@block
SELECT salary, (SELECT AVG(salary) FROM employees )AS average_pay
FROM employees;
--@block
SELECT t.salary, t.average_pay,  t.salary - t.average_pay as Difference
FROM
(SELECT salary, (SELECT AVG(salary) FROM employees )AS average_pay
FROM employees) as t
--@block
SELECT c.client_name,  t.total

FROM clients as c

INNER JOIN(SELECT SUM(total_sales) AS total, client_id
FROM works_with
GROUP BY client_id
HAVING SUM(total_sales) >= 200000
) as t

on c.client_id = t.client_id
--@block

CREATE PROCEDURE get_total_sales() 
BEGIN 
    SELECT * FROM works_with;
END
--@block
CALL get_total_sales()

--@block
-- CREATE TRIGGER 

--@block
SELECT * FROM employees
WHERE NOT salary > 100000

--@block
SELECT genre, AVG(year) FROM books 
GROUP BY genre

--@block BIKE SHARE

SELECT name FROM stations
ORDER BY name DESC

--@block
SELECT trip_id, duration FROM trips
WHERE duration > 500
ORDER BY duration DESC

--@block
SELECT start_date, start_station FROM trips
WHERE bike_id = 450
ORDER BY start_date ASC, start_station ASC
--@block
SELECT AVG(dockcount) FROM stations;
--@block
SELECT zip, MAX (precipitation_in) FROM weather
GROUP BY zip;
--@block

SELECT * FROM
(SELECT end_station, COUNT(end_station) AS total FROM trips
GROUP BY end_station) AS c
ORDER BY c.total DESC
LIMIT 1;

--@block

SELECT start_station, AVG(duration) AS avg FROM trips
GROUP BY start_station
ORDER BY avg DESC

--@block

SELECT s.name, s.city, t.avg 
FROM stations AS s

INNER JOIN

(SELECT start_station, AVG(duration) AS avg FROM trips
GROUP BY start_station
ORDER BY avg DESC) AS t

ON s.name = t.start_station;

--@BLOCK
SELECT a.name AS employee, b.name AS supervisor
FROM employees AS a 
INNER JOIN employees AS b 
ON a.super_id = b.emp_id
--@block
USE athletes;
--@block

--@block
CREATE TABLE players (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) not null,
    description TEXT not null,
    image VARCHAR(255) not null
)
--@block
INSERT INTO players (name, description, image)
values (
    "Rolnaldo",
    "best soccer players",
    "https://zca.sg/img/1"
    )
