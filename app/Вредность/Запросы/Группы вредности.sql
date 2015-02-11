/**
 *
 * @author Alexey
 * @name qHazardGroup
 * @public
 */ 
Select * 
From hazard_groups t1
union all
select 0 as hazard_groups_id, 'Все' as group_name, null as group_code
from dummy