/**
 * @public
 * @author Алексей
 * @name qUslugiInTreat
 * @writable obr_uslugi
 */ 
Select * 
From obr_treatment t1
 Left Join obr_uslugi t on t1.obr_treatment_id = t.treat_id
 Where :treat_id = t1.obr_treatment_id
 And t.selected = true