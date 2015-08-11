/**
 * @public
 * @author minya92
 * @name qHazardsInUsl
 * @readonly
 */ 
Select t1.haz_name, t1.haz_code, t1.haz_group, t1.haz_short_name,
t1.hazards_id, t.mandatory, t.sex, t.periodic_type, t.period
From hazards t1
 Inner Join usl_routes t on t1.hazards_id = t.hazard
 Inner Join usl_uslugi t2 on t.route_usl = t2.usl_uslugi_id
 Where :usl_id = t2.usl_uslugi_id