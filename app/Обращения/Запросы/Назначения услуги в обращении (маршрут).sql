/**
 * @public
 * @author Алексей
 * @name qAllUslugiInTreat
 * @writable obr_uslugi
 */ 
Select * 
From obr_uslugi t
 Where t.route = true
 and :treat_id = t.treat_id