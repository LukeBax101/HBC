CREATE TABLE sessions (session_id UUID, name VARCHAR(255), password_hash VARCHAR(255), current_state UUID, dates UUID);

CREATE TABLE songs (song_id UUID, name VARCHAR(255));

CREATE TABLE slides (slide_id UUID, song_id UUID, slide_no INTEGER);

CREATE TABLE session_songs (session_ID UUID, song_id UUID);

CREATE TABLE teams (team_id UUID, session_id UUID, name VARCHAR(255), color VARCHAR(255), score INTEGER);

CREATE TABLE state (state_id UUID, home BOOLEAN, race BOOLEAN, song_overlay BOOLEAN, slide_id UUID);

CREATE TABLE dates (date_id UUID, day_1 TIMESTAMP, day_2 TIMESTAMP, day_3 TIMESTAMP, final TIMESTAMP);
