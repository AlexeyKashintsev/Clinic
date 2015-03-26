/**
 *
 * @author Alexey
 * @name qUslugaContents
 */ 
Select * 
From usl_routes t1
 Inner Join usl_uslugi t on t1.usl_container = t.usl_uslugi_id
 Where :usluga_id = t.usl_uslugi_id