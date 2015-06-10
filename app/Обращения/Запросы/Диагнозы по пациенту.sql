/**
 * @public
 * @author Mikhail
 * @name qDiagnosesPacient
 */ 
Select * 
From obr_diagnosis t1
 Inner Join mkb_deseases t on t1.mkb_desease = t.mkb_deseases_id
 Where :pacient_id = t1.patient_id