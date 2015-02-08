/**
 *
 * @author Alexey
 * @name qUslWithTypesTree
 */ 
Select t1.usl_types_id as row_id, t1.type_name as row_name, null as parent_type_id
From usl_types t1
Union all
select t.usl_uslugi_id as row_id, t.usl_name as row_name, t.usl_type as parent_type_id
from usl_uslugi t