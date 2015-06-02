/**
 *
 * @author Алексей
 * @name qUslInTreat
 * @public
 * @writable obr_uslugi
 */ 
Select t1.obr_uslugi_id, t1.treat_id, t1.usluga_id
, t3.contract_id, t.contr_name, t2.cost 
From obr_uslugi t1
 Inner Join obr_uslugi_commercial t3 on t3.obr_uslugi_commercial_id = t1.obr_uslugi_id
 Left Join buh_contracts t on t3.contract_id = t.buh_contracts_id
 Left Join usl_cost t2 on t3.usl_cost = t2.usl_cost_id
 Where :treatId = t1.treat_id