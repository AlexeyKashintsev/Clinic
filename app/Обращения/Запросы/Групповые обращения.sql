/**
 *
 * @author Алексей
 * @name qTreatGroup
 */ 
Select * 
From obr_group t1
 Where :group_id = t1.obr_group_id
 and :contract_id = t1.contract_id