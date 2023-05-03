module.exports =
`WITH day_intervals AS (
  SELECT
    (SELECT MAX(date) from "CurrencyRates") - n end_time,
    (SELECT MAX(date) from "CurrencyRates") - (n + :number_of_days) start_time
  FROM generate_series(0, (30 * :number_of_days), :number_of_days) n
)
SELECT i.start_time, i.end_time, trunc(AVG(cr.rate)::numeric, 6) avg_val
FROM "CurrencyRates" cr
RIGHT JOIN day_intervals i
        ON cr.date > i.start_time AND cr.date <= i.end_time
WHERE target_currency_id = :target_currency_id
GROUP BY i.start_time, i.end_time
ORDER BY i.end_time desc
;
`;