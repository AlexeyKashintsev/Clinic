/**
 *
 * @author root
 * @name qUslugiByContract
 */ 
Select t1.usluga_id, t1.contract_id
From usl_cost t1
 Where :contract_id = t1.contract_id
group by t1.usluga_id, t1.contract_id