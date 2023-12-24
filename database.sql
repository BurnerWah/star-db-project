CREATE TABLE IF NOT EXISTS
    users (
        id serial PRIMARY KEY,
        username varchar(64) UNIQUE NOT NULL,
        argon2id_hash varchar(1024) NOT NULL,
        created_at timestamp NOT NULL DEFAULT NOW(),
        administrator boolean NOT NULL DEFAULT FALSE
    );

CREATE TABLE IF NOT EXISTS
    object_types (
        id serial PRIMARY KEY,
        name varchar(64) UNIQUE NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    objects (
        id serial PRIMARY KEY,
        name varchar(256) NOT NULL,
        created_by integer NOT NULL REFERENCES users (id),
        created_at timestamp NOT NULL DEFAULT NOW(),
        type_id integer NOT NULL REFERENCES object_types (id),
        right_ascension time,
        declination float,
        distance numrange,
        apparent_magnitude float,
        absolute_magnitude float,
        mass float,
        redshift float,
        nasa_image_id varchar(64)
    );

CREATE TABLE IF NOT EXISTS
    users_objects (
        user_id integer REFERENCES users (id),
        object_id integer REFERENCES objects (id),
        PRIMARY KEY (user_id, object_id)
    );