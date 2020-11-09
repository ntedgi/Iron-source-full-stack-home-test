
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
	sender text,
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

insert into public.rooms (room_name, creator, timestamp) values ('Angular', 'Naor', '2020-11-07 10:14:58.380608');
insert into public.rooms (room_name, creator, timestamp) values ('VueJs', 'Naor', '2020-11-07 10:15:09.207257');
insert into public.rooms (room_name, creator, timestamp) values ('React', 'Naor', '2020-11-07 10:15:24.453588');
insert into public.users (email, nick_name) values ('naor.tedgi@gmail.com', '22@may1989');
insert into public.users (email, nick_name) values ('zlil.tedgi@gmail.com', 'zlil');


