/**
 *
 * @author Alexey
 * @name qUserAddRole
 * @public
 * @rolesAllowed franchazi admin
 * @manual
 */ 
Select * 
from mtd_groups t
where t.usr_name = :usr_name and t.group_name = :usr_role