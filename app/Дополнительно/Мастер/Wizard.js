/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function Wizard(anActionForms, anInitData) {
    var self = this
            , form = P.loadForm(this.constructor.name);
    
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    var actionForms = anActionForms ? anActionForms : ['WizTest', 'WizTest_1'],
            activeForms = [], curFormIndex = 0, actForm;
    var lp = new LongProcessor([/*form.btnPrev, form.btnNext, form.btnFinish*/]);
    
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
            return form.btnFinish.enabled;
        },
        set: function(aState) {
            form.btnFinish.enabled = aState;
        }
    });
    
    self.next = function() {
        lp.start(form.btnNext, function() {
            function next() {
                curFormIndex++;
                initFormByIndex(actForm.nextData);
            }
            if (actForm.onBeforeNext) {
                actForm.onBeforeNext(next);
            } else next();
            
        });
    };
    
    self.prev = function() {
        lp.start(form.btnPrev, function() {
            curFormIndex--;
            initFormByIndex(actForm.prevData);
        });
    };
    
    self.finish = function() {
        actForm.doFinish();
    };
    
    function initFormByIndex(aData) {
        form.btnPrev.enabled = curFormIndex !== 0;
        form.btnNext.enabled = curFormIndex !== actionForms.length - 1;
        if (actForm)
            actForm.container.visible = false;
        if (!activeForms[curFormIndex]) {
            console.log('Новая форма ' + actionForms[curFormIndex]);
            actForm = activeForms[curFormIndex] = new window[actionForms[curFormIndex]];
            actForm.container = new P.AnchorsPane();
            actForm.controller = self;
            form.wPanel.add(actForm.container, new P.Anchors(1, null, 1, 1, null, 1));
            actForm.show();
        } else {
            actForm = activeForms[curFormIndex];
            actForm.container.visible = true;
        }
        if (aData)
            actForm.setData(aData);
        lp.stop();
    };
    
    P.require(actionForms, function() {
        initFormByIndex(anInitData);
    }, function() {
        console.log('Ошибка загрузки форм!');
    });
    
    form.btnNext.onActionPerformed = function(event) {
        self.next();
    };
    form.btnPrev.onActionPerformed = function(event) {
        self.prev();
    };
    form.btnFinish.onActionPerformed = function(event) {
        self.finish();
    };
    form.button.onActionPerformed = function(event) {
        actForm.container.visible = !actForm.container.visible;
    };
}
