DROP TABLE IF EXISTS public.authors CASCADE;
DROP TABLE IF EXISTS public.blogs CASCADE;

CREATE TABLE
    IF NOT EXISTS
        authors (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR ( 50 ) NOT NULL,
            surname VARCHAR ( 50 ) NOT NULL,
            avatar VARCHAR ( 50 ) NOT NULL,
            email VARCHAR ( 50 ) NOT NULL,
            DOB TIMESTAMPTZ NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);

CREATE TABLE
	IF NOT EXISTS
		blogs(
			id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			title VARCHAR(50) NOT NULL,
			category VARCHAR(50) NOT NULL,
			cover VARCHAR(50) NOT NULL,
			author INTEGER REFERENCES authors ON DELETE CASCADE,
			content VARCHAR(5000) NOT NULL,
			read_time_value INTEGER NOT NULL,
			read_time_unit VARCHAR(50) NOT NULL,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);

