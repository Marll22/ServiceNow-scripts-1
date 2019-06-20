/**
 * sample http request in servicenow using RESTMessageV2 server side api
 * tested running in ServiceNow Geneva Release as a background script in global scope
 */
(function sample_http_request() {
    try {
        var request = new sn_ws.RESTMessageV2();
        request.setHttpMethod('get');
        request.setEndpoint('https://api.myjson.com/bins/4j985');
        
        // api.myjson.com/bins/4j985 is just a static JSON data store


        var response = request.execute();
        var httpResponseStatus = response.getStatusCode();
        var httpResponseContentType = response.getHeader('Content-Type');
        var parser = new global.JSONParser();
        var parsed = {};
        var httpResponseBody;


        gs.debug("http response status_code: " + httpResponseStatus);
        gs.debug("http response content-type: " + httpResponseContentType);


        //  if request is successful then parse the response body
        if (httpResponseStatus == 200 && httpResponseContentType == 'application/json') {
            httpResponseBody = response.getBody();

            //  parse JSON string returned from request into a json object
            parsed = parser.parse(httpResponseBody);

            // iterate over JSON object only printing the id property of JSON objects in results array
            for (var i = 0; i < parsed.results.length; i++) {
                gs.print('id: ' + parsed.results[i].id)
            }
        }
    }
    catch (ex) {
        var message = ex.getMessage();
        gs.debug(message);
    }
})();
