/**
 * Documentation: https://aka.ms/swa/config-schema
 */
export interface AzureStaticWebAppsConfigurationFile {
  /**
   * Route definitions to modify routing behavior
   */
  routes?: Route[];
  /**
   * A default file to return if the request does not match a resource
   */
  navigationFallback?: {
    /**
     * The default file to return if the request does not match a resource
     */
    rewrite: string;
    /**
     * Paths to exclude from the fallback route. May use valid wildcards. https://aka.ms/swa/config-schema
     */
    exclude?: unknown[];
  };
  /**
   * Custom error pages or redirects
   */
  responseOverrides?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` ".*".
     */
    [k: string]: {
      /**
       * Redirect to a relative or absolute path, or an external URI. Default status code is 302, override with 301.
       */
      redirect?: string;
      /**
       * Status code
       */
      statusCode?: number;
      /**
       * A path to rewrite the request route to
       */
      rewrite?: string;
      [k: string]: unknown;
    };
  };
  /**
   * Custom mime types configuration
   */
  mimeTypes?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^\..+$".
     */
    [k: string]: string;
  };
  /**
   * Default headers to set on all responses
   */
  globalHeaders?: {
    [k: string]: unknown;
  };
  auth?: Auth;
  /**
   * Networking configuration
   */
  networking?: {
    /**
     * Restrict access to one or more IPv4 ranges. Supports CIDR notation (e.g., "192.168.100.14/24")
     */
    allowedIpRanges?: string[];
  };
  /**
   * Forwarding gateway configuration
   */
  forwardingGateway?: {
    /**
     * The value of `X-Forwarded-Host` to allow to be used when generating redirect URLs
     */
    allowedForwardedHosts?: string[];
    /**
     * HTTP header name/value pairs that are required for access
     */
    requiredHeaders?: {
      [k: string]: unknown;
    };
  };
  /**
   * Platform configuration
   */
  platform?: {
    /**
     * Language runtime for the managed functions API
     */
    apiRuntime?:
      | "dotnet:3.1"
      | "dotnet:6.0"
      | "dotnet-isolated:6.0"
      | "dotnet-isolated:7.0"
      | "node:12"
      | "node:14"
      | "node:16"
      | "node:18"
      | "python:3.8"
      | "python:3.9"
      | "python:3.10";
  };
  /**
   * Trailing slash configuration
   */
  trailingSlash?: "always" | "never" | "auto";
  /**
   * JSON schema
   */
  $schema?: string;
}
export interface Route {
  /**
   * Request route pattern to match. May contain valid wildcards. See documentation: https://aka.ms/swa/config-schema
   */
  route: string;
  /**
   * Request method(s) to match
   */
  methods?: (
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
  )[];
  /**
   * Roles that are allowed to access this route. If not empty, only role(s) listed are authorized to access the route. Roles are only used for authorization; they are not used to evaluate whether the route matches the request.
   */
  allowedRoles?: string[];
  /**
   * Override any matching global headers
   */
  headers?: {
    [k: string]: unknown;
  };
  /**
   * Redirect to a relative or absolute path, or an external URI. Default status code is 302, override with 301.
   */
  redirect?: string;
  /**
   * Status code override
   */
  statusCode?: number;
  /**
   * A path to rewrite the request route to
   */
  rewrite?: string;
}
export interface Auth {
  /**
   * Route to API function for assigning roles. For example, "/api/GetRoles". See https://aka.ms/swa-roles-function
   */
  rolesSource?: string;
  identityProviders: {
    azureActiveDirectory?: {
      /**
       * <false> if the azureActiveDirectory provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The endpoint for the OpenID configuration of the AAD tenant
         */
        openIdIssuer: string;
        /**
         * The name of the application setting containing the Application (client) ID for the Azure AD app registration
         */
        clientIdSettingName?: string;
        /**
         * The name of the application setting containing the client secret for the Azure AD app registration
         */
        clientSecretSettingName: string;
      };
      login?: {
        loginParameters?: string[];
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    apple?: {
      /**
       * <false> if the apple provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The name of the application setting containing the Client ID
         */
        clientIdSettingName?: string;
        /**
         * The name of the application setting containing the Client Secret
         */
        clientSecretSettingName: string;
      };
      login?: {
        scopes?: string[];
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    facebook?: {
      /**
       * <false> if the facebook provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The name of the application setting containing the App ID
         */
        appIdSettingName?: string;
        /**
         * The name of the application setting containing the App Secret
         */
        appSecretSettingName: string;
      };
      login?: {
        scopes?: string[];
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    github?: {
      /**
       * <false> if the gitHub provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The name of the application setting containing the Client ID
         */
        clientIdSettingName?: string;
        /**
         * The name of the application setting containing the Client Secret
         */
        clientSecretSettingName: string;
      };
      login?: {
        scopes?: string[];
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    google?: {
      /**
       * <false> if the google provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The name of the application setting containing the Client ID
         */
        clientIdSettingName?: string;
        /**
         * The name of the application setting containing the Client Secret
         */
        clientSecretSettingName: string;
      };
      login?: {
        scopes?: string[];
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    twitter?: {
      /**
       * <false> if the twitter provider is not enabled, <true> otherwise
       */
      enabled?: boolean;
      registration: {
        /**
         * The name of the application setting containing the Consumer Key
         */
        consumerKeySettingName?: string;
        /**
         * The name of the application setting containing the Consumer Secret
         */
        consumerSecretSettingName: string;
      };
      /**
       * The name of the claim from which we should read user details
       */
      userDetailsClaim?: string;
    };
    customOpenIdConnectProviders?: {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` ".*".
       */
      [k: string]: {
        /**
         * <false> if the custom OpenID Connect provider is not enabled, <true> otherwise
         */
        enabled?: boolean;
        registration: {
          /**
           * The name of the application setting containing the Client ID
           */
          clientIdSettingName?: string;
          clientCredential: {
            /**
             * The name of the application setting containing the Client Secret
             */
            clientSecretSettingName: string;
            [k: string]: unknown;
          };
          openIdConnectConfiguration: {
            /**
             * The path to the authorization endpoint
             */
            authorizationEndpoint?: string;
            /**
             * The path to the token endpoint
             */
            tokenEndpoint?: string;
            /**
             * The path to the issuer endpoint
             */
            issuer?: string;
            /**
             * The path to the jwks uri
             */
            certificationUri?: string;
            /**
             * The path to the well known configuration endpoint
             */
            wellKnownOpenIdConfiguration?: string;
            [k: string]: unknown;
          };
        };
        login: {
          nameClaimType?: string;
          scopes?: string[];
          loginParameterNames?: string[];
        };
      };
    };
  };
}
