/**
 * @public
 * @author Алексей
 * @name qUslInTreat
 * @writable obr_uslugi
 */ 
Select t3.obr_uslugi_id, t3.treat_id, t3.usluga_id, t.contr_name, t2.cost
From obr_treatment t1
 Left Join buh_contracts t on t1.contract_id = t.buh_contracts_id
 Left Join usl_cost t2 on t2.contract_id = t.buh_contracts_id
 Left Join obr_uslugi t3 on t1.obr_treatment_id = t3.treat_id
 Where :treatId = t1.obr_treatment_id 
 And t3.route = true