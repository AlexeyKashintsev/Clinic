/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatWizard() {
    var self = this
            , form = P.loadForm(this.constructor.name);
    
    self.show = function () {
        form.show();
    };
    
    var actionForms = ['WizTest', 'WizTest_1'], activeForms = [];
    var curForm = 0, actForm;
    
    Object.defineProperty(self, 'nextBtn', {
        get: function() {
            return form.btnNext.enabled;
        },
        set: function(aState) {
            form.btnNext.enabled = aState;
        }
    });
    
    Object.defineProperty(self, 'prevBtn', {
        get: function() {
            return form.btnPrev.enabled;
        },
        set: function(aState) {
            form.btnPrev.enabled = aState;
        }
    });
    
    Object.defineProperty(self, 'finishBtn', {
        get: function() {
            return form.btnFinish.enabled
        },
        set: function(aState) {
            form.btnFinish.enabled = aState;
        }
    });
    
    self.next = function() {
        
    };
    
    self.prev = function() {
        
    };
    
    self.finish = function() {
        
    };
    
    function initFormByIndex() {
        form.btnPrev.enabled = curForm !== 0;
        form.btnNext.enabled = curForm !== actionForms.length - 1;
        if (actForm)
            actForm.container.visible = false;
        if (!activeForms[curForm]) {
            console.log('Новая форма ' + actionForms[curForm]);
            actForm = activeForms[curForm] = eval('new ' + actionForms[curForm]);
            actForm.container = new P.AnchorsPane();
            actForm.controller = self;
            form.wPanel.add(actForm.container, new P.Anchors(1, null, 1, 1, null, 1));
            actForm.show();
        } else {
            actForm = activeForms[curForm];
            actForm.container.visible = true;
        }
    };
    
    P.require(actionForms, initFormByIndex, function() {
        console.log('Ошибка загрузки форм!');
    });
    
    form.btnNext.onActionPerformed = function(event) {
        curForm++;
        initFormByIndex();
    };
    form.btnPrev.onActionPerformed = function(event) {
        curForm--;
        initFormByIndex();
    };
    form.button.onActionPerformed = function(event) {
        actForm.hide();
    };
}
