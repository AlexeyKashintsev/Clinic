/**
 * @public
 * @author Алексей
 * @name qUslTypesByPrice
 * @public
 */ 
Select t2.usl_types_id, t2.type_name, t2.type_parent
From usl_cost t1
 Inner Join usl_uslugi t on t1.usluga_id = t.usl_uslugi_id
 Inner Join usl_types t2 on t.usl_type = t2.usl_types_id
 Where :contract_id = t1.contract_id
GROUP BY t2.type_name, t2.usl_types_id, t2.type_parent
Union all
Select 0 as usl_types_id, 'Все услуги' as type_name, null as type_parent
from dummy