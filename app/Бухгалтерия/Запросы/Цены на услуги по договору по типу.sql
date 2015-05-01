/**
 *
 * @author Alexey
 * @name qPricesByContractByType
 * @public
 */ 
Select * 
From usl_cost t1
 Inner Join usl_uslugi t on t1.usluga_id = t.usl_uslugi_id
 Where :contract_id = t1.contract_id
 and (:usluga_type = t.usl_type or :usluga_type = 0)