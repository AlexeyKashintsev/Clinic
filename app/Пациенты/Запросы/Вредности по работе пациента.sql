/**
 *
 * @author Алексей
 * @name qHazardsByManJob
 * @public
 * @writable man_hazards
 */ 
Select * 
From man_hazards t1
 Inner Join hazards t on t1.hazard_id = t.hazards_id
 Where :workplaceId = t1.workplace_id