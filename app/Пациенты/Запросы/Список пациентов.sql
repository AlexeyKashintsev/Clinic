/**
 *
 * @author Алексей
 * @name qPatientsByParams
 * @public
 * @readonly
 */ 
Select t1.man_patient_id, t1.surname, t1.firstname
, t1.patronymic, t1.sex, t1.date_oft_birth, t1.phone, t1.email
, t.company_id, t.job_id, null AS patient_status 
From man_patient t1
 Left Join man_workplace t on t.man_id = t1.man_patient_id
 and t.active = true
 Where (:firstname is null or t1.firstname Like '%' || :firstname || '%')
 and (:surname is null or t1.surname Like '%' || :surname || '%')
 and (:company_id = t.company_id or :company_id is null)
 and (:treat_status = t1.sex)