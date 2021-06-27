CREATE KEYSPACE IF NOT EXISTS bdnr 
WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor' : 1
};

CREATE TABLE IF NOT EXISTS bdnr.activities (
    user_id int,
    activity_timeuuid timeuuid,
    activity_type text,
    title text,
    photo_url text,
    comment text,
    text text,
    physical_activity_type text,
    duration int,
    distance float,
    description text,
    perceived_effort smallint,
    average_speed float,
    average_cadence float,
    total_calories float,
    kudos SET<int>,
    PRIMARY KEY (user_id, activity_timeuuid)
) WITH CLUSTERING ORDER BY (activity_timeuuid DESC);


CREATE TABLE IF NOT EXISTS bdnr.comments (
    activity_user_id int,
    activity_timeuuid timeuuid,
    comment_timeuuid timeuuid,
    user_id int,
    text text,
    PRIMARY KEY ((activity_user_id, activity_timeuuid), comment_timeuuid)
) WITH CLUSTERING ORDER BY (comment_timeuuid DESC);


CREATE TABLE IF NOT EXISTS bdnr.points (
    user_id int,
    activity_timeuuid timeuuid,
    point_timeuuid timeuuid,
    latitude float,
    longitude float,
    cadence float,
    calories float,
    speed float,
    PRIMARY KEY ((user_id, activity_timeuuid), point_timeuuid)
) WITH CLUSTERING ORDER BY (point_timeuuid DESC);



