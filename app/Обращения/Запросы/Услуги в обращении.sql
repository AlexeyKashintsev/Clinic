/**
 * @public
 * @author Алексей
 * @name qUslugiInTreat
 * @writable obr_route
 */ 
Select * 
From obr_route t1
 Left Join obr_result t on t1.obr_route_id = t.route_usl
 Where :treat_id = t1.treat_id