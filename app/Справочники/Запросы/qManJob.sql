/**
 * @public
 * @author minya92
 * @name qManJob
 */ 
Select * 
From man_job t1
Where (t1.job_title = :job_find or :job_find is null)