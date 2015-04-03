/**
 * @public
 * @author Alexey
 * @name qHazardContents
 */ 
Select * 
From usl_routes t1
 Inner Join usl_uslugi t on t1.route_usl = t.usl_uslugi_id
 Where :hazard_id = t1.hazard
