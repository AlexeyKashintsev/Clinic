/**
 * @name qUsers
 * @public
*/ 
Select *
From MTD_USERS t
 Where :usr_name = t.usr_name or :usr_name is null