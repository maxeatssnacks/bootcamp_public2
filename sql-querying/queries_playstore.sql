-- Comments in SQL Start with dash-dash --

-- #1
-- SELECT *
-- FROM analytics
-- WHERE id = 1880;

-- #2
-- SELECT *
-- FROM analytics
-- WHERE last_updated = '2018-08-01'::date;

-- #3
-- SELECT category, COUNT(app_name)
-- FROM analytics
-- GROUP BY category;

-- #4
-- SELECT app_name, reviews, rating
-- FROM analytics
-- ORDER BY reviews DESC
-- LIMIT 5;

-- #5
-- SELECT app_name, rating, reviews
-- FROM analytics
-- WHERE rating >= 4.8
-- ORDER BY reviews DESC
-- LIMIT 1;

-- #6
-- SELECT category, SUM(rating * reviews) / SUM(reviews) AS WeightedAVGRating
-- FROM analytics
-- GROUP BY category;

-- #7
-- SELECT app_name, price, rating
-- FROM analytics
-- WHERE rating < 3
-- ORDER BY price DESC
-- LIMIT 3;

-- #8
-- SELECT app_name, rating
-- FROM analytics
-- WHERE min_installs < 50 AND rating IS NOT NULL
-- ORDER BY rating DESC;

-- #9
-- SELECT app_name
-- FROM analytics
-- WHERE rating < 3 AND reviews >= 100000;

-- #10
-- SELECT app_name, price, reviews
-- FROM analytics
-- WHERE price BETWEEN 0.10 AND 1.00
-- ORDER BY reviews DESC
-- LIMIT 10;

-- #11
-- SELECT app_name, last_updated
-- FROM analytics
-- ORDER BY last_updated ASC
-- LIMIT 1;

-- #12
-- SELECT app_name, price
-- FROM analytics
-- ORDER BY price DESC
-- LIMIT 1;

-- #13
-- SELECT SUM(reviews)
-- FROM analytics;

-- #14
-- SELECT category, COUNT(app_name)
-- FROM analytics
-- GROUP BY category
-- HAVING COUNT(app_name) > 300;


-- #15
-- SELECT app_name, reviews, min_installs, min_installs/reviews AS ratio
-- FROM analytics
-- WHERE min_installs >= 100000
-- ORDER BY min_installs/reviews DESC
-- LIMIT 1;