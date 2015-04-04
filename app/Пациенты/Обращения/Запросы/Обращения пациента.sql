/**
 *
 * @author Алексей
 * @name qTreatByPatient
 * @public
 */ 
Select *, null as usl_string
From obr_treatment t1
 Where :patient_id = t1.patient