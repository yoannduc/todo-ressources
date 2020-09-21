CREATE VIEW vw_list AS
SELECT
    l.id AS "id",
    l.title AS "title",
    l.created_at AS "created_at",
    l.updated_at AS "updated_at",
    COUNT(i.id) AS "nb_item"
FROM list AS l
LEFT OUTER JOIN item AS i ON i.list_id = l.id
GROUP BY l.id
ORDER BY l.created_at ASC;
