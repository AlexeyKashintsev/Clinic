/**
 * @public
 * @author Mikhail
 * @name qObrAdditional
 */ 
Select * 
From obr_uslugi t1
 Where :treat_id = t1.treat_id
 And t1.additional = true