--drop table expense
--create table expense (id bigint auto_increment not null, amount double, description varchar(255), expense_date date, location varchar(255), category_id bigint, user_id bigint, primary key (id))

insert into user values (1, 'Malik', 'malik@gmail.com')
insert into user values (2, 'Akil', 'akil@gmail.com')
insert into user values (3, 'Glass', 'glass@gmail.com')

insert into category values (1, 'Travel')
insert into category values (2, 'Auto')
insert into category values (3, 'Grocery')

--insert into expense (amount, description, expense_date, location, category_id, user_id)
insert into expense values (1, 500.00, 'LA trip', '2020-04-13', 'Los Angeles, CA', 1, 3)
insert into expense values (2, 999999999.00, 'Denver vacation', '2020-04-20', 'Denver, CO', 2, 2)
insert into expense values (3, 8000.12323, 'Oil Change', '2020-04-13', 'Jiffy Lube', 3, 1)