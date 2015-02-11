/**
 *
 * @author Алексей
 * @name qAllFirms
 * @public
 */ 
Select * 
From buh_companies t1
where t1.buh_companies_id = :company_id or :company_id is null