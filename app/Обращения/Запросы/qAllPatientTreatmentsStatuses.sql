/**
 * @public
 * @author Алексей
 * @name qAllPatientTreatmentsStatuses
 */ 
Select t.patient, t.treat_status 
From obr_treatment t
 Where (:start_date is null or :start_date <= t.treat_date)
 and (:end_date is null or :end_date = t.treat_date)