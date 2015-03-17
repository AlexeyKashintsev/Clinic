/**
 *
 * @author Alexey
 * @name qUserAddRole
 * @public
 */ 
Select * 
from mtd_groups t
where t.usr_name = :usr_name and t.group_name = :usr_role