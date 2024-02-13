-- write your queries here

-- #1
-- SELECT * FROM owners FULL JOIN vehicles ON owners.id = vehicles.owner_id;

-- #2
-- SELECT first_name, last_name, COUNT(*) AS count FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY owners.id ORDER  BY count ASC;

-- #3
-- SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, COUNT(*) AS count FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY owners.id HAVING ROUND(AVG(price)) > 10000 ORDER BY count DESC;