/**
 * @public
 * @author minya92
 * @constructor
 */ 
function LongProcessor(InactiveList) {
    var self = this;
    var oldIcon = null,
        Button = null, oldStates = [],
        started = false;
    
    self.start = function(aBtn,aProcess) {
        if(aBtn.icon) oldIcon = aBtn.icon;
        Button = aBtn;
        started = true;
        P.Icon.load('icons/loading20x20.gif', function(data){
            Button.icon = data;
            if (InactiveList){
                InactiveList.forEach(function(aComponent) {
                    oldStates[aComponent] = aComponent.enabled;
                    aComponent.enabled = false;
                });
            }
            aProcess();
        });
    };
    
    self.stop = function(){
        if (started) {
            Button.icon = oldIcon;
            if(InactiveList){
                InactiveList.forEach(function(aComponent) {
                    aComponent.enabled = oldStates[aComponent];
                });
                oldStates = [];
            }
            started = false;
        }
    };
   
}
