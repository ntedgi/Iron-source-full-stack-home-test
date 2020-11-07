
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

create table if not exists users
(
	email text,
	nick_name text
);

alter table users owner to postgres;

create table if not exists room_history
(
	room_name text,
	message text,
	sender_email text,
	timestamp timestamp default CURRENT_TIMESTAMP
);

alter table room_history owner to postgres;

create table if not exists rooms
(
	room_name text,
	creator text,
	timestamp timestamp default CURRENT_TIMESTAMP
);

alter table rooms owner to postgres;

