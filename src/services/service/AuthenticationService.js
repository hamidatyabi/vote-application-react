import Config from "../config/Config";
import Lang from "../config/Lang";
import axios from "axios";
import {Base64} from "js-base64";

let AuthenticationService = {
    token: function (username, password) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Base64.encode(Config.oauth2[Config.environment].clientId + ":" + Config.oauth2[Config.environment].clientSecret)
        }
        let dataParams = new FormData();
        dataParams.append("username", username);
        dataParams.append("password", password);
        dataParams.append("grant_type", "password");
        return axios.post(Config.api[Config.environment].url + Config.routes.token, dataParams, { headers: headers, withCredentials: true }).then(response => {
            return {
                status: response.status,
                result: response.data
            };
        }).catch(error => {
            return {
                status: error.response.status,
                result: Lang.networkErrorCode[error.response.status]
            };
        });
    },
    getUserData: function (access_token, refresh_token) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
        return axios.get(Config.api[Config.environment].url + Config.routes.tokenInfo, { headers: headers }).then(response => {
            return {
                status: response.status,
                result: response.data
            };

        }).catch(error => {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.encode(Config.oauth2[Config.environment].clientId + ":" + Config.oauth2[Config.environment].clientSecret)
            }
            let dataParams = new FormData();
            dataParams.append("refresh_token", refresh_token);
            dataParams.append("grant_type", "refresh_token");
            return axios.post(Config.api[Config.environment].url + Config.routes.token, dataParams,{
                headers: headers
            }).then(responseRefresh => {
                return {
                    status: responseRefresh.status,
                    result: responseRefresh.data
                };
            }).catch(errorRefresh => {
                return {
                    status: errorRefresh.response.status,
                    result: Lang.networkErrorCode[errorRefresh.response.status]
                };
            });
        });
    },

}
export default AuthenticationService;