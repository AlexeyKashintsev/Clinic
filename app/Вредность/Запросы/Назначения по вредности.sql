/**
 * @public
 * @author Alexey
 * @name qHazardContents
 */ 
Select * 
From usl_routes t1
 Where :hazard_id = t1.hazard
