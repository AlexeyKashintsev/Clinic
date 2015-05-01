/**
 * 
 * @author Алексей
 * @constructor
 * @public
 */ 
function TabProcessor(aForm, anElements) {
    var self = this;
    var parent;
    var currentFocus;

    var fields = anElements;

    var focus = (function(aNextIndex) {
        if (typeof fields[aNextIndex] === 'string' && aForm[fields[aNextIndex]]){
            aForm[fields[aNextIndex]].focus();
            currentFocus = aNextIndex;
        } else {
            if (typeof fields[aNextIndex] === 'object') {
                var childOrd = fields[aNextIndex].tabProcessor;
                childOrd.setParent(this);
                currentFocus < aNextIndex ? childOrd.first() : childOrd.last();
                currentFocus = aNextIndex;
            } else {
                if (aNextIndex < 0 && parent) {
                    parent.prev();
                }
                if (aNextIndex >= fields.length && parent) {
                    parent.next();
                }
            }
        }
    }).bind(this);

    function first() {
        focus(0);
    }

    function last() {
        focus(fields.length - 1);
    }

    function prev() {
        focus(currentFocus - 1);
    }

    function next() {
        focus(currentFocus + 1);
    }

    function btnClickProcess(event) {
        for (var j in fields)
            if (fields[j] === this.name)
                currentFocus = parseInt(j);
        if (currentFocus !== null) {
            switch (event.key) {
//                    case 9: //Tab key
//                        event.controlDown ? focus(fNum-1) : focus(fNum+1);
//                        break;
                case 13: //Enter key
                case 40: //Down key
                    next();
                    break;
                case 38: //Up key
                    prev();
                    break;
            }
        }
    }

    for (var j in fields) {
        if (typeof fields[j] === 'string')
            aForm[fields[j]].onKeyPressed = btnClickProcess;
    }

    this.first = first;
    this.last = last;
    this.prev = prev;
    this.next = next;

    this.setParent = function(aParent) {
        parent = aParent;
    };
}
