/**
 * @public
 * @author minya92
 * @name qMkbDeseases
 */ 
Select * 
From mkb_deseases t1
Where (:mkb_class = t1.mkb_class or :use_class is null or :use_class = false)
 and (t1.mkb_name = :mkb_find
 and t1.mkb_deseases_id = :mkb_find
 or :mkb_find is null)