/**
 *
 * @author Алексей
 * @name qUslInTreat
 * @public
 * @writable obr_uslugi
 */ 
Select *
From obr_uslugi t1
 Inner Join buh_contracts t on t1.contract_id = t.buh_contracts_id
 Inner Join usl_cost t2 on t2.contract_id = t1.contract_id
 and t1.usluga_id = t2.usluga_id
 Where :treatId = t1.treat_id