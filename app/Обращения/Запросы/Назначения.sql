/**
 * @public
 * @author minya92
 * @name qNaznach
 * @writable obr_uslugi
 */ 
Select * 
From obr_uslugi t1
 Where :treatId = t1.treat_id
 and t1.route = true