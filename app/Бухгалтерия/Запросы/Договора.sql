/**
 *
 * @author Алексей
 * @name qContracts
 * @manual
 */ 
Select * 
From buh_contracts t1
 Where (:company_id = t1.company_id or :company_id is null)
 and (:active = t1.active or :active is null)