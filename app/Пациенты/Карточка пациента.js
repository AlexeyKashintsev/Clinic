/**
 * 
 * @author Алексей
 */
function PatientForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var contAgSel, jobSel, hazSel, patientId;
    var address = new AddressForm();
    address.showOnPanel(form.pnlAddress);
    var diagnosesForm = new DiagnosesForm();
    diagnosesForm.showOnPanel(form.pnlDiagnoses);
    var buhIinshuranceCompanyForm = false;
    var lp = new LongProcessor([form.btnSave, form.btnCancel]);
    var selectPriceListView;
    
    self.setParams = function(aPatientId) {
        model.qPatientById.params.patient_id = patientId = aPatientId ? aPatientId : null;
        model.qTreatByPatient.params.patient_id = aPatientId;
        model.qWorkPlaceByPatient.params.patient_id = aPatientId;
        diagnosesForm.setPacient(aPatientId);
        
        model.requery(function() {
            if (!patientId) {
                model.qPatientById.push({});
                patientId = model.qPatientById.cursor.man_patient_id;
                
            }
            var adr = address.setAddress(model.qPatientById.cursor.address);
            if (model.qPatientById.cursor.address === null) 
                model.qPatientById.cursor.address = adr;
        });
    };
    
    
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };

    model.requery();
    
    form.btnSave.onActionPerformed = function(event) {
        lp.start(this, function(){
            model.save(function() {
                address.save(function(){lp.stop();});
                form.close(model.qPatientById.cursor.man_patient_id);
            });
        });
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.revert();
        form.close(false);
    };
    
    form.btnAddWorkPlace.onActionPerformed = function(event) {
        if (!contAgSel)
            contAgSel = new CompaniesList();
        if (!jobSel)
            jobSel = new ManJobForm();
        contAgSel.showModal(function(aContagent) {
            if (aContagent){
                jobSel.showModal(function(aJob) {
                    if (aJob)
                        model.qWorkPlaceByPatient.push({
                            company_id: aContagent.id,
                            job_id: aJob,
                            man_id: patientId,
                            active: true
                        });
                });
                model.qAllFirms.requery();
                //model.qWorkPlaceByPatient.requery();
            }
        });
    };
    
    form.mgWorkPlace.colCompany.onSelect = function(aEvt) {
        if (!contAgSel)
            contAgSel = new CompanySelectorView();
        contAgSel.showModal(function(aContagent) {
            if (aContagent) {
                model.qWorkPlaceByPatient.cursor.company_id = aContagent;
            }
        });
    };
    
    form.mgWorkPlace.colJobTitle.onSelect = function(aEvt) {
        if (!jobSel)
            jobSel = new ManJobForm();
        jobSel.showModal(function(aJob) {
            if (aJob) {
                model.qWorkPlaceByPatient.cursor.job_id = aJob;
            }
        });
    };
    form.btnAddHazard.onActionPerformed = function(event) {
        if (!hazSel)
            hazSel = new HazardForm();
        
        var filter = prompt("Быстрый поиск вредности:");
        hazSel.setFilter(filter);
        
        hazSel.showModal(function(aHazard) {
            if (aHazard)
                model.qHazardsByManJob.push({
                    workplace_id: model.qHazardsByManJob.params.workplaceId,
                    hazard_id: aHazard,
                    haz_short_name: hazSel.getHazardName(aHazard)
                });
        });
    };
    form.btnDelHazard.onActionPerformed = function(event) {
        model.qHazardsByManJob.remove(model.qHazardsByManJob.cursorPos);
    };
    
    self.tabProcessor = new TabProcessor(form, ['tfCardNumber', 'tfSanitaryBook', 'tfSurname', 'tfName'
        , 'tfPatronymic', 'mdDateOfBirth', address, 'tfOMSNumber', 'tfDrugIntolerance'
        , 'btnSave']);
    
    form.button.onActionPerformed = function(event) {
        if(!buhIinshuranceCompanyForm){
            buhIinshuranceCompanyForm = new BuhIinshuranceCompanyForm();
        }
        buhIinshuranceCompanyForm.showModal(function(anInshuranceCompany){
            if (anInshuranceCompany)
                model.qPatientById.cursor.inshurance_company = anInshuranceCompany;
            //form.ddBuhIinshuranceCompany.redraw();
        });
    };

    form.btnFromPrice.onActionPerformed = function(event) {
        if(!selectPriceListView) selectPriceListView = new SelectPriceListView();
        selectPriceListView.showModal(function(aPrice){
            if(aPrice){
                alert(aPrice.contract_id + " " + aPrice.contr_name);
            }
        });
    };
}
