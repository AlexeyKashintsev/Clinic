/**
 * @public
 * @author minya92
 * @name qUslContainerInUsl
 * @readonly
 */ 
Select t.usl_uslugi_id, t.usl_name 
From usl_routes t1
 Inner Join usl_uslugi t on t1.usl_container = t.usl_uslugi_id
 Where :usl_id = t1.route_usl