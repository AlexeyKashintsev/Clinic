/**
 * @author Алексей
 * @name qContracts
 * @manual
 * @public
 */ 
Select * 
From buh_contracts t1
 Where (:comp_id = t1.company_id or :comp_id is null)
 and (:c_act = t1.с_active or :c_act is null)
 and (
     ((t1.price is null or t1.price=false) and (:price is null or :price = false))
  or (t1.price = :price))