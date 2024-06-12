import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
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
    listAddresses(metadata?: types.ListAddressesMetadataParam): Promise<FetchResponse<200, types.ListAddressesResponse200> | FetchResponse<number, types.ListAddressesResponseDefault>>;
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
    createAddress(body: types.CreateAddressBodyParam): Promise<FetchResponse<200, types.CreateAddressResponse200> | FetchResponse<number, types.CreateAddressResponseDefault>>;
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
    deleteAddress(metadata: types.DeleteAddressMetadataParam): Promise<FetchResponse<204, types.DeleteAddressResponse204> | FetchResponse<number, types.DeleteAddressResponseDefault>>;
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
    getAddress(metadata: types.GetAddressMetadataParam): Promise<FetchResponse<200, types.GetAddressResponse200> | FetchResponse<number, types.GetAddressResponseDefault>>;
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
    updateAddress(body: types.UpdateAddressBodyParam, metadata: types.UpdateAddressMetadataParam): Promise<FetchResponse<200, types.UpdateAddressResponse200> | FetchResponse<number, types.UpdateAddressResponseDefault>>;
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
    deleteConfigurations(metadata: types.DeleteConfigurationsMetadataParam): Promise<FetchResponse<number, types.DeleteConfigurationsResponseDefault>>;
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
    getConfigurations(metadata?: types.GetConfigurationsMetadataParam): Promise<FetchResponse<200, types.GetConfigurationsResponse200> | FetchResponse<number, types.GetConfigurationsResponseDefault>>;
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
    patchConfigurations(body: types.PatchConfigurationsBodyParam): Promise<FetchResponse<200, types.PatchConfigurationsResponse200> | FetchResponse<number, types.PatchConfigurationsResponseDefault>>;
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
    postConfigurations(body: types.PostConfigurationsBodyParam): Promise<FetchResponse<200, types.PostConfigurationsResponse200> | FetchResponse<number, types.PostConfigurationsResponseDefault>>;
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
    getIncidents(metadata: types.GetIncidentsMetadataParam): Promise<FetchResponse<200, types.GetIncidentsResponse200> | FetchResponse<number, types.GetIncidentsResponseDefault>>;
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
    deleteAsset(metadata: types.DeleteAssetMetadataParam): Promise<FetchResponse<number, types.DeleteAssetResponseDefault>>;
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
    listAssets(metadata?: types.ListAssetsMetadataParam): Promise<FetchResponse<200, types.ListAssetsResponse200> | FetchResponse<number, types.ListAssetsResponseDefault>>;
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
    updateAsset(body: types.UpdateAssetBodyParam, metadata: types.UpdateAssetMetadataParam): Promise<FetchResponse<200, types.UpdateAssetResponse200> | FetchResponse<number, types.UpdateAssetResponseDefault>>;
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
    createAsset(body: types.CreateAssetBodyParam): Promise<FetchResponse<200, types.CreateAssetResponse200> | FetchResponse<number, types.CreateAssetResponseDefault>>;
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
    getAttributesByEntityType(metadata: types.GetAttributesByEntityTypeMetadataParam): Promise<FetchResponse<200, types.GetAttributesByEntityTypeResponse200> | FetchResponse<number, types.GetAttributesByEntityTypeResponseDefault>>;
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
    createAttribute(body: types.CreateAttributeBodyParam): Promise<FetchResponse<200, types.CreateAttributeResponse200> | FetchResponse<number, types.CreateAttributeResponseDefault>>;
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
    deleteAttribute(metadata: types.DeleteAttributeMetadataParam): Promise<FetchResponse<204, types.DeleteAttributeResponse204> | FetchResponse<number, types.DeleteAttributeResponseDefault>>;
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
    getAttribute(metadata: types.GetAttributeMetadataParam): Promise<FetchResponse<200, types.GetAttributeResponse200> | FetchResponse<number, types.GetAttributeResponseDefault>>;
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
    updateAttribute(body: types.UpdateAttributeBodyParam, metadata: types.UpdateAttributeMetadataParam): Promise<FetchResponse<200, types.UpdateAttributeResponse200> | FetchResponse<number, types.UpdateAttributeResponseDefault>>;
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
    getAempEquipmentList(metadata: types.GetAempEquipmentListMetadataParam): Promise<FetchResponse<200, types.GetAempEquipmentListResponse200> | FetchResponse<number, types.GetAempEquipmentListResponseDefault>>;
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
    getDriverEfficiency(metadata?: types.GetDriverEfficiencyMetadataParam): Promise<FetchResponse<200, types.GetDriverEfficiencyResponse200> | FetchResponse<number, types.GetDriverEfficiencyResponseDefault>>;
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
    patchEquipment(body: types.PatchEquipmentBodyParam, metadata: types.PatchEquipmentMetadataParam): Promise<FetchResponse<200, types.PatchEquipmentResponse200> | FetchResponse<number, types.PatchEquipmentResponseDefault>>;
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
    getHosEldEvents(metadata: types.GetHosEldEventsMetadataParam): Promise<FetchResponse<200, types.GetHosEldEventsResponse200> | FetchResponse<number, types.GetHosEldEventsResponseDefault>>;
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
    getTrailerStatsSnapshot(metadata: types.GetTrailerStatsSnapshotMetadataParam): Promise<FetchResponse<200, types.GetTrailerStatsSnapshotResponse200> | FetchResponse<number, types.GetTrailerStatsSnapshotResponseDefault>>;
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
    getTrailerStatsFeed(metadata: types.GetTrailerStatsFeedMetadataParam): Promise<FetchResponse<200, types.GetTrailerStatsFeedResponse200> | FetchResponse<number, types.GetTrailerStatsFeedResponseDefault>>;
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
    getTrailerStatsHistory(metadata: types.GetTrailerStatsHistoryMetadataParam): Promise<FetchResponse<200, types.GetTrailerStatsHistoryResponse200> | FetchResponse<number, types.GetTrailerStatsHistoryResponseDefault>>;
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
    updateEngineImmobilizerState(body: types.UpdateEngineImmobilizerStateBodyParam, metadata: types.UpdateEngineImmobilizerStateMetadataParam): Promise<FetchResponse<number, types.UpdateEngineImmobilizerStateResponseDefault>>;
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
    deleteJob(metadata: types.DeleteJobMetadataParam): Promise<FetchResponse<200, types.DeleteJobResponse200> | FetchResponse<number, types.DeleteJobResponseDefault>>;
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
    getJobs(metadata?: types.GetJobsMetadataParam): Promise<FetchResponse<200, types.GetJobsResponse200> | FetchResponse<number, types.GetJobsResponseDefault>>;
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
    patchJob(body: types.PatchJobBodyParam, metadata: types.PatchJobMetadataParam): Promise<FetchResponse<200, types.PatchJobResponse200> | FetchResponse<number, types.PatchJobResponseDefault>>;
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
    createJob(body: types.CreateJobBodyParam): Promise<FetchResponse<200, types.CreateJobResponse200> | FetchResponse<number, types.CreateJobResponseDefault>>;
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
    getDriverCoachAssignment(metadata?: types.GetDriverCoachAssignmentMetadataParam): Promise<FetchResponse<200, types.GetDriverCoachAssignmentResponse200> | FetchResponse<number, types.GetDriverCoachAssignmentResponseDefault>>;
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
    putDriverCoachAssignment(metadata: types.PutDriverCoachAssignmentMetadataParam): Promise<FetchResponse<200, types.PutDriverCoachAssignmentResponse200> | FetchResponse<number, types.PutDriverCoachAssignmentResponseDefault>>;
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
    getCoachingSessions(metadata: types.GetCoachingSessionsMetadataParam): Promise<FetchResponse<200, types.GetCoachingSessionsResponse200> | FetchResponse<number, types.GetCoachingSessionsResponseDefault>>;
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
    listContacts(metadata?: types.ListContactsMetadataParam): Promise<FetchResponse<200, types.ListContactsResponse200> | FetchResponse<number, types.ListContactsResponseDefault>>;
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
    createContact(body: types.CreateContactBodyParam): Promise<FetchResponse<200, types.CreateContactResponse200> | FetchResponse<number, types.CreateContactResponseDefault>>;
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
    deleteContact(metadata: types.DeleteContactMetadataParam): Promise<FetchResponse<204, types.DeleteContactResponse204> | FetchResponse<number, types.DeleteContactResponseDefault>>;
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
    getContact(metadata: types.GetContactMetadataParam): Promise<FetchResponse<200, types.GetContactResponse200> | FetchResponse<number, types.GetContactResponseDefault>>;
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
    updateContact(body: types.UpdateContactBodyParam, metadata: types.UpdateContactMetadataParam): Promise<FetchResponse<200, types.UpdateContactResponse200> | FetchResponse<number, types.UpdateContactResponseDefault>>;
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
    getDefectTypes(metadata?: types.GetDefectTypesMetadataParam): Promise<FetchResponse<200, types.GetDefectTypesResponse200> | FetchResponse<number, types.GetDefectTypesResponseDefault>>;
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
    streamDefects(metadata: types.StreamDefectsMetadataParam): Promise<FetchResponse<200, types.StreamDefectsResponse200> | FetchResponse<number, types.StreamDefectsResponseDefault>>;
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
    getDriverTrailerAssignments(metadata: types.GetDriverTrailerAssignmentsMetadataParam): Promise<FetchResponse<200, types.GetDriverTrailerAssignmentsResponse200> | FetchResponse<number, types.GetDriverTrailerAssignmentsResponseDefault>>;
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
    updateDriverTrailerAssignment(body: types.UpdateDriverTrailerAssignmentBodyParam, metadata: types.UpdateDriverTrailerAssignmentMetadataParam): Promise<FetchResponse<200, types.UpdateDriverTrailerAssignmentResponse200> | FetchResponse<number, types.UpdateDriverTrailerAssignmentResponseDefault>>;
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
    createDriverTrailerAssignment(body: types.CreateDriverTrailerAssignmentBodyParam): Promise<FetchResponse<200, types.CreateDriverTrailerAssignmentResponse200> | FetchResponse<number, types.CreateDriverTrailerAssignmentResponseDefault>>;
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
    getDvirs(metadata: types.GetDvirsMetadataParam): Promise<FetchResponse<200, types.GetDvirsResponse200> | FetchResponse<number, types.GetDvirsResponseDefault>>;
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
    listCarrierProposedAssignments(metadata?: types.ListCarrierProposedAssignmentsMetadataParam): Promise<FetchResponse<200, types.ListCarrierProposedAssignmentsResponse200> | FetchResponse<number, types.ListCarrierProposedAssignmentsResponseDefault>>;
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
    createCarrierProposedAssignment(body: types.CreateCarrierProposedAssignmentBodyParam): Promise<FetchResponse<200, types.CreateCarrierProposedAssignmentResponse200> | FetchResponse<number, types.CreateCarrierProposedAssignmentResponseDefault>>;
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
    deleteCarrierProposedAssignment(metadata: types.DeleteCarrierProposedAssignmentMetadataParam): Promise<FetchResponse<204, types.DeleteCarrierProposedAssignmentResponse204> | FetchResponse<number, types.DeleteCarrierProposedAssignmentResponseDefault>>;
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
    getDvirDefects(metadata: types.GetDvirDefectsMetadataParam): Promise<FetchResponse<200, types.GetDvirDefectsResponse200> | FetchResponse<number, types.GetDvirDefectsResponseDefault>>;
    /**
     * Updates a given defect. Can be used to resolve a defect by marking its `isResolved`
     * field to `true`.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Defects** under the Maintenance category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Update a defect
     */
    updateDvirDefect(body: types.UpdateDvirDefectBodyParam, metadata: types.UpdateDvirDefectMetadataParam): Promise<FetchResponse<200, types.UpdateDvirDefectResponse200> | FetchResponse<number, types.UpdateDvirDefectResponseDefault>>;
    updateDvirDefect(metadata: types.UpdateDvirDefectMetadataParam): Promise<FetchResponse<200, types.UpdateDvirDefectResponse200> | FetchResponse<number, types.UpdateDvirDefectResponseDefault>>;
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
    getDocumentTypes(metadata?: types.GetDocumentTypesMetadataParam): Promise<FetchResponse<200, types.GetDocumentTypesResponse200> | FetchResponse<number, types.GetDocumentTypesResponseDefault>>;
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
    getDocuments(metadata: types.GetDocumentsMetadataParam): Promise<FetchResponse<200, types.GetDocumentsResponse200> | FetchResponse<number, types.GetDocumentsResponseDefault>>;
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
    postDocument(body: types.PostDocumentBodyParam): Promise<FetchResponse<200, types.PostDocumentResponse200> | FetchResponse<number, types.PostDocumentResponseDefault>>;
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
    generateDocumentPdf(body: types.GenerateDocumentPdfBodyParam): Promise<FetchResponse<200, types.GenerateDocumentPdfResponse200> | FetchResponse<number, types.GenerateDocumentPdfResponseDefault>>;
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
    getDocumentPdf(metadata: types.GetDocumentPdfMetadataParam): Promise<FetchResponse<200, types.GetDocumentPdfResponse200> | FetchResponse<number, types.GetDocumentPdfResponseDefault>>;
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
    deleteDocument(metadata: types.DeleteDocumentMetadataParam): Promise<FetchResponse<number, types.DeleteDocumentResponseDefault>>;
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
    getDocument(metadata: types.GetDocumentMetadataParam): Promise<FetchResponse<200, types.GetDocumentResponse200> | FetchResponse<number, types.GetDocumentResponseDefault>>;
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
    deleteDriverVehicleAssignments(body: types.DeleteDriverVehicleAssignmentsBodyParam): Promise<FetchResponse<number, types.DeleteDriverVehicleAssignmentsResponseDefault>>;
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
    getDriverVehicleAssignments(metadata: types.GetDriverVehicleAssignmentsMetadataParam): Promise<FetchResponse<200, types.GetDriverVehicleAssignmentsResponse200> | FetchResponse<number, types.GetDriverVehicleAssignmentsResponseDefault>>;
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
    updateDriverVehicleAssignment(body: types.UpdateDriverVehicleAssignmentBodyParam): Promise<FetchResponse<202, types.UpdateDriverVehicleAssignmentResponse202> | FetchResponse<number, types.UpdateDriverVehicleAssignmentResponseDefault>>;
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
    createDriverVehicleAssignment(body: types.CreateDriverVehicleAssignmentBodyParam): Promise<FetchResponse<201, types.CreateDriverVehicleAssignmentResponse201> | FetchResponse<number, types.CreateDriverVehicleAssignmentResponseDefault>>;
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
    listDrivers(metadata?: types.ListDriversMetadataParam): Promise<FetchResponse<200, types.ListDriversResponse200> | FetchResponse<number, types.ListDriversResponseDefault>>;
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
    createDriver(body: types.CreateDriverBodyParam): Promise<FetchResponse<200, types.CreateDriverResponse200> | FetchResponse<number, types.CreateDriverResponseDefault>>;
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
    getDriverTachographActivity(metadata: types.GetDriverTachographActivityMetadataParam): Promise<FetchResponse<200, types.GetDriverTachographActivityResponse200> | FetchResponse<number, types.GetDriverTachographActivityResponseDefault>>;
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
    getDriverTachographFiles(metadata: types.GetDriverTachographFilesMetadataParam): Promise<FetchResponse<200, types.GetDriverTachographFilesResponse200> | FetchResponse<number, types.GetDriverTachographFilesResponseDefault>>;
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
    getDriversVehicleAssignments(metadata?: types.GetDriversVehicleAssignmentsMetadataParam): Promise<FetchResponse<200, types.GetDriversVehicleAssignmentsResponse200> | FetchResponse<number, types.GetDriversVehicleAssignmentsResponseDefault>>;
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
    getDriver(metadata: types.GetDriverMetadataParam): Promise<FetchResponse<200, types.GetDriverResponse200> | FetchResponse<number, types.GetDriverResponseDefault>>;
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
    updateDriver(body: types.UpdateDriverBodyParam, metadata: types.UpdateDriverMetadataParam): Promise<FetchResponse<200, types.UpdateDriverResponse200> | FetchResponse<number, types.UpdateDriverResponseDefault>>;
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
    createDvir(body: types.CreateDvirBodyParam): Promise<FetchResponse<200, types.CreateDvirResponse200> | FetchResponse<number, types.CreateDvirResponseDefault>>;
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
    getDvirHistory(metadata: types.GetDvirHistoryMetadataParam): Promise<FetchResponse<200, types.GetDvirHistoryResponse200> | FetchResponse<number, types.GetDvirHistoryResponseDefault>>;
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
    updateDvir(body: types.UpdateDvirBodyParam, metadata: types.UpdateDvirMetadataParam): Promise<FetchResponse<200, types.UpdateDvirResponse200> | FetchResponse<number, types.UpdateDvirResponseDefault>>;
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
    listEquipment(metadata?: types.ListEquipmentMetadataParam): Promise<FetchResponse<200, types.ListEquipmentResponse200> | FetchResponse<number, types.ListEquipmentResponseDefault>>;
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
    getEquipmentLocations(metadata?: types.GetEquipmentLocationsMetadataParam): Promise<FetchResponse<200, types.GetEquipmentLocationsResponse200> | FetchResponse<number, types.GetEquipmentLocationsResponseDefault>>;
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
    getEquipmentLocationsFeed(metadata?: types.GetEquipmentLocationsFeedMetadataParam): Promise<FetchResponse<200, types.GetEquipmentLocationsFeedResponse200> | FetchResponse<number, types.GetEquipmentLocationsFeedResponseDefault>>;
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
    getEquipmentLocationsHistory(metadata: types.GetEquipmentLocationsHistoryMetadataParam): Promise<FetchResponse<200, types.GetEquipmentLocationsHistoryResponse200> | FetchResponse<number, types.GetEquipmentLocationsHistoryResponseDefault>>;
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
    getEquipmentStats(metadata: types.GetEquipmentStatsMetadataParam): Promise<FetchResponse<200, types.GetEquipmentStatsResponse200> | FetchResponse<number, types.GetEquipmentStatsResponseDefault>>;
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
    getEquipmentStatsFeed(metadata: types.GetEquipmentStatsFeedMetadataParam): Promise<FetchResponse<200, types.GetEquipmentStatsFeedResponse200> | FetchResponse<number, types.GetEquipmentStatsFeedResponseDefault>>;
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
    getEquipmentStatsHistory(metadata: types.GetEquipmentStatsHistoryMetadataParam): Promise<FetchResponse<200, types.GetEquipmentStatsHistoryResponse200> | FetchResponse<number, types.GetEquipmentStatsHistoryResponseDefault>>;
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
    getEquipment(metadata: types.GetEquipmentMetadataParam): Promise<FetchResponse<200, types.GetEquipmentResponse200> | FetchResponse<number, types.GetEquipmentResponseDefault>>;
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
    getHosClocks(metadata?: types.GetHosClocksMetadataParam): Promise<FetchResponse<200, types.GetHosClocksResponse200> | FetchResponse<number, types.GetHosClocksResponseDefault>>;
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
    getHosDailyLogs(metadata?: types.GetHosDailyLogsMetadataParam): Promise<FetchResponse<200, types.GetHosDailyLogsResponse200> | FetchResponse<number, types.GetHosDailyLogsResponseDefault>>;
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
    getHosLogs(metadata?: types.GetHosLogsMetadataParam): Promise<FetchResponse<200, types.GetHosLogsResponse200> | FetchResponse<number, types.GetHosLogsResponseDefault>>;
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
    getHosViolations(metadata?: types.GetHosViolationsMetadataParam): Promise<FetchResponse<200, types.GetHosViolationsResponse200> | FetchResponse<number, types.GetHosViolationsResponseDefault>>;
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
    getFuelEnergyDriverReports(metadata: types.GetFuelEnergyDriverReportsMetadataParam): Promise<FetchResponse<200, types.GetFuelEnergyDriverReportsResponse200> | FetchResponse<number, types.GetFuelEnergyDriverReportsResponseDefault>>;
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
    getIftaJurisdictionReports(metadata: types.GetIftaJurisdictionReportsMetadataParam): Promise<FetchResponse<200, types.GetIftaJurisdictionReportsResponse200> | FetchResponse<number, types.GetIftaJurisdictionReportsResponseDefault>>;
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
    getIftaVehicleReports(metadata: types.GetIftaVehicleReportsMetadataParam): Promise<FetchResponse<200, types.GetIftaVehicleReportsResponse200> | FetchResponse<number, types.GetIftaVehicleReportsResponseDefault>>;
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
    getVehicleIdlingReports(metadata: types.GetVehicleIdlingReportsMetadataParam): Promise<FetchResponse<200, types.GetVehicleIdlingReportsResponse200> | FetchResponse<number, types.GetVehicleIdlingReportsResponseDefault>>;
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
    getFuelEnergyVehicleReports(metadata: types.GetFuelEnergyVehicleReportsMetadataParam): Promise<FetchResponse<200, types.GetFuelEnergyVehicleReportsResponse200> | FetchResponse<number, types.GetFuelEnergyVehicleReportsResponseDefault>>;
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
    fetchRoutes(metadata: types.FetchRoutesMetadataParam): Promise<FetchResponse<200, types.FetchRoutesResponse200> | FetchResponse<number, types.FetchRoutesResponseDefault>>;
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
    createRoute(body: types.CreateRouteBodyParam): Promise<FetchResponse<200, types.CreateRouteResponse200> | FetchResponse<number, types.CreateRouteResponseDefault>>;
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
    getRoutesFeed(metadata?: types.GetRoutesFeedMetadataParam): Promise<FetchResponse<200, types.GetRoutesFeedResponse200> | FetchResponse<number, types.GetRoutesFeedResponseDefault>>;
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
    deleteRoute(metadata: types.DeleteRouteMetadataParam): Promise<FetchResponse<number, types.DeleteRouteResponseDefault>>;
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
    fetchRoute(metadata: types.FetchRouteMetadataParam): Promise<FetchResponse<200, types.FetchRouteResponse200> | FetchResponse<number, types.FetchRouteResponseDefault>>;
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
    patchRoute(body: types.PatchRouteBodyParam, metadata: types.PatchRouteMetadataParam): Promise<FetchResponse<200, types.PatchRouteResponse200> | FetchResponse<number, types.PatchRouteResponseDefault>>;
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
    getSafetyEvents(metadata: types.GetSafetyEventsMetadataParam): Promise<FetchResponse<200, types.GetSafetyEventsResponse200> | FetchResponse<number, types.GetSafetyEventsResponseDefault>>;
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
    getSafetyActivityEventFeed(metadata?: types.GetSafetyActivityEventFeedMetadataParam): Promise<FetchResponse<200, types.GetSafetyActivityEventFeedResponse200> | FetchResponse<number, types.GetSafetyActivityEventFeedResponseDefault>>;
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
    getComplianceSettings(): Promise<FetchResponse<200, types.GetComplianceSettingsResponse200> | FetchResponse<number, types.GetComplianceSettingsResponseDefault>>;
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
    patchComplianceSettings(body: types.PatchComplianceSettingsBodyParam): Promise<FetchResponse<200, types.PatchComplianceSettingsResponse200> | FetchResponse<number, types.PatchComplianceSettingsResponseDefault>>;
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
    getDriverAppSettings(): Promise<FetchResponse<200, types.GetDriverAppSettingsResponse200> | FetchResponse<number, types.GetDriverAppSettingsResponseDefault>>;
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
    patchDriverAppSettings(body: types.PatchDriverAppSettingsBodyParam): Promise<FetchResponse<200, types.PatchDriverAppSettingsResponse200> | FetchResponse<number, types.PatchDriverAppSettingsResponseDefault>>;
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
    getSafetySettings(): Promise<FetchResponse<200, types.GetSafetySettingsResponse200> | FetchResponse<number, types.GetSafetySettingsResponseDefault>>;
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
    listTrailers(metadata?: types.ListTrailersMetadataParam): Promise<FetchResponse<200, types.ListTrailersResponse200> | FetchResponse<number, types.ListTrailersResponseDefault>>;
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
    createTrailer(body: types.CreateTrailerBodyParam): Promise<FetchResponse<200, types.CreateTrailerResponse200> | FetchResponse<number, types.CreateTrailerResponseDefault>>;
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
    deleteTrailer(metadata: types.DeleteTrailerMetadataParam): Promise<FetchResponse<number, types.DeleteTrailerResponseDefault>>;
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
    getTrailer(metadata: types.GetTrailerMetadataParam): Promise<FetchResponse<200, types.GetTrailerResponse200> | FetchResponse<number, types.GetTrailerResponseDefault>>;
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
    updateTrailer(body: types.UpdateTrailerBodyParam, metadata: types.UpdateTrailerMetadataParam): Promise<FetchResponse<200, types.UpdateTrailerResponse200> | FetchResponse<number, types.UpdateTrailerResponseDefault>>;
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
    listVehicles(metadata?: types.ListVehiclesMetadataParam): Promise<FetchResponse<200, types.ListVehiclesResponse200> | FetchResponse<number, types.ListVehiclesResponseDefault>>;
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
    getVehiclesDriverAssignments(metadata?: types.GetVehiclesDriverAssignmentsMetadataParam): Promise<FetchResponse<200, types.GetVehiclesDriverAssignmentsResponse200> | FetchResponse<number, types.GetVehiclesDriverAssignmentsResponseDefault>>;
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
    getEngineImmobilizerStates(metadata: types.GetEngineImmobilizerStatesMetadataParam): Promise<FetchResponse<200, types.GetEngineImmobilizerStatesResponse200> | FetchResponse<number, types.GetEngineImmobilizerStatesResponseDefault>>;
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
    getVehicleLocations(metadata?: types.GetVehicleLocationsMetadataParam): Promise<FetchResponse<200, types.GetVehicleLocationsResponse200> | FetchResponse<number, types.GetVehicleLocationsResponseDefault>>;
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
    getVehicleLocationsFeed(metadata?: types.GetVehicleLocationsFeedMetadataParam): Promise<FetchResponse<200, types.GetVehicleLocationsFeedResponse200> | FetchResponse<number, types.GetVehicleLocationsFeedResponseDefault>>;
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
    getVehicleLocationsHistory(metadata: types.GetVehicleLocationsHistoryMetadataParam): Promise<FetchResponse<200, types.GetVehicleLocationsHistoryResponse200> | FetchResponse<number, types.GetVehicleLocationsHistoryResponseDefault>>;
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
    getVehicleStats(metadata: types.GetVehicleStatsMetadataParam): Promise<FetchResponse<200, types.GetVehicleStatsResponse200> | FetchResponse<number, types.GetVehicleStatsResponseDefault>>;
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
    getVehicleStatsFeed(metadata: types.GetVehicleStatsFeedMetadataParam): Promise<FetchResponse<200, types.GetVehicleStatsFeedResponse200> | FetchResponse<number, types.GetVehicleStatsFeedResponseDefault>>;
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
    getVehicleStatsHistory(metadata: types.GetVehicleStatsHistoryMetadataParam): Promise<FetchResponse<200, types.GetVehicleStatsHistoryResponse200> | FetchResponse<number, types.GetVehicleStatsHistoryResponseDefault>>;
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
    getVehicleTachographFiles(metadata: types.GetVehicleTachographFilesMetadataParam): Promise<FetchResponse<200, types.GetVehicleTachographFilesResponse200> | FetchResponse<number, types.GetVehicleTachographFilesResponseDefault>>;
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
    getVehicle(metadata: types.GetVehicleMetadataParam): Promise<FetchResponse<200, types.GetVehicleResponse200> | FetchResponse<number, types.GetVehicleResponseDefault>>;
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
    updateVehicle(body: types.UpdateVehicleBodyParam, metadata: types.UpdateVehicleMetadataParam): Promise<FetchResponse<200, types.UpdateVehicleResponse200> | FetchResponse<number, types.UpdateVehicleResponseDefault>>;
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
    getFormSubmissions(metadata: types.GetFormSubmissionsMetadataParam): Promise<FetchResponse<200, types.GetFormSubmissionsResponse200> | FetchResponse<number, types.GetFormSubmissionsResponseDefault>>;
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
    patchFormSubmission(body: types.PatchFormSubmissionBodyParam): Promise<FetchResponse<200, types.PatchFormSubmissionResponse200> | FetchResponse<number, types.PatchFormSubmissionResponseDefault>>;
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
    postFormSubmission(body: types.PostFormSubmissionBodyParam): Promise<FetchResponse<200, types.PostFormSubmissionResponse200> | FetchResponse<number, types.PostFormSubmissionResponseDefault>>;
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
    getFormSubmissionsStream(metadata: types.GetFormSubmissionsStreamMetadataParam): Promise<FetchResponse<200, types.GetFormSubmissionsStreamResponse200> | FetchResponse<number, types.GetFormSubmissionsStreamResponseDefault>>;
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
    postFuelPurchase(body: types.PostFuelPurchaseBodyParam): Promise<FetchResponse<200, types.PostFuelPurchaseResponse200> | FetchResponse<number, types.PostFuelPurchaseResponseDefault>>;
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
    getGateways(metadata?: types.GetGatewaysMetadataParam): Promise<FetchResponse<200, types.GetGatewaysResponse200> | FetchResponse<number, types.GetGatewaysResponseDefault>>;
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
    postGateway(body: types.PostGatewayBodyParam): Promise<FetchResponse<200, types.PostGatewayResponse200> | FetchResponse<number, types.PostGatewayResponseDefault>>;
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
    deleteGateway(metadata: types.DeleteGatewayMetadataParam): Promise<FetchResponse<number, types.DeleteGatewayResponseDefault>>;
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
    createIftaDetailJob(body: types.CreateIftaDetailJobBodyParam): Promise<FetchResponse<201, types.CreateIftaDetailJobResponse201> | FetchResponse<number, types.CreateIftaDetailJobResponseDefault>>;
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
    getIftaDetailJob(metadata: types.GetIftaDetailJobMetadataParam): Promise<FetchResponse<200, types.GetIftaDetailJobResponse200> | FetchResponse<number, types.GetIftaDetailJobResponseDefault>>;
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
    getIndustrialAssets(metadata?: types.GetIndustrialAssetsMetadataParam): Promise<FetchResponse<200, types.GetIndustrialAssetsResponse200> | FetchResponse<number, types.GetIndustrialAssetsResponseDefault>>;
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
    createIndustrialAsset(body: types.CreateIndustrialAssetBodyParam): Promise<FetchResponse<200, types.CreateIndustrialAssetResponse200> | FetchResponse<number, types.CreateIndustrialAssetResponseDefault>>;
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
    deleteIndustrialAsset(metadata: types.DeleteIndustrialAssetMetadataParam): Promise<FetchResponse<204, types.DeleteIndustrialAssetResponse204> | FetchResponse<number, types.DeleteIndustrialAssetResponseDefault>>;
    /**
     * Update an existing asset. Only the provided fields will be updated.
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
     * @summary Update an asset
     */
    patchIndustrialAsset(body: types.PatchIndustrialAssetBodyParam, metadata: types.PatchIndustrialAssetMetadataParam): Promise<FetchResponse<200, types.PatchIndustrialAssetResponse200> | FetchResponse<number, types.PatchIndustrialAssetResponseDefault>>;
    patchIndustrialAsset(metadata: types.PatchIndustrialAssetMetadataParam): Promise<FetchResponse<200, types.PatchIndustrialAssetResponse200> | FetchResponse<number, types.PatchIndustrialAssetResponseDefault>>;
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
    patchAssetDataOutputs(body: types.PatchAssetDataOutputsBodyParam, metadata: types.PatchAssetDataOutputsMetadataParam): Promise<FetchResponse<200, types.PatchAssetDataOutputsResponse200> | FetchResponse<number, types.PatchAssetDataOutputsResponseDefault>>;
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
    getDataInputs(metadata?: types.GetDataInputsMetadataParam): Promise<FetchResponse<200, types.GetDataInputsResponse200> | FetchResponse<number, types.GetDataInputsResponseDefault>>;
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
    getDataInputDataSnapshot(metadata?: types.GetDataInputDataSnapshotMetadataParam): Promise<FetchResponse<200, types.GetDataInputDataSnapshotResponse200> | FetchResponse<number, types.GetDataInputDataSnapshotResponseDefault>>;
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
    getDataInputDataFeed(metadata?: types.GetDataInputDataFeedMetadataParam): Promise<FetchResponse<200, types.GetDataInputDataFeedResponse200> | FetchResponse<number, types.GetDataInputDataFeedResponseDefault>>;
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
    getDataInputDataHistory(metadata: types.GetDataInputDataHistoryMetadataParam): Promise<FetchResponse<200, types.GetDataInputDataHistoryResponse200> | FetchResponse<number, types.GetDataInputDataHistoryResponseDefault>>;
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
    getIssues(metadata: types.GetIssuesMetadataParam): Promise<FetchResponse<200, types.GetIssuesResponse200> | FetchResponse<number, types.GetIssuesResponseDefault>>;
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
    patchIssue(body: types.PatchIssueBodyParam): Promise<FetchResponse<200, types.PatchIssueResponse200> | FetchResponse<number, types.PatchIssueResponseDefault>>;
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
    getIssuesStream(metadata: types.GetIssuesStreamMetadataParam): Promise<FetchResponse<200, types.GetIssuesStreamResponse200> | FetchResponse<number, types.GetIssuesStreamResponseDefault>>;
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
    deleteLiveSharingLink(metadata: types.DeleteLiveSharingLinkMetadataParam): Promise<FetchResponse<number, types.DeleteLiveSharingLinkResponseDefault>>;
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
    getLiveSharingLinks(metadata?: types.GetLiveSharingLinksMetadataParam): Promise<FetchResponse<200, types.GetLiveSharingLinksResponse200> | FetchResponse<number, types.GetLiveSharingLinksResponseDefault>>;
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
    updateLiveSharingLink(body: types.UpdateLiveSharingLinkBodyParam, metadata: types.UpdateLiveSharingLinkMetadataParam): Promise<FetchResponse<200, types.UpdateLiveSharingLinkResponse200> | FetchResponse<number, types.UpdateLiveSharingLinkResponseDefault>>;
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
    createLiveSharingLink(body: types.CreateLiveSharingLinkBodyParam): Promise<FetchResponse<200, types.CreateLiveSharingLinkResponse200> | FetchResponse<number, types.CreateLiveSharingLinkResponseDefault>>;
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
    getOrganizationInfo(): Promise<FetchResponse<200, types.GetOrganizationInfoResponse200> | FetchResponse<number, types.GetOrganizationInfoResponseDefault>>;
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
    getCustomReportConfigs(metadata?: types.GetCustomReportConfigsMetadataParam): Promise<FetchResponse<200, types.GetCustomReportConfigsResponse200> | FetchResponse<number, types.GetCustomReportConfigsResponseDefault>>;
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
    getCustomReportRuns(metadata?: types.GetCustomReportRunsMetadataParam): Promise<FetchResponse<200, types.GetCustomReportRunsResponse200> | FetchResponse<number, types.GetCustomReportRunsResponseDefault>>;
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
    postCustomReportRun(body: types.PostCustomReportRunBodyParam): Promise<FetchResponse<200, types.PostCustomReportRunResponse200> | FetchResponse<number, types.PostCustomReportRunResponseDefault>>;
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
    getCustomReportRunData(metadata?: types.GetCustomReportRunDataMetadataParam): Promise<FetchResponse<200, types.GetCustomReportRunDataResponse200> | FetchResponse<number, types.GetCustomReportRunDataResponseDefault>>;
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
    getTrips(metadata: types.GetTripsMetadataParam): Promise<FetchResponse<200, types.GetTripsResponse200> | FetchResponse<number, types.GetTripsResponseDefault>>;
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
    listTags(metadata?: types.ListTagsMetadataParam): Promise<FetchResponse<200, types.ListTagsResponse200> | FetchResponse<number, types.ListTagsResponseDefault>>;
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
    createTag(body: types.CreateTagBodyParam): Promise<FetchResponse<200, types.CreateTagResponse200> | FetchResponse<number, types.CreateTagResponseDefault>>;
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
    deleteTag(metadata: types.DeleteTagMetadataParam): Promise<FetchResponse<204, types.DeleteTagResponse204> | FetchResponse<number, types.DeleteTagResponseDefault>>;
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
    getTag(metadata: types.GetTagMetadataParam): Promise<FetchResponse<200, types.GetTagResponse200> | FetchResponse<number, types.GetTagResponseDefault>>;
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
    patchTag(body: types.PatchTagBodyParam, metadata: types.PatchTagMetadataParam): Promise<FetchResponse<200, types.PatchTagResponse200> | FetchResponse<number, types.PatchTagResponseDefault>>;
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
    replaceTag(body: types.ReplaceTagBodyParam, metadata: types.ReplaceTagMetadataParam): Promise<FetchResponse<200, types.ReplaceTagResponse200> | FetchResponse<number, types.ReplaceTagResponseDefault>>;
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
    listUserRoles(metadata?: types.ListUserRolesMetadataParam): Promise<FetchResponse<200, types.ListUserRolesResponse200> | FetchResponse<number, types.ListUserRolesResponseDefault>>;
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
    listUsers(metadata?: types.ListUsersMetadataParam): Promise<FetchResponse<200, types.ListUsersResponse200> | FetchResponse<number, types.ListUsersResponseDefault>>;
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
    createUser(body: types.CreateUserBodyParam): Promise<FetchResponse<200, types.CreateUserResponse200> | FetchResponse<number, types.CreateUserResponseDefault>>;
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
    deleteUser(metadata: types.DeleteUserMetadataParam): Promise<FetchResponse<204, types.DeleteUserResponse204> | FetchResponse<number, types.DeleteUserResponseDefault>>;
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
    getUser(metadata: types.GetUserMetadataParam): Promise<FetchResponse<200, types.GetUserResponse200> | FetchResponse<number, types.GetUserResponseDefault>>;
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
    updateUser(body: types.UpdateUserBodyParam, metadata: types.UpdateUserMetadataParam): Promise<FetchResponse<200, types.UpdateUserResponse200> | FetchResponse<number, types.UpdateUserResponseDefault>>;
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
    v1getAllAssets(): Promise<FetchResponse<200, types.V1GetAllAssetsResponse200> | FetchResponse<number, types.V1GetAllAssetsResponseDefault>>;
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
    v1getAllAssetCurrentLocations(metadata?: types.V1GetAllAssetCurrentLocationsMetadataParam): Promise<FetchResponse<200, types.V1GetAllAssetCurrentLocationsResponse200> | FetchResponse<number, types.V1GetAllAssetCurrentLocationsResponseDefault>>;
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
    v1getAssetsReefers(metadata: types.V1GetAssetsReefersMetadataParam): Promise<FetchResponse<200, types.V1GetAssetsReefersResponse200> | FetchResponse<number, types.V1GetAssetsReefersResponseDefault>>;
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
    v1getAssetLocation(metadata: types.V1GetAssetLocationMetadataParam): Promise<FetchResponse<200, types.V1GetAssetLocationResponse200> | FetchResponse<number, types.V1GetAssetLocationResponseDefault>>;
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
    v1getAssetReefer(metadata: types.V1GetAssetReeferMetadataParam): Promise<FetchResponse<200, types.V1GetAssetReeferResponse200> | FetchResponse<number, types.V1GetAssetReeferResponseDefault>>;
    /**
     * <n class="warning">
     * <nh>
     * <i class="fa fa-exclamation-circle"></i>
     * This endpoint is still on our legacy API.
     * </nh>
     * </n>
     *
     * Delete a dispatch route and its associated jobs.
     *
     *  **Submit Feedback**: Likes, dislikes, and API feature requests should be filed as
     * feedback in our <a href="https://forms.gle/zkD4NCH7HjKb7mm69" target="_blank">API
     * feedback form</a>. If you encountered an issue or noticed inaccuracies in the API
     * documentation, please <a href="https://www.samsara.com/help" target="_blank">submit a
     * case</a> to our support team.
     *
     * To use this endpoint, select **Write Routes** under the Driver Workflow category when
     * creating or editing an API token. <a
     * href="https://developers.samsara.com/docs/authentication#scopes-for-api-tokens"
     * target="_blank">Learn More.</a>
     *
     * @summary Delete a route
     */
    v1deleteDispatchRouteById(body: types.V1DeleteDispatchRouteByIdBodyParam, metadata: types.V1DeleteDispatchRouteByIdMetadataParam): Promise<FetchResponse<number, types.V1DeleteDispatchRouteByIdResponseDefault>>;
    v1deleteDispatchRouteById(metadata: types.V1DeleteDispatchRouteByIdMetadataParam): Promise<FetchResponse<number, types.V1DeleteDispatchRouteByIdResponseDefault>>;
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
    v1getDriverSafetyScore(metadata: types.V1GetDriverSafetyScoreMetadataParam): Promise<FetchResponse<200, types.V1GetDriverSafetyScoreResponse200> | FetchResponse<number, types.V1GetDriverSafetyScoreResponseDefault>>;
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
    setCurrentDutyStatus(body: types.SetCurrentDutyStatusBodyParam, metadata: types.SetCurrentDutyStatusMetadataParam): Promise<FetchResponse<number, types.SetCurrentDutyStatusResponseDefault>>;
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
    v1getFleetHosAuthenticationLogs(metadata: types.V1GetFleetHosAuthenticationLogsMetadataParam): Promise<FetchResponse<200, types.V1GetFleetHosAuthenticationLogsResponse200> | FetchResponse<number, types.V1GetFleetHosAuthenticationLogsResponseDefault>>;
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
    v1getFleetMaintenanceList(): Promise<FetchResponse<200, types.V1GetFleetMaintenanceListResponse200> | FetchResponse<number, types.V1GetFleetMaintenanceListResponseDefault>>;
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
    v1getMessages(metadata?: types.V1GetMessagesMetadataParam): Promise<FetchResponse<200, types.V1GetMessagesResponse200> | FetchResponse<number, types.V1GetMessagesResponseDefault>>;
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
    v1createMessages(body: types.V1CreateMessagesBodyParam): Promise<FetchResponse<200, types.V1CreateMessagesResponse200> | FetchResponse<number, types.V1CreateMessagesResponseDefault>>;
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
    v1getAllTrailerAssignments(metadata?: types.V1GetAllTrailerAssignmentsMetadataParam): Promise<FetchResponse<200, types.V1GetAllTrailerAssignmentsResponse200> | FetchResponse<number, types.V1GetAllTrailerAssignmentsResponseDefault>>;
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
    v1getFleetTrailerAssignments(metadata: types.V1GetFleetTrailerAssignmentsMetadataParam): Promise<FetchResponse<200, types.V1GetFleetTrailerAssignmentsResponse200> | FetchResponse<number, types.V1GetFleetTrailerAssignmentsResponseDefault>>;
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
    v1getFleetTrips(metadata: types.V1GetFleetTripsMetadataParam): Promise<FetchResponse<200, types.V1GetFleetTripsResponse200> | FetchResponse<number, types.V1GetFleetTripsResponseDefault>>;
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
    v1getVehicleHarshEvent(metadata: types.V1GetVehicleHarshEventMetadataParam): Promise<FetchResponse<200, types.V1GetVehicleHarshEventResponse200> | FetchResponse<number, types.V1GetVehicleHarshEventResponseDefault>>;
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
    v1getVehicleSafetyScore(metadata: types.V1GetVehicleSafetyScoreMetadataParam): Promise<FetchResponse<200, types.V1GetVehicleSafetyScoreResponse200> | FetchResponse<number, types.V1GetVehicleSafetyScoreResponseDefault>>;
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
    v1getCameras(): Promise<FetchResponse<200, types.V1GetCamerasResponse200> | FetchResponse<number, types.V1GetCamerasResponseDefault>>;
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
    v1getVisionProgramsByCamera(metadata: types.V1GetVisionProgramsByCameraMetadataParam): Promise<FetchResponse<200, types.V1GetVisionProgramsByCameraResponse200> | FetchResponse<number, types.V1GetVisionProgramsByCameraResponseDefault>>;
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
    v1getVisionLatestRunCamera(metadata: types.V1GetVisionLatestRunCameraMetadataParam): Promise<FetchResponse<200, types.V1GetVisionLatestRunCameraResponse200> | FetchResponse<number, types.V1GetVisionLatestRunCameraResponseDefault>>;
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
    v1getVisionRuns(metadata: types.V1GetVisionRunsMetadataParam): Promise<FetchResponse<200, types.V1GetVisionRunsResponse200> | FetchResponse<number, types.V1GetVisionRunsResponseDefault>>;
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
    getVisionRunsByCamera(metadata: types.GetVisionRunsByCameraMetadataParam): Promise<FetchResponse<200, types.GetVisionRunsByCameraResponse200> | FetchResponse<number, types.GetVisionRunsByCameraResponseDefault>>;
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
    v1getVisionRunsByCameraAndProgram(metadata: types.V1GetVisionRunsByCameraAndProgramMetadataParam): Promise<FetchResponse<200, types.V1GetVisionRunsByCameraAndProgramResponse200> | FetchResponse<number, types.V1GetVisionRunsByCameraAndProgramResponseDefault>>;
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
    v1getMachinesHistory(body: types.V1GetMachinesHistoryBodyParam): Promise<FetchResponse<200, types.V1GetMachinesHistoryResponse200> | FetchResponse<number, types.V1GetMachinesHistoryResponseDefault>>;
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
    v1getMachines(): Promise<FetchResponse<200, types.V1GetMachinesResponse200> | FetchResponse<number, types.V1GetMachinesResponseDefault>>;
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
    v1getSensorsCargo(body: types.V1GetSensorsCargoBodyParam): Promise<FetchResponse<200, types.V1GetSensorsCargoResponse200> | FetchResponse<number, types.V1GetSensorsCargoResponseDefault>>;
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
    v1getSensorsDoor(body: types.V1GetSensorsDoorBodyParam): Promise<FetchResponse<200, types.V1GetSensorsDoorResponse200> | FetchResponse<number, types.V1GetSensorsDoorResponseDefault>>;
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
    v1getSensorsHistory(body: types.V1GetSensorsHistoryBodyParam): Promise<FetchResponse<200, types.V1GetSensorsHistoryResponse200> | FetchResponse<number, types.V1GetSensorsHistoryResponseDefault>>;
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
    v1getSensorsHumidity(body: types.V1GetSensorsHumidityBodyParam): Promise<FetchResponse<200, types.V1GetSensorsHumidityResponse200> | FetchResponse<number, types.V1GetSensorsHumidityResponseDefault>>;
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
    v1getSensors(): Promise<FetchResponse<200, types.V1GetSensorsResponse200> | FetchResponse<number, types.V1GetSensorsResponseDefault>>;
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
    v1getSensorsTemperature(body: types.V1GetSensorsTemperatureBodyParam): Promise<FetchResponse<200, types.V1GetSensorsTemperatureResponse200> | FetchResponse<number, types.V1GetSensorsTemperatureResponseDefault>>;
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
    listWebhooks(metadata?: types.ListWebhooksMetadataParam): Promise<FetchResponse<200, types.ListWebhooksResponse200> | FetchResponse<number, types.ListWebhooksResponseDefault>>;
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
    postWebhooks(body: types.PostWebhooksBodyParam): Promise<FetchResponse<200, types.PostWebhooksResponse200> | FetchResponse<number, types.PostWebhooksResponseDefault>>;
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
    deleteWebhook(metadata: types.DeleteWebhookMetadataParam): Promise<FetchResponse<number, types.DeleteWebhookResponseDefault>>;
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
    getWebhook(metadata: types.GetWebhookMetadataParam): Promise<FetchResponse<200, types.GetWebhookResponse200> | FetchResponse<number, types.GetWebhookResponseDefault>>;
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
    patchWebhook(body: types.PatchWebhookBodyParam, metadata: types.PatchWebhookMetadataParam): Promise<FetchResponse<200, types.PatchWebhookResponse200> | FetchResponse<number, types.PatchWebhookResponseDefault>>;
}
declare const createSDK: SDK;
export = createSDK;
