/**
 *
 * @author Alexey
 * @name qHazards
 * @public
 */ 
Select * 
From hazards t1
 Where (:hazard_type = t1.hazard_type or :hazard_type is null)
 and (t1.haz_code = :hazard_find
 and t1.haz_name = :hazard_find
 and t1.haz_short_name = :hazard_find
 or :hazard_find is null)