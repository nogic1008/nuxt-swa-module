import type { Auth } from "./swa-config";

/** Default [pre-configured provider](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization#prerequisites) */
type DefaultIdentityProvider = "aad" | "github" | "twitter";

type DefaultRole = "anonymous" | "authenticated";

/**
 * User information provided by Azure
 * @see https://learn.microsoft.com/azure/static-web-apps/user-information
 */
export interface ClientPrincipal {
  /**
   * The name of the [identity provider](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization).
   */
  identityProvider:
    | DefaultIdentityProvider
    | Exclude<keyof Auth["identityProviders"], "customOpenIdConnectProviders">
    | keyof Auth["identityProviders"]["customOpenIdConnectProviders"];

  /**
   * An Azure Static Web Apps-specific unique identifier for the user.
   * - The value is unique on a per-app basis.
   *   For instance, the same user returns a different `userId` value on a different Static Web Apps resource.
   * - The value persists for the lifetime of a user.
   *   If you delete and add the same user back to the app, a new `userId` is generated.
   */
  userId: string;

  /**
   * Username or email address of the user.
   * Some providers return the [user's email address](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization),
   * while others send the [user handle](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization).
   */
  userDetails: string;

  /** An array of the [user's assigned roles](https://learn.microsoft.com/azure/static-web-apps/authentication-authorization). */
  userRoles: (DefaultRole | string)[];

  /**
   * An array of claims returned by your [custom authentication provider](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-custom).
   * Only accessible in the direct-access endpoint.
   */
  claims?: unknown[];
}
