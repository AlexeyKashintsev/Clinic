/**
 *
 * @author Alexey
 * @name qUslugiByType
 */ 
Select * 
From usl_uslugi t1
where t1.usl_type = :usl_type or :usl_type is null