/**
 * @public
 * @author Mikhail
 * @name qResultsForm
 */ 
Select * 
From usl_params_list t1
Where (t1.param_name = :usl_find or :usl_find is null)
