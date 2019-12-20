import {Base64} from "js-base64";

let DataStore = {
    get: function (key) {

        let data = localStorage.getItem(
            Base64.encode(key)
        );
        if (data !== null) {
            if(this.isJson(Base64.decode(data)))
                return JSON.parse(
                    Base64.decode(data));
        }

        return null;
    },
    set: function (key, value) {
        localStorage.setItem(
            Base64.encode(key),
            Base64.encode(JSON.stringify(value))
        );
    },
    del: function (key) {
        localStorage.removeItem(key);
    },
    clear:function () {
        localStorage.clear();
    },
    isJson: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
};

export default DataStore;
