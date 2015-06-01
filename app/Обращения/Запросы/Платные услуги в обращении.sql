/**
 *
 * @author Алексей
 * @name qUslInTreat
 * @public
 * @writable obr_uslugi
 */ 
Select t1.obr_uslugi_id, t1.treat_id, t1.usluga_id, t1.contract_id, t.contr_name, t2.cost
From obr_uslugi t1
 Left Join buh_contracts t on t1.contract_id = t.buh_contracts_id
 Left Join usl_cost t2 on t1.contract_id = t2.contract_id
 Where :treatId = t1.treat_id