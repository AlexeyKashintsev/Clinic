/**
 *
 * @author Алексей
 * @name qPeriodic
 * @public
 */ 
Select * 
From usl_periodic_type t1
union all
Select null as usl_periodic_type_id, 'нет' as type_name
from dummy