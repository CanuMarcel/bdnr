CREATE KEYSPACE IF NOT EXISTS bdnr 
WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor' : 1
};


CREATE TYPE IF NOT EXISTS bdnr.user_comment (
    user_id timeuuid,
    text text
);

CREATE TABLE IF NOT EXISTS bdnr.activities (
    user_id int,
    timestamp timestamp,
    type text,
    title text,
    url text,
    comment text,
    text text,
    physical_activity_type text,
    duration duration,
    distance float,
    photo_url text,
    description text,
    perceived_effort smallint,
    latitude float,
    longitude float,
    average_speed float,
    cadence float,
    calories float,
    comments SET<FROZEN<user_comment>>,
    kudos SET<text>,
    PRIMARY KEY (user_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
