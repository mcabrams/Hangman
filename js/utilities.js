/* Various utility method/functions */

var U = {

    /* Simple way to grab reference to specific document elements */
    $: function(id) {
        "use strict";

        if (typeof id === "string"){
            return document.getElementById(id);
        }
    },

    /* Set text in cross-browser compatible manner */
    setText: function(id, message){
        "use strict";

        if (typeof id === "string"){

            var output = this.$(id);
            if (!output) return false;
            if (output.textContent !== undefined) {
                output.textContent = message;
            }
            else {
                output.innerText = message;
            }

            return true;

        }
    },

    /* Add events in cross-browser compatible manner */
    addEvent: function(obj, type, fn){
        "use strict";

        if (obj && obj.addEventListener){
            obj.addEventListener(type, fn, false);
        } else if (obj && obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    },

    /* Remove events in cross-browser compatible manner */
    removeEvent: function(obj, type, fn){
        "use strict";

        if (obj && obj.removeEventListener){
            obj.removeEventListener(type, fn, false);
        }
        else if (obj && obj.detachEvent){
            obj.detachEvent("on" + type, fn);
        }
    },

    preventDef: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
};