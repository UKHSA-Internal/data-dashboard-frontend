# Google Tag Manager and Google Analytics Integration Documentation

## Overview

This document outlines the process of integrating Google Tag Manager (GTM) and Google Analytics (GA) within our codebase. Our frontend (FE) code is designed to load the GTM scripts, which in turn handle the GA tracking setup.

### Google Tag Manager Setup

- **GTM Script Loading in FE**: The frontend code is configured to load GTM scripts. These scripts point to our specific GTM instance identified by `GTM-W39KF5j2`.
- **GTM Instance Details**:
  - **Account Name**: UKHSA Data Dashboard
  - **Account ID**: 6212294145
  - **Instance URL**: [GTM Instance](https://tagmanager.google.com/#/container/accounts/6212294145/containers/174773479/workspaces/9)

### Google Analytics Integration

- **GA Tag in GTM**: Our GTM instance includes a GA tag that is set to trigger on all pages. This tag utilizes the `{{GA4 Tracking ID}}` variable for identification.
- **GA4 Tracking ID Variable**:
  - **Location**: Found under the "Variables" tab in GTM.
  - **Function**: It acts as a lookup table mapping each environment to its unique GA property measurement ID.
- **GA Properties**:
  - **Naming Convention**: Each GA property is uniquely named according to its corresponding environment URL.
  - **Production Property URL**: [Production GA Property](https://analytics.google.com/analytics/web/#/p400689467/reports/intelligenthome?params=_u..nav%3Dmaui)

### Best Practices

- **Regularly Update Tracking IDs**: Ensure that the `{{GA4 Tracking ID}}` variable in GTM is up-to-date with the correct environment-specific measurement IDs.
- **Testing**: Thoroughly test the GTM and GA integration in a dev or test environment before deploying to production. Use preview mode in GTM to verify changes.

### Support

For further assistance or queries regarding the integration process, please contact our web analytics team or refer to the official [Google Tag Manager Help Center](https://support.google.com/tagmanager) and [Google Analytics Help Center](https://support.google.com/analytics).

---

This document serves as a guideline for our integration with Google Tag Manager and Google Analytics. Adhering to these steps ensures accurate data tracking and analysis across different environments of our application.
