/**
 *
 * @author Алексей
 * @name qAllFirms
 * @public
 */ 
Select * 
From buh_companies t1
 Where (t1.buh_companies_id = :company_id or :company_id is null)
 and (t1.company_name = :company_find
        or t1.company_short_name = :company_find
        or t1.reg_address = :company_find
        or :company_find is null)