/**
 *
 * @author Alexey
 * @name qPricesByContract
 * @public
 */ 
Select *
From usl_cost t1
 Where :contract_id = t1.contract_id