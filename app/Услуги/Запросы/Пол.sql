/**
 *
 * @author Алексей
 * @name qSex
 * @public
 */ 
Select * 
From man_sex t1
union all
select null as man_sex_id, 'нет' as sex_short, 'любой' as sex_long
from dummy