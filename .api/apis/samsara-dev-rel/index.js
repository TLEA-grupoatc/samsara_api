"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'samsara-dev-rel/2024-02-06 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Returns a list of all addresses in an organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Addresses** under the Addresses category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all addresses
     */
    SDK.prototype.listAddresses = function (metadata) {
        return this.core.fetch('/addresses', 'get', metadata);
    };
    /**
     * Creates a new address in the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Addresses** under the Addresses category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create an address
     */
    SDK.prototype.createAddress = function (body) {
        return this.core.fetch('/addresses', 'post', body);
    };
    /**
     * Delete a specific address.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Addresses** under the Addresses category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete an address
     */
    SDK.prototype.deleteAddress = function (metadata) {
        return this.core.fetch('/addresses/{id}', 'delete', metadata);
    };
    /**
     * Returns a specific address.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Addresses** under the Addresses category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve an address
     */
    SDK.prototype.getAddress = function (metadata) {
        return this.core.fetch('/addresses/{id}', 'get', metadata);
    };
    /**
     * Update a specific address.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Addresses** under the Addresses category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update an address
     */
    SDK.prototype.updateAddress = function (body, metadata) {
        return this.core.fetch('/addresses/{id}', 'patch', body, metadata);
    };
    /**
     * Delete an alert configuration.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Alerts** under the Alerts category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Delete alert configurations.
     * @throws FetchError<401, types.DeleteConfigurationsResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteConfigurationsResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteConfigurationsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteConfigurationsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteConfigurationsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteConfigurationsResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteConfigurationsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteConfigurationsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteConfigurationsResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteConfigurations = function (metadata) {
        return this.core.fetch('/alerts/configurations', 'delete', metadata);
    };
    /**
     * Get alert configurations.
     *
     * The following trigger types are API enabled and will show up in the results:
     * Vehicle Speed
     * Gateway Unplugged
     * Asset starts moving
     * Inside Geofence
     * Outside Geofence
     * Unassigned Driving
     * Driver HOS Violation
     * Vehicle Engine Idle
     * Harsh Event
     * Scheduled Maintenance
     * Scheduled Maintenance by Odometer
     * If vehicle is severely speeding (as defined by your organization)
     * DVIR Submitted for Asset
     * Geofence Entry
     * Geofence Exit
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Alerts** under the Alerts category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get alert configurations.
     * @throws FetchError<401, types.GetConfigurationsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetConfigurationsResponse404> Not Found response.
     * @throws FetchError<405, types.GetConfigurationsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetConfigurationsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetConfigurationsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetConfigurationsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetConfigurationsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetConfigurationsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetConfigurationsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getConfigurations = function (metadata) {
        return this.core.fetch('/alerts/configurations', 'get', metadata);
    };
    /**
     * Updates an alert configuration.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Alerts** under the Alerts category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update alert configurations.
     * @throws FetchError<401, types.PatchConfigurationsResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchConfigurationsResponse404> Not Found response.
     * @throws FetchError<405, types.PatchConfigurationsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchConfigurationsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchConfigurationsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchConfigurationsResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchConfigurationsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchConfigurationsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchConfigurationsResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchConfigurations = function (body) {
        return this.core.fetch('/alerts/configurations', 'patch', body);
    };
    /**
     * Creates an alert configuration.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Alerts** under the Alerts category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Create alert configurations.
     * @throws FetchError<401, types.PostConfigurationsResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostConfigurationsResponse404> Not Found response.
     * @throws FetchError<405, types.PostConfigurationsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostConfigurationsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostConfigurationsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostConfigurationsResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostConfigurationsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostConfigurationsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostConfigurationsResponse504> Gateway Timeout response.
     */
    SDK.prototype.postConfigurations = function (body) {
        return this.core.fetch('/alerts/configurations', 'post', body);
    };
    /**
     * Get alert incidents.
     *
     *  <b>Rate limit:</b> 10 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Alerts** under the Alerts category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get alert incidents.
     * @throws FetchError<401, types.GetIncidentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIncidentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetIncidentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIncidentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIncidentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIncidentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIncidentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIncidentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIncidentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIncidents = function (metadata) {
        return this.core.fetch('/alerts/incidents/stream', 'get', metadata);
    };
    /**
     * Delete an existing asset.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assets** under the Assets category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Delete an existing asset.
     * @throws FetchError<401, types.DeleteAssetResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteAssetResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteAssetResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteAssetResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteAssetResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteAssetResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteAssetResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteAssetResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteAssetResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteAsset = function (metadata) {
        return this.core.fetch('/assets', 'delete', metadata);
    };
    /**
     * List all assets.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Assets** under the Assets category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] List all assets.
     * @throws FetchError<401, types.ListAssetsResponse401> Unauthorized response.
     * @throws FetchError<404, types.ListAssetsResponse404> Not Found response.
     * @throws FetchError<405, types.ListAssetsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.ListAssetsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.ListAssetsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.ListAssetsResponse501> Not Implemented response.
     * @throws FetchError<502, types.ListAssetsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.ListAssetsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.ListAssetsResponse504> Gateway Timeout response.
     */
    SDK.prototype.listAssets = function (metadata) {
        return this.core.fetch('/assets', 'get', metadata);
    };
    /**
     * Update an existing asset.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assets** under the Assets category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update an existing asset.
     * @throws FetchError<401, types.UpdateAssetResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateAssetResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateAssetResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateAssetResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateAssetResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateAssetResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateAssetResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateAssetResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateAssetResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateAsset = function (body, metadata) {
        return this.core.fetch('/assets', 'patch', body, metadata);
    };
    /**
     * Create a new asset.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assets** under the Assets category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Create a new asset.
     * @throws FetchError<401, types.CreateAssetResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateAssetResponse404> Not Found response.
     * @throws FetchError<405, types.CreateAssetResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateAssetResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateAssetResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateAssetResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateAssetResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateAssetResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateAssetResponse504> Gateway Timeout response.
     */
    SDK.prototype.createAsset = function (body) {
        return this.core.fetch('/assets', 'post', body);
    };
    /**
     * Fetch all attributes in an organization associated with either drivers or assets.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Attributes** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all attributes by entity type
     */
    SDK.prototype.getAttributesByEntityType = function (metadata) {
        return this.core.fetch('/attributes', 'get', metadata);
    };
    /**
     * Creates a new attribute in the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Attributes** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create an attribute
     */
    SDK.prototype.createAttribute = function (body) {
        return this.core.fetch('/attributes', 'post', body);
    };
    /**
     * Delete an attribute by id, including all of its applications.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Attributes** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Deleting an attribute
     */
    SDK.prototype.deleteAttribute = function (metadata) {
        return this.core.fetch('/attributes/{id}', 'delete', metadata);
    };
    /**
     * Fetch an attribute by id, including all of its applications.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Attributes** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve an attribute
     */
    SDK.prototype.getAttribute = function (metadata) {
        return this.core.fetch('/attributes/{id}', 'get', metadata);
    };
    /**
     * Updates an attribute in the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Attributes** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update an attribute
     */
    SDK.prototype.updateAttribute = function (body, metadata) {
        return this.core.fetch('/attributes/{id}', 'patch', body, metadata);
    };
    /**
     * Get a list of equipment following the AEMP ISO 15143-3 standard.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read AEMP** under the Equipment category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get a list of AEMP equipment
     * @throws FetchError<401, types.GetAempEquipmentListResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetAempEquipmentListResponse404> Not Found response.
     * @throws FetchError<405, types.GetAempEquipmentListResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetAempEquipmentListResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetAempEquipmentListResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetAempEquipmentListResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetAempEquipmentListResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetAempEquipmentListResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetAempEquipmentListResponse504> Gateway Timeout response.
     */
    SDK.prototype.getAempEquipmentList = function (metadata) {
        return this.core.fetch('/beta/aemp/Fleet/{pageNumber}', 'get', metadata);
    };
    /**
     * Get all driver and associated vehicle efficiency data.
     *
     *  <b>Rate limit:</b> 50 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Fuel & Energy** under the Fuel & Energy category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary [beta] List driver efficiency
     */
    SDK.prototype.getDriverEfficiency = function (metadata) {
        return this.core.fetch('/beta/fleet/drivers/efficiency', 'get', metadata);
    };
    /**
     * Update an equipment.  **Note** this implementation of patch uses [the JSON merge
     * patch](https://tools.ietf.org/html/rfc7396) proposed standard.
     *  This means that any fields included in the patch request will _overwrite_ fields which
     * exist on the target resource.
     *  For arrays, this means any array included in the request will _replace_ the array that
     * exists at the specified path, it will not _add_ to the existing array
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update an equipment
     * @throws FetchError<401, types.PatchEquipmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchEquipmentResponse404> Not Found response.
     * @throws FetchError<405, types.PatchEquipmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchEquipmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchEquipmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchEquipmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchEquipmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchEquipmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchEquipmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchEquipment = function (body, metadata) {
        return this.core.fetch('/beta/fleet/equipment/{id}', 'patch', body, metadata);
    };
    /**
     * Get all HOS ELD events in a time range, grouped by driver. Attributes will be populated
     * depending on which ELD Event Type is being returned.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get driver HOS ELD events
     * @throws FetchError<401, types.GetHosEldEventsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetHosEldEventsResponse404> Not Found response.
     * @throws FetchError<405, types.GetHosEldEventsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetHosEldEventsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetHosEldEventsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetHosEldEventsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetHosEldEventsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetHosEldEventsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetHosEldEventsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getHosEldEvents = function (metadata) {
        return this.core.fetch('/beta/fleet/hos/drivers/eld-events', 'get', metadata);
    };
    /**
     * Returns the last known stats of all trailers at the given `time`. If no `time` is
     * specified, the current time is used.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trailer Statistics** under the Trailers category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get trailer stats
     * @throws FetchError<401, types.GetTrailerStatsSnapshotResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetTrailerStatsSnapshotResponse404> Not Found response.
     * @throws FetchError<405, types.GetTrailerStatsSnapshotResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetTrailerStatsSnapshotResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetTrailerStatsSnapshotResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetTrailerStatsSnapshotResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetTrailerStatsSnapshotResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetTrailerStatsSnapshotResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetTrailerStatsSnapshotResponse504> Gateway Timeout response.
     */
    SDK.prototype.getTrailerStatsSnapshot = function (metadata) {
        return this.core.fetch('/beta/fleet/trailers/stats', 'get', metadata);
    };
    /**
     * Follow a feed of trailer stats.
     *
     * The first call to this endpoint will provide the most recent stats for each trailer and
     * an `endCursor`.
     *
     * Providing the `endCursor` value to the `after` query parameter will fetch all updates
     * since the previous API call.
     *
     * If `hasNextPage` is false, no new data is immediately available. Please wait a minimum
     * of 5 seconds before making a subsequent request.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trailer Statistics** under the Trailers category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get trailer stats feed
     * @throws FetchError<401, types.GetTrailerStatsFeedResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetTrailerStatsFeedResponse404> Not Found response.
     * @throws FetchError<405, types.GetTrailerStatsFeedResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetTrailerStatsFeedResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetTrailerStatsFeedResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetTrailerStatsFeedResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetTrailerStatsFeedResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetTrailerStatsFeedResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetTrailerStatsFeedResponse504> Gateway Timeout response.
     */
    SDK.prototype.getTrailerStatsFeed = function (metadata) {
        return this.core.fetch('/beta/fleet/trailers/stats/feed', 'get', metadata);
    };
    /**
     * Returns trailer stats during the given time range for all trailers. This can be
     * optionally filtered by tags or specific trailer IDs.
     *
     *  <b>Rate limit:</b> 10 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trailer Statistics** under the Trailers category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get trailer stats history
     * @throws FetchError<401, types.GetTrailerStatsHistoryResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetTrailerStatsHistoryResponse404> Not Found response.
     * @throws FetchError<405, types.GetTrailerStatsHistoryResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetTrailerStatsHistoryResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetTrailerStatsHistoryResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetTrailerStatsHistoryResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetTrailerStatsHistoryResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetTrailerStatsHistoryResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetTrailerStatsHistoryResponse504> Gateway Timeout response.
     */
    SDK.prototype.getTrailerStatsHistory = function (metadata) {
        return this.core.fetch('/beta/fleet/trailers/stats/history', 'get', metadata);
    };
    /**
     * Update the engine immobilizer state of a vehicle. This requires an engine immobilizer to
     * be installed on the vehicle gateway.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Vehicle Immobilization** under the Vehicles
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update engine immobilizer state of a vehicle.
     * @throws FetchError<401, types.UpdateEngineImmobilizerStateResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateEngineImmobilizerStateResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateEngineImmobilizerStateResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateEngineImmobilizerStateResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateEngineImmobilizerStateResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateEngineImmobilizerStateResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateEngineImmobilizerStateResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateEngineImmobilizerStateResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateEngineImmobilizerStateResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateEngineImmobilizerState = function (body, metadata) {
        return this.core.fetch('/beta/fleet/vehicles/{id}/immobilizer', 'patch', body, metadata);
    };
    /**
     * Deletes an existing job.
     *
     * To use this endpoint, select **Write Jobs** under the Equipment category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Deletes an existing job
     * @throws FetchError<401, types.DeleteJobResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteJobResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteJobResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteJobResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteJobResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteJobResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteJobResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteJobResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteJobResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteJob = function (metadata) {
        return this.core.fetch('/beta/industrial/jobs', 'delete', metadata);
    };
    /**
     * Fetches jobs based on id/uuid or provided filters.
     *
     * To use this endpoint, select **Read Jobs** under the Equipment category when creating or
     * editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Fetches all jobs
     * @throws FetchError<401, types.GetJobsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetJobsResponse404> Not Found response.
     * @throws FetchError<405, types.GetJobsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetJobsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetJobsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetJobsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetJobsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetJobsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetJobsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getJobs = function (metadata) {
        return this.core.fetch('/beta/industrial/jobs', 'get', metadata);
    };
    /**
     * Patches an existing job and returns it.
     *
     * To use this endpoint, select **Write Jobs** under the Equipment category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Patches a job
     * @throws FetchError<401, types.PatchJobResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchJobResponse404> Not Found response.
     * @throws FetchError<405, types.PatchJobResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchJobResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchJobResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchJobResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchJobResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchJobResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchJobResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchJob = function (body, metadata) {
        return this.core.fetch('/beta/industrial/jobs', 'patch', body, metadata);
    };
    /**
     * Creates a new job and returns it.
     *
     * To use this endpoint, select **Write Jobs** under the Equipment category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Create a job
     * @throws FetchError<401, types.CreateJobResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateJobResponse404> Not Found response.
     * @throws FetchError<405, types.CreateJobResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateJobResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateJobResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateJobResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateJobResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateJobResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateJobResponse504> Gateway Timeout response.
     */
    SDK.prototype.createJob = function (body) {
        return this.core.fetch('/beta/industrial/jobs', 'post', body);
    };
    /**
     * This endpoint will return coach assignments for your organization based on the
     * parameters passed in. Results are paginated.
     *
     *  <b>Rate limit:</b> 10 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Coaching** under the Coaching category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get driver coach assignments.
     * @throws FetchError<401, types.GetDriverCoachAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDriverCoachAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.GetDriverCoachAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDriverCoachAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDriverCoachAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDriverCoachAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDriverCoachAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDriverCoachAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDriverCoachAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDriverCoachAssignment = function (metadata) {
        return this.core.fetch('/coaching/driver-coach-assignments', 'get', metadata);
    };
    /**
     * This endpoint will update an existing or create a new coach-to-driver assignment for
     * your organization based on the parameters passed in. This endpoint should only be used
     * for existing Coach to Driver assignments. In order to remove a driver-coach-assignment
     * for a given driver, set coachId to null
     *
     *  <b>Rate limit:</b> 10 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Coaching** under the Coaching category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Put driver coach assignments.
     * @throws FetchError<401, types.PutDriverCoachAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.PutDriverCoachAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.PutDriverCoachAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PutDriverCoachAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PutDriverCoachAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PutDriverCoachAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.PutDriverCoachAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PutDriverCoachAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PutDriverCoachAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.putDriverCoachAssignment = function (metadata) {
        return this.core.fetch('/coaching/driver-coach-assignments', 'put', metadata);
    };
    /**
     * This endpoint will return coaching sessions for your organization based on the time
     * parameters passed in. Results are paginated by sessions. If you include an endTime, the
     * endpoint will return data up until that point. If you don’t include an endTime, you can
     * continue to poll the API real-time with the pagination cursor that gets returned on
     * every call.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Coaching** under the Coaching category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get coaching sessions.
     * @throws FetchError<401, types.GetCoachingSessionsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetCoachingSessionsResponse404> Not Found response.
     * @throws FetchError<405, types.GetCoachingSessionsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetCoachingSessionsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetCoachingSessionsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetCoachingSessionsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetCoachingSessionsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetCoachingSessionsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetCoachingSessionsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getCoachingSessions = function (metadata) {
        return this.core.fetch('/coaching/sessions/stream', 'get', metadata);
    };
    /**
     * Returns a list of all contacts in an organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Alert Contacts** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all contacts
     */
    SDK.prototype.listContacts = function (metadata) {
        return this.core.fetch('/contacts', 'get', metadata);
    };
    /**
     * Add a contact to the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Alert Contacts** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a contact
     */
    SDK.prototype.createContact = function (body) {
        return this.core.fetch('/contacts', 'post', body);
    };
    /**
     * Delete the given contact.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Alert Contacts** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete a contact
     */
    SDK.prototype.deleteContact = function (metadata) {
        return this.core.fetch('/contacts/{id}', 'delete', metadata);
    };
    /**
     * Get a specific contact's information.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Alert Contacts** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a contact
     */
    SDK.prototype.getContact = function (metadata) {
        return this.core.fetch('/contacts/{id}', 'get', metadata);
    };
    /**
     * Update a specific contact's information.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Alert Contacts** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a contact
     */
    SDK.prototype.updateContact = function (body, metadata) {
        return this.core.fetch('/contacts/{id}', 'patch', body, metadata);
    };
    /**
     * Get DVIR defect types.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Defect Types** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get DVIR defect types.
     * @throws FetchError<401, types.GetDefectTypesResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDefectTypesResponse404> Not Found response.
     * @throws FetchError<405, types.GetDefectTypesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDefectTypesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDefectTypesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDefectTypesResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDefectTypesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDefectTypesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDefectTypesResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDefectTypes = function (metadata) {
        return this.core.fetch('/defect-types', 'get', metadata);
    };
    /**
     * Stream DVIR defects.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Defects** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Stream DVIR defects.
     * @throws FetchError<401, types.StreamDefectsResponse401> Unauthorized response.
     * @throws FetchError<404, types.StreamDefectsResponse404> Not Found response.
     * @throws FetchError<405, types.StreamDefectsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.StreamDefectsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.StreamDefectsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.StreamDefectsResponse501> Not Implemented response.
     * @throws FetchError<502, types.StreamDefectsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.StreamDefectsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.StreamDefectsResponse504> Gateway Timeout response.
     */
    SDK.prototype.streamDefects = function (metadata) {
        return this.core.fetch('/defects/stream', 'get', metadata);
    };
    /**
     * Get currently active driver-trailer assignments for driver.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get currently active driver-trailer assignments for driver.
     * @throws FetchError<401, types.GetDriverTrailerAssignmentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDriverTrailerAssignmentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDriverTrailerAssignmentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDriverTrailerAssignmentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDriverTrailerAssignmentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDriverTrailerAssignmentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDriverTrailerAssignmentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDriverTrailerAssignmentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDriverTrailerAssignmentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDriverTrailerAssignments = function (metadata) {
        return this.core.fetch('/driver-trailer-assignments', 'get', metadata);
    };
    /**
     * Update an existing driver-trailer assignment.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update an existing driver-trailer assignment.
     * @throws FetchError<401, types.UpdateDriverTrailerAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateDriverTrailerAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateDriverTrailerAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateDriverTrailerAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateDriverTrailerAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateDriverTrailerAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateDriverTrailerAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateDriverTrailerAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateDriverTrailerAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateDriverTrailerAssignment = function (body, metadata) {
        return this.core.fetch('/driver-trailer-assignments', 'patch', body, metadata);
    };
    /**
     * Create a new driver-trailer assignment
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Create a new driver-trailer assignment
     * @throws FetchError<401, types.CreateDriverTrailerAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateDriverTrailerAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.CreateDriverTrailerAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateDriverTrailerAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateDriverTrailerAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateDriverTrailerAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateDriverTrailerAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateDriverTrailerAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateDriverTrailerAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.createDriverTrailerAssignment = function (body) {
        return this.core.fetch('/driver-trailer-assignments', 'post', body);
    };
    /**
     * Returns a history/feed of changed DVIRs by updatedAtTime between startTime and endTime
     * parameters. In case of missing `endTime` parameter it will return a never ending stream
     * of data.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read DVIRs** under the Maintenance category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Stream DVIRs
     * @throws FetchError<401, types.GetDvirsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDvirsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDvirsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDvirsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDvirsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDvirsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDvirsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDvirsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDvirsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDvirs = function (metadata) {
        return this.core.fetch('/dvirs/stream', 'get', metadata);
    };
    /**
     * Show the assignments created by the POST fleet/carrier-proposed-assignments. This
     * endpoint will only show the assignments that are active for drivers and currently
     * visible to them in the driver app. Once a proposed assignment has been accepted, the
     * endpoint will not return any data.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Carrier-Proposed Assignments** under the Assignments
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve assignments
     */
    SDK.prototype.listCarrierProposedAssignments = function (metadata) {
        return this.core.fetch('/fleet/carrier-proposed-assignments', 'get', metadata);
    };
    /**
     * Creates a new assignment that a driver can later use. Each driver can only have one
     * future assignment.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Carrier-Proposed Assignments** under the
     * Assignments category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create an assignment
     */
    SDK.prototype.createCarrierProposedAssignment = function (body) {
        return this.core.fetch('/fleet/carrier-proposed-assignments', 'post', body);
    };
    /**
     * Permanently delete an assignment. You can only delete assignments that are not yet
     * active. To override a currently active assignment, create a new empty one, instead.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Carrier-Proposed Assignments** under the
     * Assignments category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete an assignment
     */
    SDK.prototype.deleteCarrierProposedAssignment = function (metadata) {
        return this.core.fetch('/fleet/carrier-proposed-assignments/{id}', 'delete', metadata);
    };
    /**
     * Returns a list of DVIR defects in an organization, filtered by creation time. The
     * maximum time period you can query for is 30 days.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Defects** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get all defects
     */
    SDK.prototype.getDvirDefects = function (metadata) {
        return this.core.fetch('/fleet/defects/history', 'get', metadata);
    };
    SDK.prototype.updateDvirDefect = function (body, metadata) {
        return this.core.fetch('/fleet/defects/{id}', 'patch', body, metadata);
    };
    /**
     * Returns a list of the organization document types. The legacy version of this endpoint
     * can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getDriverDocumentTypesByOrgId).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetch document types
     * @throws FetchError<401, types.GetDocumentTypesResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDocumentTypesResponse404> Not Found response.
     * @throws FetchError<405, types.GetDocumentTypesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDocumentTypesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDocumentTypesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDocumentTypesResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDocumentTypesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDocumentTypesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDocumentTypesResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDocumentTypes = function (metadata) {
        return this.core.fetch('/fleet/document-types', 'get', metadata);
    };
    /**
     * Get all documents for the given time range. The legacy version of this endpoint can be
     * found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getDriverDocumentsByOrgId).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetch all documents
     * @throws FetchError<401, types.GetDocumentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDocumentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDocumentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDocumentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDocumentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDocumentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDocumentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDocumentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDocumentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDocuments = function (metadata) {
        return this.core.fetch('/fleet/documents', 'get', metadata);
    };
    /**
     * Creates a single document. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/createDriverDocument).
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create document
     * @throws FetchError<401, types.PostDocumentResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostDocumentResponse404> Not Found response.
     * @throws FetchError<405, types.PostDocumentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostDocumentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostDocumentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostDocumentResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostDocumentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostDocumentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostDocumentResponse504> Gateway Timeout response.
     */
    SDK.prototype.postDocument = function (body) {
        return this.core.fetch('/fleet/documents', 'post', body);
    };
    /**
     * Request creation of a document PDF.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a document PDF
     */
    SDK.prototype.generateDocumentPdf = function (body) {
        return this.core.fetch('/fleet/documents/pdfs', 'post', body);
    };
    /**
     * Returns generation job status and download URL for a PDF.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Query a document PDF
     */
    SDK.prototype.getDocumentPdf = function (metadata) {
        return this.core.fetch('/fleet/documents/pdfs/{id}', 'get', metadata);
    };
    /**
     * Deletes a single document. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/deleteDriverDocumentByIdAndDriverId).
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete document
     * @throws FetchError<401, types.DeleteDocumentResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteDocumentResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteDocumentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteDocumentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteDocumentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteDocumentResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteDocumentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteDocumentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteDocumentResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteDocument = function (metadata) {
        return this.core.fetch('/fleet/documents/{id}', 'delete', metadata);
    };
    /**
     * Returns a single document. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getDriverDocumentByIdAndDriverId).
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Documents** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetch document
     * @throws FetchError<401, types.GetDocumentResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDocumentResponse404> Not Found response.
     * @throws FetchError<405, types.GetDocumentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDocumentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDocumentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDocumentResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDocumentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDocumentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDocumentResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDocument = function (metadata) {
        return this.core.fetch('/fleet/documents/{id}', 'get', metadata);
    };
    /**
     * Delete driver assignments that were created using the `POST
     * fleet/driver-vehicle-assignments` endpoint for the requested vehicle in the requested
     * time range.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete API generated driver-vehicle assignments
     * @throws FetchError<401, types.DeleteDriverVehicleAssignmentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteDriverVehicleAssignmentsResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteDriverVehicleAssignmentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteDriverVehicleAssignmentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteDriverVehicleAssignmentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteDriverVehicleAssignmentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteDriverVehicleAssignmentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteDriverVehicleAssignmentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteDriverVehicleAssignmentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteDriverVehicleAssignments = function (body) {
        return this.core.fetch('/fleet/driver-vehicle-assignments', 'delete', body);
    };
    /**
     * Get all driver-vehicle assignments for the requested drivers or vehicles in the
     * requested time range. To fetch driver-vehicle assignments out of the vehicle trips' time
     * ranges, assignmentType needs to be specified. Note: this endpoint replaces past
     * endpoints to fetch assignments by driver or by vehicle. Visit [this migration
     * guide](https://developers.samsara.com/docs/migrating-from-driver-vehicle-assignment-or-vehicle-driver-assignment-endpoints)
     * for more information.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get all driver-vehicle assignments
     * @throws FetchError<401, types.GetDriverVehicleAssignmentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDriverVehicleAssignmentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDriverVehicleAssignmentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDriverVehicleAssignmentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDriverVehicleAssignmentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDriverVehicleAssignmentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDriverVehicleAssignmentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDriverVehicleAssignmentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDriverVehicleAssignmentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDriverVehicleAssignments = function (metadata) {
        return this.core.fetch('/fleet/driver-vehicle-assignments', 'get', metadata);
    };
    /**
     * Update driver assignments that were created using the `POST
     * fleet/driver-vehicle-assignments`. Vehicle Id, Driver Id, and Start Time must match an
     * existing assignment.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update API generated driver-vehicle assignments
     * @throws FetchError<401, types.UpdateDriverVehicleAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateDriverVehicleAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateDriverVehicleAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateDriverVehicleAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateDriverVehicleAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateDriverVehicleAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateDriverVehicleAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateDriverVehicleAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateDriverVehicleAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateDriverVehicleAssignment = function (body) {
        return this.core.fetch('/fleet/driver-vehicle-assignments', 'patch', body);
    };
    /**
     * Assign vehicle drive-time to a driver via API. For a step-by-step instruction on how to
     * leverage this endpoint, see [this
     * guide](https://developers.samsara.com/docs/creating-driver-vehicle-assignments)
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create a new driver-vehicle assignment
     * @throws FetchError<401, types.CreateDriverVehicleAssignmentResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateDriverVehicleAssignmentResponse404> Not Found response.
     * @throws FetchError<405, types.CreateDriverVehicleAssignmentResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateDriverVehicleAssignmentResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateDriverVehicleAssignmentResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateDriverVehicleAssignmentResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateDriverVehicleAssignmentResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateDriverVehicleAssignmentResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateDriverVehicleAssignmentResponse504> Gateway Timeout response.
     */
    SDK.prototype.createDriverVehicleAssignment = function (body) {
        return this.core.fetch('/fleet/driver-vehicle-assignments', 'post', body);
    };
    /**
     * Get all drivers in organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Drivers** under the Drivers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all drivers
     */
    SDK.prototype.listDrivers = function (metadata) {
        return this.core.fetch('/fleet/drivers', 'get', metadata);
    };
    /**
     * Add a driver to the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Drivers** under the Drivers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a driver
     */
    SDK.prototype.createDriver = function (body) {
        return this.core.fetch('/fleet/drivers', 'post', body);
    };
    /**
     * Returns all known tachograph activity for all specified drivers in the time range.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Tachograph (EU)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get driver tachograph activity
     */
    SDK.prototype.getDriverTachographActivity = function (metadata) {
        return this.core.fetch('/fleet/drivers/tachograph-activity/history', 'get', metadata);
    };
    /**
     * Returns all known tachograph files for all specified drivers in the time range.
     *
     *  <b>Rate limit:</b> 50 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Tachograph (EU)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get tachograph driver files
     */
    SDK.prototype.getDriverTachographFiles = function (metadata) {
        return this.core.fetch('/fleet/drivers/tachograph-files/history', 'get', metadata);
    };
    /**
     * **Note: This is a legacy endpoint, consider using [this
     * endpoint](https://developers.samsara.com/reference/getdrivervehicleassignments) instead.
     * The endpoint will continue to function as documented.** Get all vehicle assignments for
     * the requested drivers in the requested time range. The only type of assignment supported
     * right now are assignments created through the driver app.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [legacy] Get all vehicles assigned to a set of drivers
     * @throws FetchError<401, types.GetDriversVehicleAssignmentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDriversVehicleAssignmentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDriversVehicleAssignmentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDriversVehicleAssignmentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDriversVehicleAssignmentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDriversVehicleAssignmentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDriversVehicleAssignmentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDriversVehicleAssignmentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDriversVehicleAssignmentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDriversVehicleAssignments = function (metadata) {
        return this.core.fetch('/fleet/drivers/vehicle-assignments', 'get', metadata);
    };
    /**
     * Get information about a driver.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Drivers** under the Drivers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a driver
     */
    SDK.prototype.getDriver = function (metadata) {
        return this.core.fetch('/fleet/drivers/{id}', 'get', metadata);
    };
    /**
     * Update a specific driver's information. This can also be used to activate or de-activate
     * a given driver by setting the driverActivationStatus field. If the
     * driverActivationStatus field is 'deactivated' then the user can also specify the
     * deactivatedAtTime. The deactivatedAtTime cannot be more than 6 months in the past and
     * must not come before the dirver's latest active HOS log. It will be considered an error
     * if deactivatedAtTime is provided with a driverActivationStatus of active.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Drivers** under the Drivers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a driver
     */
    SDK.prototype.updateDriver = function (body, metadata) {
        return this.core.fetch('/fleet/drivers/{id}', 'patch', body, metadata);
    };
    /**
     * Creates a new mechanic DVIR in the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write DVIRs** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a mechanic DVIR
     */
    SDK.prototype.createDvir = function (body) {
        return this.core.fetch('/fleet/dvirs', 'post', body);
    };
    /**
     * Returns a list of all DVIRs in an organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read DVIRs** under the Maintenance category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get all DVIRs
     */
    SDK.prototype.getDvirHistory = function (metadata) {
        return this.core.fetch('/fleet/dvirs/history', 'get', metadata);
    };
    /**
     * Resolves a given DVIR by marking its `isResolved` field to `true`.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write DVIRs** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Resolve a DVIR
     */
    SDK.prototype.updateDvir = function (body, metadata) {
        return this.core.fetch('/fleet/dvirs/{id}', 'patch', body, metadata);
    };
    /**
     * Returns a list of all equipment in an organization. Equipment objects represent powered
     * assets connected to a [Samsara AG26](https://www.samsara.com/products/models/ag26) via
     * an APWR, CAT, or J1939 cable. They are automatically created with a unique Samsara
     * Equipment ID whenever an AG26 is activated in your organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all equipment
     */
    SDK.prototype.listEquipment = function (metadata) {
        return this.core.fetch('/fleet/equipment', 'get', metadata);
    };
    /**
     * Returns last known locations for all equipment. This can be optionally filtered by tags
     * or specific equipment IDs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get most recent locations for all equipment
     */
    SDK.prototype.getEquipmentLocations = function (metadata) {
        return this.core.fetch('/fleet/equipment/locations', 'get', metadata);
    };
    /**
     * Follow a continuous feed of all equipment locations from Samsara AG26s.
     *
     * Your first call to this endpoint will provide you with the most recent location for each
     * unit of equipment and a `pagination` object that contains an `endCursor`.
     *
     * You can provide the `endCursor` to subsequent calls via the `after` parameter. The
     * response will contain any equipment location updates since that `endCursor`.
     *
     * If `hasNextPage` is `false`, no updates are readily available yet. We'd suggest waiting
     * a minimum of 5 seconds before requesting updates.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Follow feed of equipment locations
     */
    SDK.prototype.getEquipmentLocationsFeed = function (metadata) {
        return this.core.fetch('/fleet/equipment/locations/feed', 'get', metadata);
    };
    /**
     * Returns historical equipment locations during the given time range. This can be
     * optionally filtered by tags or specific equipment IDs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get historical equipment locations
     */
    SDK.prototype.getEquipmentLocationsHistory = function (metadata) {
        return this.core.fetch('/fleet/equipment/locations/history', 'get', metadata);
    };
    /**
     * Returns the last known stats for all equipment. This can be optionally filtered by tags
     * or specific equipment IDs.
     *
     *  <b>Rate limit:</b> 150 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get most recent stats for all equipment
     */
    SDK.prototype.getEquipmentStats = function (metadata) {
        return this.core.fetch('/fleet/equipment/stats', 'get', metadata);
    };
    /**
     * Follow a continuous feed of all equipment stats from Samsara AG26s.
     *
     * Your first call to this endpoint will provide you with the most recent stats for each
     * unit of equipment and a `pagination` object that contains an `endCursor`.
     *
     * You can provide the `endCursor` to subsequent calls via the `after` parameter. The
     * response will contain any equipment stats updates since that `endCursor`.
     *
     * If `hasNextPage` is `false`, no updates are readily available yet. Each stat type has a
     * different refresh rate, but in general we'd suggest waiting a minimum of 5 seconds
     * before requesting updates.
     *
     *  <b>Rate limit:</b> 150 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Follow a feed of equipment stats
     */
    SDK.prototype.getEquipmentStatsFeed = function (metadata) {
        return this.core.fetch('/fleet/equipment/stats/feed', 'get', metadata);
    };
    /**
     * Returns historical equipment status during the given time range. This can be optionally
     * filtered by tags or specific equipment IDs.
     *
     *  <b>Rate limit:</b> 150 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get historical equipment stats
     */
    SDK.prototype.getEquipmentStatsHistory = function (metadata) {
        return this.core.fetch('/fleet/equipment/stats/history', 'get', metadata);
    };
    /**
     * Retrieves the unit of equipment with the given Samsara ID.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a unit of equipment
     */
    SDK.prototype.getEquipment = function (metadata) {
        return this.core.fetch('/fleet/equipment/{id}', 'get', metadata);
    };
    /**
     * Get the current HOS status for all drivers. Note that this includes inactive as well as
     * active drivers. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getFleetHosLogsSummary).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get HOS clocks
     */
    SDK.prototype.getHosClocks = function (metadata) {
        return this.core.fetch('/fleet/hos/clocks', 'get', metadata);
    };
    /**
     * Get summarized daily Hours of Service charts for the specified drivers.
     *
     * The time range for a log is defined by the `driver`'s `eldDayStartHour`. This value is
     * configurable per driver.
     *
     * The `startDate` and `endDate` parameters indicate the date range you'd like to retrieve
     * daily logs for. A daily log will be returned if its `startTime` is on any of the days
     * within in this date range (inclusive of `startDate` and `endDate`).
     *
     * **Note:** If data is still being uploaded from the Samsara Driver App, it may not be
     * completely reflected in the response from this endpoint. The best practice is to wait a
     * couple of days before querying this endpoint to make sure that all data from the Samsara
     * Driver App has been uploaded.
     *
     * If you are using the legacy version of this endpoint and looking for its documentation,
     * you can find it
     * [here](https://www.samsara.com/api-legacy#operation/getFleetDriversHosDailyLogs).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get all driver HOS daily logs
     * @throws FetchError<401, types.GetHosDailyLogsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetHosDailyLogsResponse404> Not Found response.
     * @throws FetchError<405, types.GetHosDailyLogsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetHosDailyLogsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetHosDailyLogsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetHosDailyLogsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetHosDailyLogsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetHosDailyLogsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetHosDailyLogsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getHosDailyLogs = function (metadata) {
        return this.core.fetch('/fleet/hos/daily-logs', 'get', metadata);
    };
    /**
     * Returns HOS logs between a given `startTime` and `endTime`. The logs can be further
     * filtered using tags or by providing a list of driver IDs (including external IDs). The
     * legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getFleetHosLogs).
     *
     * **Note:** If data is still being uploaded from the Samsara Driver App, it may not be
     * completely reflected in the response from this endpoint. The best practice is to wait a
     * couple of days before querying this endpoint to make sure that all data from the Samsara
     * Driver App has been uploaded.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get HOS logs
     */
    SDK.prototype.getHosLogs = function (metadata) {
        return this.core.fetch('/fleet/hos/logs', 'get', metadata);
    };
    /**
     * Get active Hours of Service violations for the specified drivers.
     *
     * The day object time range for a violation is defined by the `driver`'s
     * `eldDayStartHour`. This value is configurable per driver.
     *
     * The `startTime` and `endTime` parameters indicate the datetime range you'd like to
     * retrieve violations for. A violation will be returned if its `violationStartTime` falls
     * within this datetime range (inclusive of `startTime` and `endTime`)
     *
     * **Note:** The following are all the violation types with a short explanation about what
     * each of them means: `californiaMealbreakMissed` (Missed California Meal Break),
     * `cycleHoursOn` (Cycle Limit), `cycleOffHoursAfterOnDutyHours` (Cycle 2 Limit),
     * `dailyDrivingHours` (Daily Driving Limit), `dailyOffDutyDeferralAddToDay2Consecutive`
     * (Daily Off-Duty Deferral: Add To Day2 Consecutive),
     * `dailyOffDutyDeferralNotPartMandatory` (Daily Off-Duty Deferral: Not Part Of Mandatory),
     * `dailyOffDutyDeferralTwoDayDrivingLimit` (Daily Off-Duty Deferral: 2 Day Driving Limit),
     * `dailyOffDutyDeferralTwoDayOffDuty` (Daily Off-Duty Deferral: 2 Day Off Duty),
     * `dailyOffDutyNonResetHours` (Daily Off-Duty Time: Non-Reset), `dailyOffDutyTotalHours`
     * (Daily Off-Duty Time), `dailyOnDutyHours` (Daily On-Duty Limit),
     * `mandatory24HoursOffDuty` (24 Hours of Off Duty required), `restbreakMissed` (Missed
     * Rest Break), `shiftDrivingHours` (Shift Driving Limit), `shiftHours` (Shift Duty Limit),
     * `shiftOnDutyHours` (Shift On-Duty Limit), `unsubmittedLogs` (Missing Driver
     * Certification)
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get all driver HOS violations
     * @throws FetchError<401, types.GetHosViolationsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetHosViolationsResponse404> Not Found response.
     * @throws FetchError<405, types.GetHosViolationsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetHosViolationsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetHosViolationsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetHosViolationsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetHosViolationsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetHosViolationsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetHosViolationsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getHosViolations = function (metadata) {
        return this.core.fetch('/fleet/hos/violations', 'get', metadata);
    };
    /**
     * Get fuel and energy efficiency driver reports for the requested time range.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Fuel & Energy** under the Fuel & Energy category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get fuel and energy efficiency driver reports.
     * @throws FetchError<401, types.GetFuelEnergyDriverReportsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetFuelEnergyDriverReportsResponse404> Not Found response.
     * @throws FetchError<405, types.GetFuelEnergyDriverReportsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetFuelEnergyDriverReportsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetFuelEnergyDriverReportsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetFuelEnergyDriverReportsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetFuelEnergyDriverReportsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetFuelEnergyDriverReportsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetFuelEnergyDriverReportsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getFuelEnergyDriverReports = function (metadata) {
        return this.core.fetch('/fleet/reports/drivers/fuel-energy', 'get', metadata);
    };
    /**
     * Get all jurisdiction IFTA reports for the requested time duration. Data is returned in
     * your organization's defined timezone.
     *
     * **Note:** The most recent 72 hours of data may still be processing and is subject to
     * change and latency, so it is not recommended to request data for the most recent 72
     * hours.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read IFTA (US)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get IFTA jurisdiction reports.
     * @throws FetchError<401, types.GetIftaJurisdictionReportsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIftaJurisdictionReportsResponse404> Not Found response.
     * @throws FetchError<405, types.GetIftaJurisdictionReportsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIftaJurisdictionReportsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIftaJurisdictionReportsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIftaJurisdictionReportsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIftaJurisdictionReportsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIftaJurisdictionReportsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIftaJurisdictionReportsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIftaJurisdictionReports = function (metadata) {
        return this.core.fetch('/fleet/reports/ifta/jurisdiction', 'get', metadata);
    };
    /**
     * Get all vehicle IFTA reports for the requested time duration. Data is returned in your
     * organization's defined timezone.
     *
     * **Note:** The most recent 72 hours of data may still be processing and is subject to
     * change and latency, so it is not recommended to request data for the most recent 72
     * hours.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read IFTA (US)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get IFTA vehicle reports.
     * @throws FetchError<401, types.GetIftaVehicleReportsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIftaVehicleReportsResponse404> Not Found response.
     * @throws FetchError<405, types.GetIftaVehicleReportsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIftaVehicleReportsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIftaVehicleReportsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIftaVehicleReportsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIftaVehicleReportsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIftaVehicleReportsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIftaVehicleReportsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIftaVehicleReports = function (metadata) {
        return this.core.fetch('/fleet/reports/ifta/vehicle', 'get', metadata);
    };
    /**
     * Get all vehicle idling reports for the requested time duration.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Fuel & Energy** under the Fuel & Energy category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get vehicle idling reports.
     * @throws FetchError<401, types.GetVehicleIdlingReportsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetVehicleIdlingReportsResponse404> Not Found response.
     * @throws FetchError<405, types.GetVehicleIdlingReportsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetVehicleIdlingReportsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetVehicleIdlingReportsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetVehicleIdlingReportsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetVehicleIdlingReportsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetVehicleIdlingReportsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetVehicleIdlingReportsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getVehicleIdlingReports = function (metadata) {
        return this.core.fetch('/fleet/reports/vehicle/idling', 'get', metadata);
    };
    /**
     * Get fuel and energy efficiency vehicle reports for the requested time range.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Fuel & Energy** under the Fuel & Energy category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get fuel and energy efficiency vehicle reports.
     * @throws FetchError<401, types.GetFuelEnergyVehicleReportsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetFuelEnergyVehicleReportsResponse404> Not Found response.
     * @throws FetchError<405, types.GetFuelEnergyVehicleReportsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetFuelEnergyVehicleReportsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetFuelEnergyVehicleReportsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetFuelEnergyVehicleReportsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetFuelEnergyVehicleReportsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetFuelEnergyVehicleReportsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetFuelEnergyVehicleReportsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getFuelEnergyVehicleReports = function (metadata) {
        return this.core.fetch('/fleet/reports/vehicles/fuel-energy', 'get', metadata);
    };
    /**
     * Returns multiple routes. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/fetchAllDispatchRoutes).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetch all routes
     * @throws FetchError<401, types.FetchRoutesResponse401> Unauthorized response.
     * @throws FetchError<404, types.FetchRoutesResponse404> Not Found response.
     * @throws FetchError<405, types.FetchRoutesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.FetchRoutesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.FetchRoutesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.FetchRoutesResponse501> Not Implemented response.
     * @throws FetchError<502, types.FetchRoutesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.FetchRoutesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.FetchRoutesResponse504> Gateway Timeout response.
     */
    SDK.prototype.fetchRoutes = function (metadata) {
        return this.core.fetch('/fleet/routes', 'get', metadata);
    };
    /**
     * Create a route. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/createDispatchRoute).
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create a route
     * @throws FetchError<401, types.CreateRouteResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateRouteResponse404> Not Found response.
     * @throws FetchError<405, types.CreateRouteResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateRouteResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateRouteResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateRouteResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateRouteResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateRouteResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateRouteResponse504> Gateway Timeout response.
     */
    SDK.prototype.createRoute = function (body) {
        return this.core.fetch('/fleet/routes', 'post', body);
    };
    /**
     * Subscribes to a feed of immutable, append-only updates for routes. The initial request
     * to this feed endpoint returns a cursor, which can be used on the next request to fetch
     * updated routes that have had state changes since that request.
     *
     * The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/fetchAllRouteJobUpdates).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get route updates
     * @throws FetchError<401, types.GetRoutesFeedResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetRoutesFeedResponse404> Not Found response.
     * @throws FetchError<405, types.GetRoutesFeedResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetRoutesFeedResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetRoutesFeedResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetRoutesFeedResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetRoutesFeedResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetRoutesFeedResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetRoutesFeedResponse504> Gateway Timeout response.
     */
    SDK.prototype.getRoutesFeed = function (metadata) {
        return this.core.fetch('/fleet/routes/audit-logs/feed', 'get', metadata);
    };
    /**
     * Delete a dispatch route and its associated stops.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete a route.
     * @throws FetchError<401, types.DeleteRouteResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteRouteResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteRouteResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteRouteResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteRouteResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteRouteResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteRouteResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteRouteResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteRouteResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteRoute = function (metadata) {
        return this.core.fetch('/fleet/routes/{id}', 'delete', metadata);
    };
    /**
     * Returns a single route. The legacy version of this endpoint can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/getDispatchRouteById).
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetch a route
     * @throws FetchError<401, types.FetchRouteResponse401> Unauthorized response.
     * @throws FetchError<404, types.FetchRouteResponse404> Not Found response.
     * @throws FetchError<405, types.FetchRouteResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.FetchRouteResponse429> Too Many Requests response.
     * @throws FetchError<500, types.FetchRouteResponse500> Internal Server Error response.
     * @throws FetchError<501, types.FetchRouteResponse501> Not Implemented response.
     * @throws FetchError<502, types.FetchRouteResponse502> Bad Gateway response.
     * @throws FetchError<503, types.FetchRouteResponse503> Service Unavailable response.
     * @throws FetchError<504, types.FetchRouteResponse504> Gateway Timeout response.
     */
    SDK.prototype.fetchRoute = function (metadata) {
        return this.core.fetch('/fleet/routes/{id}', 'get', metadata);
    };
    /**
     * Update a route.  **Note** this implementation of patch uses [the JSON merge
     * patch](https://tools.ietf.org/html/rfc7396) proposed standard.
     *  This means that any fields included in the patch request will _overwrite_ fields which
     * exist on the target resource.
     *  For arrays, this means any array included in the request will _replace_ the array that
     * exists at the specified path, it will not _add_ to the existing array.
     *
     * The legacy version of this endpoint (which uses PUT instead of PATCH) can be found at
     * [samsara.com/api-legacy](https://www.samsara.com/api-legacy#operation/updateDispatchRouteById).
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update a route
     * @throws FetchError<401, types.PatchRouteResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchRouteResponse404> Not Found response.
     * @throws FetchError<405, types.PatchRouteResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchRouteResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchRouteResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchRouteResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchRouteResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchRouteResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchRouteResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchRoute = function (body, metadata) {
        return this.core.fetch('/fleet/routes/{id}', 'patch', body, metadata);
    };
    /**
     * Fetch safety events for the organization in a given time period.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all safety events.
     */
    SDK.prototype.getSafetyEvents = function (metadata) {
        return this.core.fetch('/fleet/safety-events', 'get', metadata);
    };
    /**
     * Get continuous safety events. The safety activity event feed offers a change-log for
     * safety events. Use this endpoint to subscribe to safety event changes. See documentation
     * below for all supported change-log types.
     *
     * | ActivityType      | Description |
     * | ----------- | ----------- |
     * | CreateSafetyEvent      | a new safety event is processed by Samsara       |
     * | BehaviorLabelActivityType   | a label is added or removed from a safety event        |
     * | CoachingStateActivityType   | a safety event coaching state is updated        |
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Fetches safety activity event feed
     * @throws FetchError<401, types.GetSafetyActivityEventFeedResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetSafetyActivityEventFeedResponse404> Not Found response.
     * @throws FetchError<405, types.GetSafetyActivityEventFeedResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetSafetyActivityEventFeedResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetSafetyActivityEventFeedResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetSafetyActivityEventFeedResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetSafetyActivityEventFeedResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetSafetyActivityEventFeedResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetSafetyActivityEventFeedResponse504> Gateway Timeout response.
     */
    SDK.prototype.getSafetyActivityEventFeed = function (metadata) {
        return this.core.fetch('/fleet/safety-events/audit-logs/feed', 'get', metadata);
    };
    /**
     * Get organization's compliance settings, including carrier name, office address, and DOT
     * number
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get compliance settings
     * @throws FetchError<401, types.GetComplianceSettingsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetComplianceSettingsResponse404> Not Found response.
     * @throws FetchError<405, types.GetComplianceSettingsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetComplianceSettingsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetComplianceSettingsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetComplianceSettingsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetComplianceSettingsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetComplianceSettingsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetComplianceSettingsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getComplianceSettings = function () {
        return this.core.fetch('/fleet/settings/compliance', 'get');
    };
    /**
     * Update organization's compliance settings, including carrier name, office address, and
     * DOT number
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write ELD Compliance Settings (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update compliance settings
     * @throws FetchError<401, types.PatchComplianceSettingsResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchComplianceSettingsResponse404> Not Found response.
     * @throws FetchError<405, types.PatchComplianceSettingsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchComplianceSettingsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchComplianceSettingsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchComplianceSettingsResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchComplianceSettingsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchComplianceSettingsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchComplianceSettingsResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchComplianceSettings = function (body) {
        return this.core.fetch('/fleet/settings/compliance', 'patch', body);
    };
    /**
     * Get driver app settings.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Driver App Settings** under the Drivers category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get driver app settings
     * @throws FetchError<401, types.GetDriverAppSettingsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetDriverAppSettingsResponse404> Not Found response.
     * @throws FetchError<405, types.GetDriverAppSettingsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetDriverAppSettingsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetDriverAppSettingsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetDriverAppSettingsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetDriverAppSettingsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetDriverAppSettingsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetDriverAppSettingsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getDriverAppSettings = function () {
        return this.core.fetch('/fleet/settings/driver-app', 'get');
    };
    /**
     * Update driver app settings.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Driver App Settings** under the Drivers category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update driver app settings
     * @throws FetchError<401, types.PatchDriverAppSettingsResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchDriverAppSettingsResponse404> Not Found response.
     * @throws FetchError<405, types.PatchDriverAppSettingsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchDriverAppSettingsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchDriverAppSettingsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchDriverAppSettingsResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchDriverAppSettingsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchDriverAppSettingsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchDriverAppSettingsResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchDriverAppSettings = function (body) {
        return this.core.fetch('/fleet/settings/driver-app', 'patch', body);
    };
    /**
     * Get safety settings
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get safety settings
     * @throws FetchError<401, types.GetSafetySettingsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetSafetySettingsResponse404> Not Found response.
     * @throws FetchError<405, types.GetSafetySettingsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetSafetySettingsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetSafetySettingsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetSafetySettingsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetSafetySettingsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetSafetySettingsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetSafetySettingsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getSafetySettings = function () {
        return this.core.fetch('/fleet/settings/safety', 'get');
    };
    /**
     * List all trailers.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trailers** under the Trailers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary List all trailers
     * @throws FetchError<401, types.ListTrailersResponse401> Unauthorized response.
     * @throws FetchError<404, types.ListTrailersResponse404> Not Found response.
     * @throws FetchError<405, types.ListTrailersResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.ListTrailersResponse429> Too Many Requests response.
     * @throws FetchError<500, types.ListTrailersResponse500> Internal Server Error response.
     * @throws FetchError<501, types.ListTrailersResponse501> Not Implemented response.
     * @throws FetchError<502, types.ListTrailersResponse502> Bad Gateway response.
     * @throws FetchError<503, types.ListTrailersResponse503> Service Unavailable response.
     * @throws FetchError<504, types.ListTrailersResponse504> Gateway Timeout response.
     */
    SDK.prototype.listTrailers = function (metadata) {
        return this.core.fetch('/fleet/trailers', 'get', metadata);
    };
    /**
     * Creates a new trailer asset.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Trailers** under the Trailers category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Creates a new trailer asset
     * @throws FetchError<401, types.CreateTrailerResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateTrailerResponse404> Not Found response.
     * @throws FetchError<405, types.CreateTrailerResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateTrailerResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateTrailerResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateTrailerResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateTrailerResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateTrailerResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateTrailerResponse504> Gateway Timeout response.
     */
    SDK.prototype.createTrailer = function (body) {
        return this.core.fetch('/fleet/trailers', 'post', body);
    };
    /**
     * Delete a trailer with the given ID.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Trailers** under the Trailers category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete a trailer
     * @throws FetchError<401, types.DeleteTrailerResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteTrailerResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteTrailerResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteTrailerResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteTrailerResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteTrailerResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteTrailerResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteTrailerResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteTrailerResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteTrailer = function (metadata) {
        return this.core.fetch('/fleet/trailers/{id}', 'delete', metadata);
    };
    /**
     * Retrieve a trailer with given ID.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trailers** under the Trailers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Retrieve a trailer
     * @throws FetchError<401, types.GetTrailerResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetTrailerResponse404> Not Found response.
     * @throws FetchError<405, types.GetTrailerResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetTrailerResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetTrailerResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetTrailerResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetTrailerResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetTrailerResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetTrailerResponse504> Gateway Timeout response.
     */
    SDK.prototype.getTrailer = function (metadata) {
        return this.core.fetch('/fleet/trailers/{id}', 'get', metadata);
    };
    /**
     * Update a trailer.  **Note** this implementation of patch uses [the JSON merge
     * patch](https://tools.ietf.org/html/rfc7396) proposed standard.
     *  This means that any fields included in the patch request will _overwrite_ fields which
     * exist on the target resource.
     *  For arrays, this means any array included in the request will _replace_ the array that
     * exists at the specified path, it will not _add_ to the existing array
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Trailers** under the Trailers category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update a trailer
     * @throws FetchError<401, types.UpdateTrailerResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateTrailerResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateTrailerResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateTrailerResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateTrailerResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateTrailerResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateTrailerResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateTrailerResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateTrailerResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateTrailer = function (body, metadata) {
        return this.core.fetch('/fleet/trailers/{id}', 'patch', body, metadata);
    };
    /**
     * Returns a list of all vehicles.
     *
     *  <b>Rate limit:</b> 25 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Vehicles** under the Vehicles category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary List all vehicles.
     * @throws FetchError<401, types.ListVehiclesResponse401> Unauthorized response.
     * @throws FetchError<404, types.ListVehiclesResponse404> Not Found response.
     * @throws FetchError<405, types.ListVehiclesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.ListVehiclesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.ListVehiclesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.ListVehiclesResponse501> Not Implemented response.
     * @throws FetchError<502, types.ListVehiclesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.ListVehiclesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.ListVehiclesResponse504> Gateway Timeout response.
     */
    SDK.prototype.listVehicles = function (metadata) {
        return this.core.fetch('/fleet/vehicles', 'get', metadata);
    };
    /**
     * **Note: This is a legacy endpoint, consider using [this
     * endpoint](https://developers.samsara.com/reference/getdrivervehicleassignments) instead.
     * The endpoint will continue to function as documented.** Get all driver assignments for
     * the requested vehicles in the requested time range. The only type of assignment
     * supported right now are assignments created through the driver app.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [legacy] Get all drivers assigned to a set of vehicles
     * @throws FetchError<401, types.GetVehiclesDriverAssignmentsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetVehiclesDriverAssignmentsResponse404> Not Found response.
     * @throws FetchError<405, types.GetVehiclesDriverAssignmentsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetVehiclesDriverAssignmentsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetVehiclesDriverAssignmentsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetVehiclesDriverAssignmentsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetVehiclesDriverAssignmentsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetVehiclesDriverAssignmentsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetVehiclesDriverAssignmentsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getVehiclesDriverAssignments = function (metadata) {
        return this.core.fetch('/fleet/vehicles/driver-assignments', 'get', metadata);
    };
    /**
     * Get the engine immobilizer states of the queried vehicles. If a vehicle has never had an
     * engine immobilizer connected, there won't be any state returned for that vehicle.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Vehicle Immobilization** under the Vehicles category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get engine immobilizer states
     * @throws FetchError<401, types.GetEngineImmobilizerStatesResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetEngineImmobilizerStatesResponse404> Not Found response.
     * @throws FetchError<405, types.GetEngineImmobilizerStatesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetEngineImmobilizerStatesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetEngineImmobilizerStatesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetEngineImmobilizerStatesResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetEngineImmobilizerStatesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetEngineImmobilizerStatesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetEngineImmobilizerStatesResponse504> Gateway Timeout response.
     */
    SDK.prototype.getEngineImmobilizerStates = function (metadata) {
        return this.core.fetch('/fleet/vehicles/immobilizer/stream', 'get', metadata);
    };
    /**
     * ***NOTE: The Vehicle Locations API is an older API that does not combine GPS data with
     * onboard diagnostics. Try our new [Vehicle Stats API](ref:getvehiclestats) instead.***
     *
     * Returns the last known location of all vehicles at the given `time`. If no `time` is
     * specified, the current time is used. This can be optionally filtered by tags or specific
     * vehicle IDs.
     *
     * Related guide: <a href="/docs/vehicle-locations-1" target="_blank">Vehicle
     * Locations</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicles category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Locations snapshot
     */
    SDK.prototype.getVehicleLocations = function (metadata) {
        return this.core.fetch('/fleet/vehicles/locations', 'get', metadata);
    };
    /**
     * ***NOTE: The Vehicle Locations API is an older API that does not combine GPS data with
     * onboard diagnostics. Try our new [Vehicle Stats API](ref:getvehiclestatsfeed)
     * instead.***
     *
     * Follow a continuous feed of all vehicle locations from Samsara Vehicle Gateways.
     *
     * Your first call to this endpoint will provide you with the most recent location for each
     * vehicle and a `pagination` object that contains an `endCursor`.
     *
     * You can provide the `endCursor` to the `after` parameter of this endpoint to get
     * location updates since that `endCursor`.
     *
     * If `hasNextPage` is `false`, no updates are readily available yet. We'd suggest waiting
     * a minimum of 5 seconds before requesting updates.
     *
     * Related guide: <a href="/docs/vehicle-locations-1" target="_blank">Vehicle
     * Locations</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicle category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Locations feed
     */
    SDK.prototype.getVehicleLocationsFeed = function (metadata) {
        return this.core.fetch('/fleet/vehicles/locations/feed', 'get', metadata);
    };
    /**
     * ***NOTE: The Vehicle Locations API is an older API that does not combine GPS data with
     * onboard diagnostics. Try our new [Vehicle Stats API](ref:getvehiclestatshistory)
     * instead.***
     *
     * Returns all known vehicle locations during the given time range. This can be optionally
     * filtered by tags or specific vehicle IDs.
     *
     * Related guide: <a href="/docs/vehicle-locations-1" target="_blank">Vehicle
     * Locations</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicle category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Historical locations
     */
    SDK.prototype.getVehicleLocationsHistory = function (metadata) {
        return this.core.fetch('/fleet/vehicles/locations/history', 'get', metadata);
    };
    /**
     * Returns the last known stats of all vehicles at the given `time`. If no `time` is
     * specified, the current time is used.
     *
     * Related guide: <a href="/docs/telematics" target="_blank">Telematics</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicles category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Stats snapshot
     */
    SDK.prototype.getVehicleStats = function (metadata) {
        return this.core.fetch('/fleet/vehicles/stats', 'get', metadata);
    };
    /**
     * Follow a feed of vehicle stats.
     *
     * Your first call to this endpoint will provide you with the most recent stats for each
     * vehicle and an `endCursor`.
     *
     * You can the provide the `endCursor` value to the `after` query parameter to get all
     * updates since the last call you made.
     *
     * If `hasNextPage` is `false`, no new data is immediately available. You should wait a
     * minimum of 5 seconds making a subsequent request.
     *
     * Related guide: <a href="/docs/telematics" target="_blank">Telematics</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicles category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Stats feed
     */
    SDK.prototype.getVehicleStatsFeed = function (metadata) {
        return this.core.fetch('/fleet/vehicles/stats/feed', 'get', metadata);
    };
    /**
     * Returns vehicle stats during the given time range for all vehicles. This can be
     * optionally filtered by tags or specific vehicle IDs.
     *
     * Related guide: <a href="/docs/telematics" target="_blank">Telematics</a>.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Statistics** under the Vehicles category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Historical stats
     */
    SDK.prototype.getVehicleStatsHistory = function (metadata) {
        return this.core.fetch('/fleet/vehicles/stats/history', 'get', metadata);
    };
    /**
     * Returns all known tachograph files for all specified vehicles in the time range.
     *
     *  <b>Rate limit:</b> 150 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Tachograph (EU)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get tachograph vehicle files
     */
    SDK.prototype.getVehicleTachographFiles = function (metadata) {
        return this.core.fetch('/fleet/vehicles/tachograph-files/history', 'get', metadata);
    };
    /**
     * Get information about a specific vehicle.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicles** under the Vehicles category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a vehicle
     */
    SDK.prototype.getVehicle = function (metadata) {
        return this.core.fetch('/fleet/vehicles/{id}', 'get', metadata);
    };
    /**
     * Updates the given Vehicle object.
     *
     * **Note:** Vehicle objects are automatically created when Samsara Vehicle Gateways are
     * installed. You cannot create a Vehicle object via API.
     *
     * You are able to *update* many of the fields of a Vehicle.
     *
     * **Note**: There are no required fields in the request body, and you only need to provide
     * the fields you wish to update.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Vehicles** under the Vehicles category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a vehicle
     */
    SDK.prototype.updateVehicle = function (body, metadata) {
        return this.core.fetch('/fleet/vehicles/{id}', 'patch', body, metadata);
    };
    /**
     * Returns all form submissions data for the specified IDs.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Form Submissions** under the Closed Beta category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get a list of specified form submissions.
     * @throws FetchError<401, types.GetFormSubmissionsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetFormSubmissionsResponse404> Not Found response.
     * @throws FetchError<405, types.GetFormSubmissionsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetFormSubmissionsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetFormSubmissionsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetFormSubmissionsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetFormSubmissionsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetFormSubmissionsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetFormSubmissionsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getFormSubmissions = function (metadata) {
        return this.core.fetch('/form-submissions', 'get', metadata);
    };
    /**
     * Updates an instance of a form submission.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Form Submissions** under the Closed Beta category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update a single form submission.
     * @throws FetchError<401, types.PatchFormSubmissionResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchFormSubmissionResponse404> Not Found response.
     * @throws FetchError<405, types.PatchFormSubmissionResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchFormSubmissionResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchFormSubmissionResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchFormSubmissionResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchFormSubmissionResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchFormSubmissionResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchFormSubmissionResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchFormSubmission = function (body) {
        return this.core.fetch('/form-submissions', 'patch', body);
    };
    /**
     * Creates a form submission.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Form Submissions** under the Closed Beta category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Create a form submission.
     * @throws FetchError<401, types.PostFormSubmissionResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostFormSubmissionResponse404> Not Found response.
     * @throws FetchError<405, types.PostFormSubmissionResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostFormSubmissionResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostFormSubmissionResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostFormSubmissionResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostFormSubmissionResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostFormSubmissionResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostFormSubmissionResponse504> Gateway Timeout response.
     */
    SDK.prototype.postFormSubmission = function (body) {
        return this.core.fetch('/form-submissions', 'post', body);
    };
    /**
     * Returns all form submissions data that has been created or modified for your
     * organization based on the time parameters passed in. Results are paginated and are
     * sorted by last modified date. If you include an endTime, the endpoint will return data
     * up until that point (exclusive). If you don’t include an endTime, you can continue to
     * poll the API real-time with the pagination cursor that gets returned on every call.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Form Submissions** under the Closed Beta category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get a stream of filtered form submissions.
     * @throws FetchError<401, types.GetFormSubmissionsStreamResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetFormSubmissionsStreamResponse404> Not Found response.
     * @throws FetchError<405, types.GetFormSubmissionsStreamResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetFormSubmissionsStreamResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetFormSubmissionsStreamResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetFormSubmissionsStreamResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetFormSubmissionsStreamResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetFormSubmissionsStreamResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetFormSubmissionsStreamResponse504> Gateway Timeout response.
     */
    SDK.prototype.getFormSubmissionsStream = function (metadata) {
        return this.core.fetch('/form-submissions/stream', 'get', metadata);
    };
    /**
     * Create a fuel purchase transaction.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Fuel Purchase** under the Fuel & Energy category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create a fuel purchase transaction.
     * @throws FetchError<401, types.PostFuelPurchaseResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostFuelPurchaseResponse404> Not Found response.
     * @throws FetchError<405, types.PostFuelPurchaseResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostFuelPurchaseResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostFuelPurchaseResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostFuelPurchaseResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostFuelPurchaseResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostFuelPurchaseResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostFuelPurchaseResponse504> Gateway Timeout response.
     */
    SDK.prototype.postFuelPurchase = function (body) {
        return this.core.fetch('/fuel-purchase', 'post', body);
    };
    /**
     * List all gateways
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Gateways** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary List all gateways
     * @throws FetchError<401, types.GetGatewaysResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetGatewaysResponse404> Not Found response.
     * @throws FetchError<405, types.GetGatewaysResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetGatewaysResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetGatewaysResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetGatewaysResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetGatewaysResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetGatewaysResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetGatewaysResponse504> Gateway Timeout response.
     */
    SDK.prototype.getGateways = function (metadata) {
        return this.core.fetch('/gateways', 'get', metadata);
    };
    /**
     * Activate a new gateway. To activate a device and associate it with your organization,
     * enter its serial number. Each device's serial number can also be found on its label or
     * packaging, or from your order confirmation email. A Not Found error could mean that the
     * serial was not found or it has already been activated
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Gateways** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Activate a new gateway
     * @throws FetchError<401, types.PostGatewayResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostGatewayResponse404> Not Found response.
     * @throws FetchError<405, types.PostGatewayResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostGatewayResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostGatewayResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostGatewayResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostGatewayResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostGatewayResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostGatewayResponse504> Gateway Timeout response.
     */
    SDK.prototype.postGateway = function (body) {
        return this.core.fetch('/gateways', 'post', body);
    };
    /**
     * Deactivate a gateway
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Gateways** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Deactivate a gateway
     * @throws FetchError<401, types.DeleteGatewayResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteGatewayResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteGatewayResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteGatewayResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteGatewayResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteGatewayResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteGatewayResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteGatewayResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteGatewayResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteGateway = function (metadata) {
        return this.core.fetch('/gateways/{id}', 'delete', metadata);
    };
    /**
     * Create a job to generate csv files of IFTA mileage segments.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write IFTA (US)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create a job to generate csv files of IFTA mileage segments.
     * @throws FetchError<401, types.CreateIftaDetailJobResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateIftaDetailJobResponse404> Not Found response.
     * @throws FetchError<405, types.CreateIftaDetailJobResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateIftaDetailJobResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateIftaDetailJobResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateIftaDetailJobResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateIftaDetailJobResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateIftaDetailJobResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateIftaDetailJobResponse504> Gateway Timeout response.
     */
    SDK.prototype.createIftaDetailJob = function (body) {
        return this.core.fetch('/ifta-detail/csv', 'post', body);
    };
    /**
     * Get information about an existing IFTA detail job.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read IFTA (US)** under the Compliance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get information about an existing IFTA detail job.
     * @throws FetchError<401, types.GetIftaDetailJobResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIftaDetailJobResponse404> Not Found response.
     * @throws FetchError<405, types.GetIftaDetailJobResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIftaDetailJobResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIftaDetailJobResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIftaDetailJobResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIftaDetailJobResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIftaDetailJobResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIftaDetailJobResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIftaDetailJob = function (metadata) {
        return this.core.fetch('/ifta-detail/csv/{id}', 'get', metadata);
    };
    /**
     * List all assets in the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all assets
     */
    SDK.prototype.getIndustrialAssets = function (metadata) {
        return this.core.fetch('/industrial/assets', 'get', metadata);
    };
    /**
     * Create an asset with optional configuration parameters.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create an asset
     */
    SDK.prototype.createIndustrialAsset = function (body) {
        return this.core.fetch('/industrial/assets', 'post', body);
    };
    /**
     * Delete asset.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete an existing asset
     */
    SDK.prototype.deleteIndustrialAsset = function (metadata) {
        return this.core.fetch('/industrial/assets/{id}', 'delete', metadata);
    };
    SDK.prototype.patchIndustrialAsset = function (body, metadata) {
        return this.core.fetch('/industrial/assets/{id}', 'patch', body, metadata);
    };
    /**
     * Writes values to multiple data outputs on an asset simultaneously. Only the provided
     * data outputs will be updated.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Writes to data outputs on an asset
     * @throws FetchError<401, types.PatchAssetDataOutputsResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchAssetDataOutputsResponse404> Not Found response.
     * @throws FetchError<405, types.PatchAssetDataOutputsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchAssetDataOutputsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchAssetDataOutputsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchAssetDataOutputsResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchAssetDataOutputsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchAssetDataOutputsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchAssetDataOutputsResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchAssetDataOutputs = function (body, metadata) {
        return this.core.fetch('/industrial/assets/{id}/data-outputs', 'patch', body, metadata);
    };
    /**
     * Returns all data inputs, optionally filtered by tags or asset ids.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all data inputs
     */
    SDK.prototype.getDataInputs = function (metadata) {
        return this.core.fetch('/industrial/data-inputs', 'get', metadata);
    };
    /**
     * Returns last known data points for all data inputs. This can be filtered by optional
     * tags, specific data input IDs or asset IDs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List most recent data points for data inputs
     */
    SDK.prototype.getDataInputDataSnapshot = function (metadata) {
        return this.core.fetch('/industrial/data-inputs/data-points', 'get', metadata);
    };
    /**
     * Follow a continuous feed of all data input data points.
     *
     * Your first call to this endpoint will provide you with the most recent data points for
     * each data input and a `pagination` object that contains an `endCursor`.
     *
     * You can provide the `endCursor` to the `after` parameter of this endpoint to get data
     * point updates since that `endCursor`.
     *
     * If `hasNextPage` is `false`, no updates are readily available yet. We suggest waiting a
     * minimum of 5 seconds before requesting updates.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Follow a real-time feed of data points for data inputs
     */
    SDK.prototype.getDataInputDataFeed = function (metadata) {
        return this.core.fetch('/industrial/data-inputs/data-points/feed', 'get', metadata);
    };
    /**
     * Returns all known data points during the given time range for all data inputs. This can
     * be filtered by optional tags, specific data input IDs or asset IDs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List historical data points for data inputs
     */
    SDK.prototype.getDataInputDataHistory = function (metadata) {
        return this.core.fetch('/industrial/data-inputs/data-points/history', 'get', metadata);
    };
    /**
     * Returns all issues data for the specified IDs.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Issues** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get a list of specified issues.
     * @throws FetchError<401, types.GetIssuesResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIssuesResponse404> Not Found response.
     * @throws FetchError<405, types.GetIssuesResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIssuesResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIssuesResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIssuesResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIssuesResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIssuesResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIssuesResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIssues = function (metadata) {
        return this.core.fetch('/issues', 'get', metadata);
    };
    /**
     * Updates an instance of an issue.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Issues** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Update a single issue.
     * @throws FetchError<401, types.PatchIssueResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchIssueResponse404> Not Found response.
     * @throws FetchError<405, types.PatchIssueResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchIssueResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchIssueResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchIssueResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchIssueResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchIssueResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchIssueResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchIssue = function (body) {
        return this.core.fetch('/issues', 'patch', body);
    };
    /**
     * Returns all issues data that has been created or modified for your organization based on
     * the time parameters passed in. Results are paginated and are sorted by last modified
     * date. If you include an endTime, the endpoint will return data up until that point
     * (exclusive). If you don’t include an endTime, you can continue to poll the API real-time
     * with the pagination cursor that gets returned on every call.
     *
     * **Beta:** This endpoint is in beta and is likely to change before being broadly
     * available. Reach out to your Samsara Representative to have Forms APIs enabled for your
     * organization.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Issues** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [beta] Get a stream of filtered issues.
     * @throws FetchError<401, types.GetIssuesStreamResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetIssuesStreamResponse404> Not Found response.
     * @throws FetchError<405, types.GetIssuesStreamResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetIssuesStreamResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetIssuesStreamResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetIssuesStreamResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetIssuesStreamResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetIssuesStreamResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetIssuesStreamResponse504> Gateway Timeout response.
     */
    SDK.prototype.getIssuesStream = function (metadata) {
        return this.core.fetch('/issues/stream', 'get', metadata);
    };
    /**
     * Delete Live Sharing Link.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Live Sharing Links** under the Driver Workflow
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete non-expired Live Sharing Link
     * @throws FetchError<401, types.DeleteLiveSharingLinkResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteLiveSharingLinkResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteLiveSharingLinkResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteLiveSharingLinkResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteLiveSharingLinkResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteLiveSharingLinkResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteLiveSharingLinkResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteLiveSharingLinkResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteLiveSharingLinkResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteLiveSharingLink = function (metadata) {
        return this.core.fetch('/live-shares', 'delete', metadata);
    };
    /**
     * Returns all non-expired Live Sharing Links.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Live Sharing Links** under the Driver Workflow
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Get Live Sharing Links
     * @throws FetchError<401, types.GetLiveSharingLinksResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetLiveSharingLinksResponse404> Not Found response.
     * @throws FetchError<405, types.GetLiveSharingLinksResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetLiveSharingLinksResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetLiveSharingLinksResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetLiveSharingLinksResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetLiveSharingLinksResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetLiveSharingLinksResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetLiveSharingLinksResponse504> Gateway Timeout response.
     */
    SDK.prototype.getLiveSharingLinks = function (metadata) {
        return this.core.fetch('/live-shares', 'get', metadata);
    };
    /**
     * Update Live Sharing Link.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Live Sharing Links** under the Driver Workflow
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update non-expired Live Sharing Link
     * @throws FetchError<401, types.UpdateLiveSharingLinkResponse401> Unauthorized response.
     * @throws FetchError<404, types.UpdateLiveSharingLinkResponse404> Not Found response.
     * @throws FetchError<405, types.UpdateLiveSharingLinkResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.UpdateLiveSharingLinkResponse429> Too Many Requests response.
     * @throws FetchError<500, types.UpdateLiveSharingLinkResponse500> Internal Server Error response.
     * @throws FetchError<501, types.UpdateLiveSharingLinkResponse501> Not Implemented response.
     * @throws FetchError<502, types.UpdateLiveSharingLinkResponse502> Bad Gateway response.
     * @throws FetchError<503, types.UpdateLiveSharingLinkResponse503> Service Unavailable response.
     * @throws FetchError<504, types.UpdateLiveSharingLinkResponse504> Gateway Timeout response.
     */
    SDK.prototype.updateLiveSharingLink = function (body, metadata) {
        return this.core.fetch('/live-shares', 'patch', body, metadata);
    };
    /**
     * Create Live Sharing Link.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Live Sharing Links** under the Driver Workflow
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create Live Sharing Link
     * @throws FetchError<401, types.CreateLiveSharingLinkResponse401> Unauthorized response.
     * @throws FetchError<404, types.CreateLiveSharingLinkResponse404> Not Found response.
     * @throws FetchError<405, types.CreateLiveSharingLinkResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.CreateLiveSharingLinkResponse429> Too Many Requests response.
     * @throws FetchError<500, types.CreateLiveSharingLinkResponse500> Internal Server Error response.
     * @throws FetchError<501, types.CreateLiveSharingLinkResponse501> Not Implemented response.
     * @throws FetchError<502, types.CreateLiveSharingLinkResponse502> Bad Gateway response.
     * @throws FetchError<503, types.CreateLiveSharingLinkResponse503> Service Unavailable response.
     * @throws FetchError<504, types.CreateLiveSharingLinkResponse504> Gateway Timeout response.
     */
    SDK.prototype.createLiveSharingLink = function (body) {
        return this.core.fetch('/live-shares', 'post', body);
    };
    /**
     * Get information about your organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Org Information** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get information about your organization
     */
    SDK.prototype.getOrganizationInfo = function () {
        return this.core.fetch('/me', 'get');
    };
    /**
     * Get paginated custom report configs created in the organization.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Custom Reports** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * Endpoints in this section are in Preview. These APIs are not functional and are instead
     * for soliciting feedback from our API users on the intended design of this API.
     * Additionally, it is not guaranteed that we will be releasing an endpoint included in
     * this section to production. This means that developers should **NOT** rely on these APIs
     * to build business critical applications
     *
     * - Samsara may change the structure of a preview API's interface without versioning or
     * any notice to API users.
     *
     * - When an endpoint becomes generally available, it will be announced in the API
     * [changelog](https://developers.samsara.com/changelog).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [preview] Get custom report configs
     * @throws FetchError<401, types.GetCustomReportConfigsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetCustomReportConfigsResponse404> Not Found response.
     * @throws FetchError<405, types.GetCustomReportConfigsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetCustomReportConfigsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetCustomReportConfigsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetCustomReportConfigsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetCustomReportConfigsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetCustomReportConfigsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetCustomReportConfigsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getCustomReportConfigs = function (metadata) {
        return this.core.fetch('/preview/custom-reports/configs', 'get', metadata);
    };
    /**
     * Get all custom report runs with the provided IDs or customReportIds.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Custom Reports** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * Endpoints in this section are in Preview. These APIs are not functional and are instead
     * for soliciting feedback from our API users on the intended design of this API.
     * Additionally, it is not guaranteed that we will be releasing an endpoint included in
     * this section to production. This means that developers should **NOT** rely on these APIs
     * to build business critical applications
     *
     * - Samsara may change the structure of a preview API's interface without versioning or
     * any notice to API users.
     *
     * - When an endpoint becomes generally available, it will be announced in the API
     * [changelog](https://developers.samsara.com/changelog).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [preview] Get custom report runs
     * @throws FetchError<401, types.GetCustomReportRunsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetCustomReportRunsResponse404> Not Found response.
     * @throws FetchError<405, types.GetCustomReportRunsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetCustomReportRunsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetCustomReportRunsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetCustomReportRunsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetCustomReportRunsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetCustomReportRunsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetCustomReportRunsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getCustomReportRuns = function (metadata) {
        return this.core.fetch('/preview/custom-reports/runs', 'get', metadata);
    };
    /**
     * Create a custom report run which then gets queued up to generate custom report data for
     * the report run.
     *
     *  <b>Rate limit:</b> 240 requests/day (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Custom Reports** under the Closed Beta category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * Endpoints in this section are in Preview. These APIs are not functional and are instead
     * for soliciting feedback from our API users on the intended design of this API.
     * Additionally, it is not guaranteed that we will be releasing an endpoint included in
     * this section to production. This means that developers should **NOT** rely on these APIs
     * to build business critical applications
     *
     * - Samsara may change the structure of a preview API's interface without versioning or
     * any notice to API users.
     *
     * - When an endpoint becomes generally available, it will be announced in the API
     * [changelog](https://developers.samsara.com/changelog).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [preview] Create a custom report run
     * @throws FetchError<401, types.PostCustomReportRunResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostCustomReportRunResponse404> Not Found response.
     * @throws FetchError<405, types.PostCustomReportRunResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostCustomReportRunResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostCustomReportRunResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostCustomReportRunResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostCustomReportRunResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostCustomReportRunResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostCustomReportRunResponse504> Gateway Timeout response.
     */
    SDK.prototype.postCustomReportRun = function (body) {
        return this.core.fetch('/preview/custom-reports/runs', 'post', body);
    };
    /**
     * This endpoint will return the custom report data for a given custom report run ID. For
     * more information regarding custom report columns, please see our [KB article section on
     * Custom Report
     * Fields](https://kb.samsara.com/hc/en-us/articles/360052711232-Manage-Custom-Reports).
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Custom Reports** under the Closed Beta category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * Endpoints in this section are in Preview. These APIs are not functional and are instead
     * for soliciting feedback from our API users on the intended design of this API.
     * Additionally, it is not guaranteed that we will be releasing an endpoint included in
     * this section to production. This means that developers should **NOT** rely on these APIs
     * to build business critical applications
     *
     * - Samsara may change the structure of a preview API's interface without versioning or
     * any notice to API users.
     *
     * - When an endpoint becomes generally available, it will be announced in the API
     * [changelog](https://developers.samsara.com/changelog).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [preview] Get custom report run data
     * @throws FetchError<401, types.GetCustomReportRunDataResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetCustomReportRunDataResponse404> Not Found response.
     * @throws FetchError<405, types.GetCustomReportRunDataResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetCustomReportRunDataResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetCustomReportRunDataResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetCustomReportRunDataResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetCustomReportRunDataResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetCustomReportRunDataResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetCustomReportRunDataResponse504> Gateway Timeout response.
     */
    SDK.prototype.getCustomReportRunData = function (metadata) {
        return this.core.fetch('/preview/custom-reports/runs/data', 'get', metadata);
    };
    /**
     * This endpoint will return trips that have been collected for your organization based on
     * the time parameters passed in. Results are paginated.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Trips** under the Closed Beta category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * Endpoints in this section are in Preview. These APIs are not functional and are instead
     * for soliciting feedback from our API users on the intended design of this API.
     * Additionally, it is not guaranteed that we will be releasing an endpoint included in
     * this section to production. This means that developers should **NOT** rely on these APIs
     * to build business critical applications
     *
     * - Samsara may change the structure of a preview API's interface without versioning or
     * any notice to API users.
     *
     * - When an endpoint becomes generally available, it will be announced in the API
     * [changelog](https://developers.samsara.com/changelog).
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary [preview] Get trips
     * @throws FetchError<401, types.GetTripsResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetTripsResponse404> Not Found response.
     * @throws FetchError<405, types.GetTripsResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetTripsResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetTripsResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetTripsResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetTripsResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetTripsResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetTripsResponse504> Gateway Timeout response.
     */
    SDK.prototype.getTrips = function (metadata) {
        return this.core.fetch('/preview/trips/stream', 'get', metadata);
    };
    /**
     * Return all of the tags for an organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all tags
     */
    SDK.prototype.listTags = function (metadata) {
        return this.core.fetch('/tags', 'get', metadata);
    };
    /**
     * Create a new tag for the organization. This may include up to 20,000 tagged entities.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a tag
     */
    SDK.prototype.createTag = function (body) {
        return this.core.fetch('/tags', 'post', body);
    };
    /**
     * Permanently deletes a tag.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete a tag
     */
    SDK.prototype.deleteTag = function (metadata) {
        return this.core.fetch('/tags/{id}', 'delete', metadata);
    };
    /**
     * Fetch a tag by id.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a tag
     */
    SDK.prototype.getTag = function (metadata) {
        return this.core.fetch('/tags/{id}', 'get', metadata);
    };
    /**
     * Update an existing tag. **Note** this implementation of patch uses [the JSON merge
     * patch](https://tools.ietf.org/html/rfc7396) proposed standard.
     *
     *  This means that any fields included in the patch request will _overwrite_ fields which
     * exist on the target resource.
     *
     *  For arrays, this means any array included in the request will _replace_ the array that
     * exists at the specified path, it will not _add_ to the existing array.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a tag
     */
    SDK.prototype.patchTag = function (body, metadata) {
        return this.core.fetch('/tags/{id}', 'patch', body, metadata);
    };
    /**
     * Update a tag with a new name and new members. This API call would replace all old
     * members of a tag with new members specified in the request body.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Tags** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a tag
     */
    SDK.prototype.replaceTag = function (body, metadata) {
        return this.core.fetch('/tags/{id}', 'put', body, metadata);
    };
    /**
     * Returns a list of all user roles in an organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all user roles
     */
    SDK.prototype.listUserRoles = function (metadata) {
        return this.core.fetch('/user-roles', 'get', metadata);
    };
    /**
     * Returns a list of all users in an organization. Users that have expired access will not
     * be returned.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all users
     */
    SDK.prototype.listUsers = function (metadata) {
        return this.core.fetch('/users', 'get', metadata);
    };
    /**
     * Add a user to the organization.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Create a user
     */
    SDK.prototype.createUser = function (body) {
        return this.core.fetch('/users', 'post', body);
    };
    /**
     * Delete the given user.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete a user
     */
    SDK.prototype.deleteUser = function (metadata) {
        return this.core.fetch('/users/{id}', 'delete', metadata);
    };
    /**
     * Get a specific user's information. Users that have expired access will not be returned.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Retrieve a user
     */
    SDK.prototype.getUser = function (metadata) {
        return this.core.fetch('/users/{id}', 'get', metadata);
    };
    /**
     * Update a specific user's information.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Users** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a user
     */
    SDK.prototype.updateUser = function (body, metadata) {
        return this.core.fetch('/users/{id}', 'patch', body, metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch all of the assets.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List all assets
     */
    SDK.prototype.v1getAllAssets = function () {
        return this.core.fetch('/v1/fleet/assets', 'get');
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch current locations of all assets.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List current location for all assets
     */
    SDK.prototype.v1getAllAssetCurrentLocations = function (metadata) {
        return this.core.fetch('/v1/fleet/assets/locations', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetches all reefers and reefer-specific stats.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Trailers** under the Trailers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List stats for all reefers
     */
    SDK.prototype.v1getAssetsReefers = function (metadata) {
        return this.core.fetch('/v1/fleet/assets/reefers', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * List historical locations for a given asset.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Equipment Statistics** under the Equipment category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List historical locations for a given asset
     */
    SDK.prototype.v1getAssetLocation = function (metadata) {
        return this.core.fetch('/v1/fleet/assets/{asset_id}/locations', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch the reefer-specific stats of an asset.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Trailers** under the Trailers category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List stats for a given reefer
     */
    SDK.prototype.v1getAssetReefer = function (metadata) {
        return this.core.fetch('/v1/fleet/assets/{asset_id}/reefer', 'get', metadata);
    };
    SDK.prototype.v1deleteDispatchRouteById = function (body, metadata) {
        return this.core.fetch('/v1/fleet/dispatch/routes/{route_id_or_external_id}', 'delete', body, metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch the safety score for the driver.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch driver safety score
     */
    SDK.prototype.v1getDriverSafetyScore = function (metadata) {
        return this.core.fetch('/v1/fleet/drivers/{driverId}/safety/score', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Set an individual driver’s current duty status to 'On Duty' or 'Off Duty'.
     *
     *  To ensure compliance with the ELD Mandate, only  authenticated drivers can make direct
     * duty status changes on their own logbook. Any system external to the Samsara Driver App
     * using this endpoint to trigger duty status changes must ensure that such changes are
     * only triggered directly by the driver in question and that the driver has been properly
     * authenticated. This endpoint should not be used to algorithmically trigger duty status
     * changes nor should it be used by personnel besides the driver to trigger duty status
     * changes on the driver’s behalf. Carriers and their drivers are ultimately responsible
     * for maintaining accurate logs and should confirm that their use of the endpoint is
     * compliant with the ELD Mandate.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write ELD Hours of Service (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Set a duty status for a specific driver
     */
    SDK.prototype.setCurrentDutyStatus = function (body, metadata) {
        return this.core.fetch('/v1/fleet/drivers/{driver_id}/hos/duty_status', 'post', body, metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get the HOS (hours of service) signin and signout logs for the specified driver. The
     * response includes 4 fields that are now deprecated.
     *
     * **Note:** If data is still being uploaded from the Samsara Driver App, it may not be
     * completely reflected in the response from this endpoint. The best practice is to wait a
     * couple of days before querying this endpoint to make sure that all data from the Samsara
     * Driver App has been uploaded.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read ELD Hours of Service (US)** under the Compliance
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get HOS signin and signout
     */
    SDK.prototype.v1getFleetHosAuthenticationLogs = function (metadata) {
        return this.core.fetch('/v1/fleet/hos_authentication_logs', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get list of the vehicles with any engine faults or check light data.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read DVIRs** under the Maintenance category when creating
     * or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get vehicles with engine faults or check lights
     */
    SDK.prototype.v1getFleetMaintenanceList = function () {
        return this.core.fetch('/v1/fleet/maintenance/list', 'get');
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get all messages.
     *
     *  <b>Rate limit:</b> 75 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Messages** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get all messages.
     */
    SDK.prototype.v1getMessages = function (metadata) {
        return this.core.fetch('/v1/fleet/messages', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Send a message to a list of driver ids.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Messages** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Send a message to a list of driver ids.
     */
    SDK.prototype.v1createMessages = function (body) {
        return this.core.fetch('/v1/fleet/messages', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch trailer assignment data for all trailers in your organization.
     *
     *  <b>Rate limit:</b> 100 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List trailer assignments for all trailers
     */
    SDK.prototype.v1getAllTrailerAssignments = function (metadata) {
        return this.core.fetch('/v1/fleet/trailers/assignments', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch trailer assignment data for a single trailer.
     *
     *  <b>Rate limit:</b> 100 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Assignments** under the Assignments category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary List trailer assignments for a given trailer
     */
    SDK.prototype.v1getFleetTrailerAssignments = function (metadata) {
        return this.core.fetch('/v1/fleet/trailers/{trailerId}/assignments', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get historical trips data for specified vehicle. This method returns a set of historical
     * trips data for the specified vehicle in the specified time range.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Vehicle Trips** under the Vehicles category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get vehicle trips
     */
    SDK.prototype.v1getFleetTrips = function (metadata) {
        return this.core.fetch('/v1/fleet/trips', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch harsh event details for a vehicle.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch harsh events
     */
    SDK.prototype.v1getVehicleHarshEvent = function (metadata) {
        return this.core.fetch('/v1/fleet/vehicles/{vehicleId}/safety/harsh_event', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch the safety score for the vehicle.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Safety Events & Scores** under the Safety & Cameras
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch vehicle safety scores
     */
    SDK.prototype.v1getVehicleSafetyScore = function (metadata) {
        return this.core.fetch('/v1/fleet/vehicles/{vehicleId}/safety/score', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch all cameras.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch industrial cameras
     */
    SDK.prototype.v1getCameras = function () {
        return this.core.fetch('/v1/industrial/vision/cameras', 'get');
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch configured programs on the camera.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch industrial camera programs
     */
    SDK.prototype.v1getVisionProgramsByCamera = function (metadata) {
        return this.core.fetch('/v1/industrial/vision/cameras/{camera_id}/programs', 'get', metadata);
    };
    /**
     * Fetch the latest run for a camera or program by default. If startedAtMs is supplied,
     * fetch the specific run that corresponds to that start time.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch the latest run for a camera or program
     */
    SDK.prototype.v1getVisionLatestRunCamera = function (metadata) {
        return this.core.fetch('/v1/industrial/vision/run/camera/{camera_id}', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch runs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch runs
     */
    SDK.prototype.v1getVisionRuns = function (metadata) {
        return this.core.fetch('/v1/industrial/vision/runs', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch runs by camera.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch runs by camera
     */
    SDK.prototype.getVisionRunsByCamera = function (metadata) {
        return this.core.fetch('/v1/industrial/vision/runs/{camera_id}', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Fetch runs by camera and program.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Read Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Fetch runs by camera and program
     */
    SDK.prototype.v1getVisionRunsByCameraAndProgram = function (metadata) {
        return this.core.fetch('/v1/industrial/vision/runs/{camera_id}/{program_id}/{started_at_ms}', 'get', metadata);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get historical data for machine objects. This method returns a set of historical data
     * for all machines.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get machine history
     */
    SDK.prototype.v1getMachinesHistory = function (body) {
        return this.core.fetch('/v1/machines/history', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get machine objects. This method returns a list of the machine objects in the Samsara
     * Cloud and information about them.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Industrial** under the Industrial category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get machines
     */
    SDK.prototype.v1getMachines = function () {
        return this.core.fetch('/v1/machines/list', 'post');
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get cargo monitor status (empty / full) for requested sensors.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get cargo status
     */
    SDK.prototype.v1getSensorsCargo = function (body) {
        return this.core.fetch('/v1/sensors/cargo', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get door monitor status (closed / open) for requested sensors.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get door status
     */
    SDK.prototype.v1getSensorsDoor = function (body) {
        return this.core.fetch('/v1/sensors/door', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get historical data for specified sensors. This method returns a set of historical data
     * for the specified sensors in the specified time range and at the specified time
     * resolution.
     *
     *  <b>Rate limit:</b> 100 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get sensor history
     */
    SDK.prototype.v1getSensorsHistory = function (body) {
        return this.core.fetch('/v1/sensors/history', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get humidity for requested sensors. This method returns the current relative humidity
     * for the requested sensors.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get humidity
     */
    SDK.prototype.v1getSensorsHumidity = function (body) {
        return this.core.fetch('/v1/sensors/humidity', 'post', body);
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get sensor objects. This method returns a list of the sensor objects in the Samsara
     * Cloud and information about them.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get all sensors
     */
    SDK.prototype.v1getSensors = function () {
        return this.core.fetch('/v1/sensors/list', 'post');
    };
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Get temperature for requested sensors. This method returns the current ambient
     * temperature (and probe temperature if applicable) for the requested sensors.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Sensors** under the Equipment category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Get temperature
     */
    SDK.prototype.v1getSensorsTemperature = function (body) {
        return this.core.fetch('/v1/sensors/temperature', 'post', body);
    };
    /**
     * List all webhooks belonging to a specific org.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Webhooks** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary List all webhooks belonging to a specific org.
     * @throws FetchError<401, types.ListWebhooksResponse401> Unauthorized response.
     * @throws FetchError<404, types.ListWebhooksResponse404> Not Found response.
     * @throws FetchError<405, types.ListWebhooksResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.ListWebhooksResponse429> Too Many Requests response.
     * @throws FetchError<500, types.ListWebhooksResponse500> Internal Server Error response.
     * @throws FetchError<501, types.ListWebhooksResponse501> Not Implemented response.
     * @throws FetchError<502, types.ListWebhooksResponse502> Bad Gateway response.
     * @throws FetchError<503, types.ListWebhooksResponse503> Service Unavailable response.
     * @throws FetchError<504, types.ListWebhooksResponse504> Gateway Timeout response.
     */
    SDK.prototype.listWebhooks = function (metadata) {
        return this.core.fetch('/webhooks', 'get', metadata);
    };
    /**
     * Create a webhook
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Webhooks** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Create a webhook
     * @throws FetchError<401, types.PostWebhooksResponse401> Unauthorized response.
     * @throws FetchError<404, types.PostWebhooksResponse404> Not Found response.
     * @throws FetchError<405, types.PostWebhooksResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PostWebhooksResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PostWebhooksResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PostWebhooksResponse501> Not Implemented response.
     * @throws FetchError<502, types.PostWebhooksResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PostWebhooksResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PostWebhooksResponse504> Gateway Timeout response.
     */
    SDK.prototype.postWebhooks = function (body) {
        return this.core.fetch('/webhooks', 'post', body);
    };
    /**
     * Delete a webhook with the given ID.
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Webhooks** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Delete a webhook with the given ID
     * @throws FetchError<401, types.DeleteWebhookResponse401> Unauthorized response.
     * @throws FetchError<404, types.DeleteWebhookResponse404> Not Found response.
     * @throws FetchError<405, types.DeleteWebhookResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.DeleteWebhookResponse429> Too Many Requests response.
     * @throws FetchError<500, types.DeleteWebhookResponse500> Internal Server Error response.
     * @throws FetchError<501, types.DeleteWebhookResponse501> Not Implemented response.
     * @throws FetchError<502, types.DeleteWebhookResponse502> Bad Gateway response.
     * @throws FetchError<503, types.DeleteWebhookResponse503> Service Unavailable response.
     * @throws FetchError<504, types.DeleteWebhookResponse504> Gateway Timeout response.
     */
    SDK.prototype.deleteWebhook = function (metadata) {
        return this.core.fetch('/webhooks/{id}', 'delete', metadata);
    };
    /**
     * Retrieve a webhook with given ID.
     *
     *  <b>Rate limit:</b> 5 requests/sec (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Read Webhooks** under the Setup & Administration category
     * when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Retrieve a webhook with given ID
     * @throws FetchError<401, types.GetWebhookResponse401> Unauthorized response.
     * @throws FetchError<404, types.GetWebhookResponse404> Not Found response.
     * @throws FetchError<405, types.GetWebhookResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.GetWebhookResponse429> Too Many Requests response.
     * @throws FetchError<500, types.GetWebhookResponse500> Internal Server Error response.
     * @throws FetchError<501, types.GetWebhookResponse501> Not Implemented response.
     * @throws FetchError<502, types.GetWebhookResponse502> Bad Gateway response.
     * @throws FetchError<503, types.GetWebhookResponse503> Service Unavailable response.
     * @throws FetchError<504, types.GetWebhookResponse504> Gateway Timeout response.
     */
    SDK.prototype.getWebhook = function (metadata) {
        return this.core.fetch('/webhooks/{id}', 'get', metadata);
    };
    /**
     * Update a specific webhook's information.  **Note** this implementation of patch uses
     * [the JSON merge patch](https://tools.ietf.org/html/rfc7396) proposed standard.
     *  This means that any fields included in the patch request will _overwrite_ fields which
     * exist on the target resource.
     *  For arrays, this means any array included in the request will _replace_ the array that
     * exists at the specified path, it will not _add_ to the existing array
     *
     *  <b>Rate limit:</b> 100 requests/min (learn more about rate limits <a
     * href="https://developers.samsara.com/docs/rate-limits" target="_blank">here</a>).
     *
     * To use this endpoint, select **Write Webhooks** under the Setup & Administration
     * category when creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * @summary Update a specific webhook's information.
     * @throws FetchError<401, types.PatchWebhookResponse401> Unauthorized response.
     * @throws FetchError<404, types.PatchWebhookResponse404> Not Found response.
     * @throws FetchError<405, types.PatchWebhookResponse405> Method Not Allowed response.
     * @throws FetchError<429, types.PatchWebhookResponse429> Too Many Requests response.
     * @throws FetchError<500, types.PatchWebhookResponse500> Internal Server Error response.
     * @throws FetchError<501, types.PatchWebhookResponse501> Not Implemented response.
     * @throws FetchError<502, types.PatchWebhookResponse502> Bad Gateway response.
     * @throws FetchError<503, types.PatchWebhookResponse503> Service Unavailable response.
     * @throws FetchError<504, types.PatchWebhookResponse504> Gateway Timeout response.
     */
    SDK.prototype.patchWebhook = function (body, metadata) {
        return this.core.fetch('/webhooks/{id}', 'patch', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
