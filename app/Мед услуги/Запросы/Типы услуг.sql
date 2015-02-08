/**
 *
 * @author Alexey
 * @name qUslTypes
 */ 
Select * 
From usl_types t1
Union all
Select 0 as usl_types_id, 'Все услуги' as type_name, null as type_parent
from dummy