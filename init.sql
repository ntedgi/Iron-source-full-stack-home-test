
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

create table if not exists forms_data
(
	id serial not null,
	name text,
	fields json[]
);

alter table forms_data owner to postgres;

create unique index if not exists forms_id_uindex
	on forms_data (id);


create table if not exists forms_submit
(
	id integer,
	time text,
	submit json
);

alter table forms_submit owner to postgres;


