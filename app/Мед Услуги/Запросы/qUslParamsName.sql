/**
 * @public
 * @author Mikhail
 * @name qUslParamsName
 * @writable usl_params
 */ 
Select t.usl_params_id, t1.usl_params_list_id, t1.param_name, t.usluga_id, t.param_id 
From usl_params t
 Inner Join usl_params_list t1 on t.param_id = t1.usl_params_list_id
 Where (:p_usl_uslugi_id = t.usluga_id or :p_usl_uslugi_id is null)