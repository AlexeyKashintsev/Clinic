/**
 * @public
 * @author minya92
 * @constructor
 */ 
function LongProcessor(InactiveList) {
    var self = this;
    var oldIcon = null;
    var Button = null;
    
    self.start = function(aBtn,aProcess) {
        if(aBtn.icon) oldIcon = aBtn.icon;
        Button = aBtn;

        P.Icon.load('icons/loading20x20.gif', function(data){
            Button.icon = data;
            if(InactiveList){
                InactiveList.forEach(function(aComponent) {
                    aComponent.enabled = false;
                });
            }
            aProcess();
        });
    };
    
    self.stop = function(){
        Button.icon = oldIcon;
        if(InactiveList){
            InactiveList.forEach(function(aComponent) {
                aComponent.enabled = true;
            });
        }
    };
   
}
