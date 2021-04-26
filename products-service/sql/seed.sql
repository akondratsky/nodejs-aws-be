-- enable UUID plugin
create extension if not exists "uuid-ossp";

drop table if exists "stocks";
drop table if exists "products";

create table if not exists "products" (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer
);

create table if not exists "stocks" (
  product_id uuid primary key references products (id) on delete cascade,
	count integer not null
);


insert into "products" (id, title, description, price) values
	(
		'7567ec4b-b10c-48c5-9345-fc73c48a80aa',
		'Kazoo',
		'The kazoo is an American musical instrument that adds a "buzzing" timbral quality to a player''s voice when the player vocalizes into it.', 240
	),
	(
		'7567ec4b-b10c-48c5-9345-fc73c48a80a0',
		'Hand bell',
		'When you need to signal that dinner is ready, train pets, call order in a room, use in games or for a person to call for help, this silver tea bell is the answer',
		599
	),
	(
		'7567ec4b-b10c-48c5-9345-fc73c48a80a3',
		'Gong',
		'Loud and clear: the gong is suitable for various events, and by hitting the gong, users can feel power and strength',
		4999
	),
	(
		'7567ec4b-b10c-48c5-9345-fc73c48a80a1',
		'Tibetan Singing Bowl Set',
		'This high-quality handcrafted meditation bowl set includes a wooden striker and hand sewn cushion',
		2497
	),
	(
		'7567ec4b-b10c-48c5-9345-fc73c48a80a2',
		'Didgeridoo',
		'Makes loud, fat and sexy noise, filled with life',
		2300
	),
	(
		'7567ec4b-b10c-48c5-9345-fc73348a80a1',
		'Jingle bells',
		'With jingle bells you can become a god of percussion by the power of New Year',
		1500
	),
	(
		'7567ec4b-b10c-48c5-9445-fc73c48a80a2',
		'Bottle',
		'This ancient and beauty bottle is ideal to whistle. "I love to whistle with bottle after hard work" /Alex Key, front-end developer/',
		30000
	),
	(
		'7567ec4b-b10c-45c5-9345-fc73c48a80a1',
		'Sport whistle',
		'Features a bold, crisp sound that requires less breath than traditional pealess whistles',
		672
	);


insert into "stocks" (product_id, count) values
	('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 6),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 7),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 12),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 7),
	('7567ec4b-b10c-48c5-9345-fc73348a80a1', 8),
	('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 2),
	('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 3)
