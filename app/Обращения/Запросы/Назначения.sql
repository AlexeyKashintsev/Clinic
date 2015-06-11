/**
 * @public
 * @author minya92
 * @name qNaznach
 * @writable obr_uslugi
 */ 
Select * 
From obr_uslugi t1
 Left Join usl_uslugi t on t1.usluga_id = t.usl_uslugi_id
 Where :treatId = t1.treat_id
 and t1.route = true