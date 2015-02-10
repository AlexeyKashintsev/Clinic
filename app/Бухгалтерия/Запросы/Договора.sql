/**
 *
 * @author Алексей
 * @name qContracts
 * @manual
 */ 
Select * 
From buh_contracts t1
 Where (:company_id = t1.company_id or :company_id is null)
 and (:c_active = t1.с_active or :c_active is null)