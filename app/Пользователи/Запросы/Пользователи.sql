/**
 * @name qUsers
 * @public
 * @writable mtd_users
*/ 
Select t.usr_name, t.usr_passwd, t1.group_name 
From mtd_users t
 Left Join mtd_groups t1 on t.usr_name = t1.usr_name