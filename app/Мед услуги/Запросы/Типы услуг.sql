/**
 *
 * @author Alexey
 * @name qUslTypes
 */ 
Select * 
From usl_types t1
Union all
Select null as usl_types_id, 'Все услуги' as type_name, false as for_sale
from dummy