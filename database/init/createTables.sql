CREATE TABLE songs (song_id UUID PRIMARY KEY, name VARCHAR(255));

CREATE TABLE slides (slide_id UUID PRIMARY KEY, song_id UUID REFERENCES songs(song_id), slide_no INTEGER);

CREATE TABLE state (state_id UUID PRIMARY KEY, home BOOLEAN, race BOOLEAN, song_overlay BOOLEAN, slide_id UUID REFERENCES slides(slide_id));

CREATE TABLE dates (dates_id UUID PRIMARY KEY, start TIMESTAMP, final TIMESTAMP);

CREATE TABLE sessions (session_id UUID PRIMARY KEY, name VARCHAR(255), password_hash VARCHAR(255), state_id UUID REFERENCES state(state_id), dates_id UUID REFERENCES dates(dates_id));

CREATE TABLE session_songs (session_ID UUID REFERENCES sessions(session_id), song_id UUID REFERENCES songs(song_id));

CREATE TABLE teams (team_id UUID PRIMARY KEY, session_id UUID REFERENCES sessions(session_id), name VARCHAR(255), color VARCHAR(255), score INTEGER);
