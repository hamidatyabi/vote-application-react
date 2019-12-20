import Config from "../config/Config";
import Lang from "../config/Lang";
import axios from "axios";
import {Base64} from "js-base64";
import DataStore from "../storage/DataStore";

let AuthenticationService = {
    token: function (username, password) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Base64.encode(Config.microservices.authentication.clientId + ":" + Config.microservices.authentication.clientSecret)
        }
        let dataParams = new FormData();
        dataParams.append("username", username);
        dataParams.append("password", password);
        dataParams.append("grant_type", "password");
        return axios.post(Config.microservices.authentication.url + Config.routes.token, dataParams, { headers: headers, withCredentials: true }).then(response => {
            return {
                status: response.status,
                result: response.data
            };
        }).catch(error => {
            if (error.message !== 'Network Error')
                return {
                    status: error.response.status,
                    result: Lang.networkErrorCode[error.response.status]
                };
            else
                return {
                    status: 0,
                    result: Lang.networkErrorCode[0]
                };
        });
    },
    getUserData: function (access_token, refresh_token) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
        return axios.get(Config.microservices.authentication.url + Config.routes.tokenInfo, { headers: headers }).then(response => {
            return {
                status: response.status,
                result: response.data
            };

        }).catch(error => {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.encode(Config.microservices.authentication.clientId + ":" + Config.microservices.authentication.clientSecret)
            }
            let dataParams = new FormData();
            dataParams.append("refresh_token", refresh_token);
            dataParams.append("grant_type", "refresh_token");
            return axios.post(Config.microservices.authentication.url + Config.routes.token, dataParams,{
                headers: headers
            }).then(responseRefresh => {
                console.log("Refresh Token")
                DataStore.set("auth", responseRefresh.data);
                return this.getUserData(responseRefresh.data.access_token, responseRefresh.data.refresh_token);
            }).catch(errorRefresh => {
                if(errorRefresh.message !== 'Network Error')
                    return {
                        status: errorRefresh.response.status,
                        result: Lang.networkErrorCode[errorRefresh.response.status]
                    };
                else
                    return {
                        status: 0,
                        result: Lang.networkErrorCode[0]
                    };
            });
        });
    },

}
export default AuthenticationService;