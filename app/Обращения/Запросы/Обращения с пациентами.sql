/**
 * @public
 * @author Алексей
 * @name qAllPatientTreatmentsStatuses
 */ 
Select * 
From obr_treatment t
 Inner Join man_patient t1 on t.patient = t1.man_patient_id
 Inner Join obr_uslugi t2 on t.obr_treatment_id = t2.treat_id
 left Join man_workplace t3 on t3.man_id = t1.man_patient_id