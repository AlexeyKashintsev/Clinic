/**
 * @public
 * @manual
 * @author minya92
 * @name qCopyUslCost
 */ 
Insert into usl_cost
Select nextval('usl_cost_seq') AS usl_cost_id, usluga_id, :contract_target AS contract_id
, cost
, sex, per_type, limitation_age_type
, limitation_age 
From usl_cost
 Where :contract_select = usl_cost.contract_id