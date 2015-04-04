/**
 *
 * @author Алексей
 * @name qWorkPlaceByPatient
 * @public
 */ 
Select * 
From man_workplace t1
 Where :patient_id = t1.man_id