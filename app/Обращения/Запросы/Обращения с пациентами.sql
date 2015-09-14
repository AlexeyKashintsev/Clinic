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
 Where (:start_date is null or :start_date <= t.treat_date)
 and (:end_date is null or :end_date = t.treat_date)
 and (:treat_status = t.treat_status or :treat_status is null)
 and (:usluga_id = t2.usluga_id or :usluga_id is null)
 and t2.selected = true
 and (:company_id = t3.company_id and t3.active = true or :company_id is null)