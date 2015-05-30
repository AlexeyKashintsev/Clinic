/**
 * @name qUsers
 * @public
*/ 
Select t.usr_name, t.usr_passwd, t1.group_name 
From mtd_users t
 Inner Join mtd_groups t1 on t.usr_name = t1.usr_name