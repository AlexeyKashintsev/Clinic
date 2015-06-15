/**
 * @author Алексей
 * @name qPriceLists
 * @public
 */ 
Select * 
From buh_contracts t1
 Where (:comp_id = t1.company_id or :comp_id is null)
 and (:c_act = t1.с_active or (:c_act is null and t1.с_active = true))
 and t1.price = true