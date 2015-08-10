/**
 *
 * @author Alexey
 * @name qUslugiByType
 * @public
 */ 
Select * 
From usl_uslugi t1
where t1.usl_type = :usl_type or :usl_type = 0 or :usl_type is null
and(:search is null or t1.usl_name like '%' || :search || '%')