/**
 * 
 * @author Алексей
 */
function AddressForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showOnPanel = function(aPanel) {
        aPanel.add(form.view);
    };
    
    self.setAddress = function(anAddress) {
        if (anAddress) {
            model.qAddress.params.address_id = anAddress;
            model.qAddress.requery(function() {

            });
        } else {
            model.qAddress.push({});
            return model.qAddress.cursor.oth_addresses_id;
        }
    };
    
    self.getAddress = function() {
        return model.qAddress.cursor.oth_addresses_id;
    };
    
    self.save = model.save;
    
    model.requery(function () {
        // TODO : place your code here
    });

    self.tabProcessor = new TabProcessor(form, ['tfState', 'tfArea', 'tfCity'
        , 'tfStreet', 'tfHouse', 'tfBuilding', 'tfFlat', 'tfZip']);
}
