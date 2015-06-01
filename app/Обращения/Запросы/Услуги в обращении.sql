/**
 * @public
 * @author Алексей
 * @name qUslugiInTreat
 * @writable obr_uslugi
 */ 
Select * 
From obr_uslugi t1
 Left Join obr_result t on t1.obr_uslugi_id = t.route_usl
 Where :treat_id = t1.treat_id