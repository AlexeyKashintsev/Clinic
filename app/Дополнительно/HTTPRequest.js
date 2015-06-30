/**
 * 
 * @author alexey
 * @constructor
 */
function HTTPRequest() {
    var self = this;
    var URL;



    var request = new XMLHttpRequest();

    Object.defineProperty(self, 'URL', {
        get: function () {
            return URL;
        },
        set: function (aNewUrl) {
            URL = aNewUrl;
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
        request.open(aMethod, self.URL, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
