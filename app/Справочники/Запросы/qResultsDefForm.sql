/**
 * @public
 * @author Mikhail
 * @name qResultsDefForm
 */ 
Select * 
From usl_params_def_values t1
 Where (:usl_params_list_id = t1.param_id or :usl_params_list_id is null)