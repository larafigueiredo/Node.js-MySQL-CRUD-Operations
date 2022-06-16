create table `employee` (
 `EmpID` int(11) not null auto_increment,
    `Name` varchar(45) default null,
    `EmpCode` varchar(45) default null,
    `Salary` int(11) default null,
    primary key (`EmpID`)
) engine=InnoDB auto_increment=0 default charset=utf8mb4;


select * from employee;


lock tables `employee` write;
insert into `employee` values (1, 'Tommy Eatsheet', 'EMP90', 265400), (2, 'Jess Fukenson', 'EMP92', 50000),(3, 'Bob Knobhead', 'EMP95', 10000),(4, 'Dick knogginson', 'EMP96', 90000);