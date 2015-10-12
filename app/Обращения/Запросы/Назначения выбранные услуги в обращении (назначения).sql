/**
 * @public
 * @author Алексей
 * @name qUslugiInTreat
 * @writable obr_uslugi
 */ 
Select * 
From obr_uslugi t
 Where t.selected = true
 and :treat_id = t.treat_id