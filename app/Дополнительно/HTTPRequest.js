/**
 * 
 * @author alexey
 * @constructor
 */
function HTTPRequest() {
    var self = this;
    var URL, module, method;

    var request = new XMLHttpRequest();
    
    function updateUrlByPlatypus() {
        var path = window.location.pathname;
        path = path.slice(0, path.lastIndexOf('/'));
        URL = window.location.protocol +'//' + window.location.host + path + '/application?__type=14&__moduleName=' + module + '&__methodName=' + method;
    }

    Object.defineProperty(self, 'URL', {
        get: function () {
            return URL;
        },
        set: function (aNewUrl) {
            URL = aNewUrl;
        }
    });
    
    Object.defineProperty(self, 'module', {
        get: function () {
            return module;
        },
        set: function (aNewModule) {
            module = aNewModule;
            updateUrlByPlatypus();
        }
    });    
    
    Object.defineProperty(self, 'method', {
        get: function () {
            return method;
        },
        set: function (aNewMethod) {
            method = aNewMethod;
            updateUrlByPlatypus();
        }
    });    

    function getParsedResponse(req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return result;
    }

    function execute(aMethod, aData, onSuccess, onFailure) {
        request.open(aMethod, URL, true);
        request.setRequestHeader('Content-type', 'text/plain');
        request.setRequestHeader('charset', 'utf-8');
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    onSuccess(getParsedResponse(request));
                } else {
                    onFailure(getParsedResponse(request));
                }
            }
        };
        request.send(aData);
    }

    self.get = function (onSuccess, onFailure) {
        execute('GET', null, onSuccess, onFailure);
    };

    self.post = function (aData, onSuccess, onFailure) {
        execute('POST', aData, onSuccess, onFailure);
    };

}
