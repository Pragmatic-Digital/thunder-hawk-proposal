---
title: "Phasing and the initial investment"
kicker: "Phasing"
---

The tables below show how current-site functionality and workshop requirements map to the phases above.

| Priority | Meaning |
| --- | --- |
| **1** | MVP / essential |
| **2** | Phase 2 / should have |
| **3** | Optional enhancement |
| **4** | Excluded from base scope / separately quoted |

For current-site functionality, anything Verona identified in the Current Site Audit is treated as **Priority 1 / retain**, unless a workshop explicitly supersedes it. The audit represents functionality they want to keep.

The required **business outcome and phasing are the same** on both rebuild platforms. The Vendure Core and Shopify Plus columns describe the architectural difference, not a different scope.

Of the **78 workshop requirements**, **50 are Priority 1**, so the first release is necessarily substantial. Priority 2 accounts for 21 requirements, Priority 3 for 4, and Priority 4 for 3.

## Current site functionality to retain

| Requirement area | Current functionality to retain | Priority | Phase | Vendure Core solution | Shopify Plus solution | Orderwise dependency |
| --- | --- | ---: | --- | --- | --- | --- |
| Administration | CMS administration and user-role management | 1 | MVP | Vendure Core administration plus CMS/editor tooling | Shopify Admin, theme editor and custom app configuration | No / Partial for account roles |
| Analytics & reporting | GA, Clarity and existing reporting requirements | 1 | MVP | GA4/GTM/Clarity implementation | GA4/GTM/Clarity implementation | No |
| Product data | Product, specification, stock, pricing and availability sync | 1 | MVP | Direct Orderwise → Vendure Core integration | Custom Orderwise → Shopify app/integration | **Yes** |
| Customer data | Customer sync and automated account creation | 1 | MVP | Customer/organisation entities synchronised from Orderwise | Shopify Companies/Locations synchronised via custom app | **Yes** |
| Content management | Page builder, landing pages, FAQs, clearance and campaign content | 1 | MVP | Self-service CMS/page builder | Shopify sections, metaobjects and metafields | No |
| Stockist locator | Existing Where to Buy / retailer locator | 1 | MVP | Custom locator | Custom Shopify locator | Partial if retailer/account data originates in Orderwise |
| Product calculator | Existing tile-calculation functionality | 1 | MVP | Retained/custom component | Retained/custom theme/app component | Partial, product quantities |
| Customer accounts | Registration, login/profile, saved addresses, credit visibility and account history | 1 | MVP | Custom Vendure Core account portal | Shopify B2B customer accounts plus custom account functionality | **Yes** for account/credit/order data |
| Customer restrictions | Product/pricing/stock visibility and add-to-cart permissions by group | 1 | MVP | Native/custom Vendure Core channels and permission model | Shopify B2B Catalogues plus custom app logic | **Yes** for commercial assignments |
| Live chat | Logged-in customer chat | 1 | MVP | Existing service integrated with authenticated customer context | Existing service integrated with Shopify customer context | Partial |
| Forms | Newsletter, account requests, password reset, invoice enquiries and consent | 1 | MVP | CMS/forms/auth implementation | Shopify/customer account/forms implementation | Partial for invoices/account requests |
| Orderwise ERP | Products, customers, pricing and stock integration | 1 | MVP | Custom Vendure Core API integration | Custom Shopify application/integration | **Yes, core dependency** |
| Existing integrations | InSitu/Roomvo, address lookup, payment gateway and email marketing | 1 | MVP | Retained/reimplemented as required | Retained/reimplemented as Shopify integrations/apps | Partial |
| Inventory | Real-time stock, stock status, back-in-stock messaging and restock dates | 1 | MVP | Orderwise-powered availability | Orderwise-powered Shopify stock/custom data | **Yes** |
| Marketing | New arrivals, banners, page-built content and Real Homes | 1 | MVP | CMS-managed | Shopify CMS/theme-managed | No / Partial for product selection |
| Marketing resources | Logged-in product/marketing assets and approval-controlled downloads | 1 | MVP | Resource centre with permission controls | Protected Shopify/customer resource area | Partial |
| Product media | Images, video, brochures/catalogues | 1 | MVP | Product/CMS model | Shopify media/metaobjects | Partial for product data |
| Basket & ordering | Basket, checkout, order placement, references and special instructions | 1 | MVP | Custom Vendure Core checkout/order workflows | Shopify B2B checkout with custom extensions where necessary | **Yes** when submitted to Orderwise |
| Delivery | Surcharges, customer delivery options, lead times and NDD | 1 | MVP | Custom rules based on Verona/Orderwise data | Shopify Functions/custom app logic | **Yes / Partial** |
| Payments | Credit account, card and tax handling | 1 | MVP | Vendure Core + Stripe/account logic | Shopify Payments/payment terms/B2B configuration | **Yes / Partial** for account status/terms |
| Pricing | Customer prices, price breaks, multiple price lists and discounts | 1 | MVP | Custom Vendure Core pricing/channel logic | Shopify B2B Catalogues/pricing plus integration | **Yes** |
| Product catalogue | Products, variants, specifications, attributes, quantities and downloads | 1 | MVP | Vendure Core catalogue extended for Verona | Shopify catalogue/metafields/metaobjects | **Yes** for product master data |
| Recommendations | Related/cross-sell/checkout upsell | 1 | MVP | Vendure Core recommendation relationships | Shopify product recommendations/custom rules | Partial |
| Search & navigation | Search, advanced filtering, sorting, mega menu and breadcrumbs | 1 | MVP | Algolia/search index over permitted catalogue | Shopify/search service over permitted catalogue | Partial, indexed Orderwise product attributes |
| Security | GDPR, RBAC and customer-group permission enforcement | 1 | MVP | Bespoke permission model | Shopify B2B permissions plus custom controls | Partial |
| SEO | Search Console and technical SEO requirements | 1 | MVP | Next.js implementation | Shopify theme implementation | No |
| Hosting | Existing AWS infrastructure requirement | 1 | MVP | AWS/Cloudflare application infrastructure | Shopify-hosted storefront plus hosting for custom integration/app services | No |
| Responsive UX | Mobile-responsive site | 1 | MVP | Responsive Next.js application | Responsive Shopify theme | No |

## Workshop requirements

| Audience | Workshop requirements | Priority | Phase | Vendure Core solution | Shopify Plus solution | Orderwise API dependency |
| --- | --- | ---: | --- | --- | --- | --- |
| Housebuilders | Configurable delivery/commercial rules; resources; saved project addresses; account-manager information; live chat; real-time stock; product banding; online ordering; credit/proforma/card payments; customer-specific catalogue/pricing; detailed product data; powerful filtering/Product Finder; account permissions; scheduled/held deliveries; tracking/POD/order history | **1** | **MVP** | Bespoke housebuilder, contractor and development model within Vendure Core | Shopify B2B plus bespoke app layer for development/contractor context | **High**, stock, pricing, customer/project data, account status, orders and tracking |
| Independents | Multi-user accounts; account-manager details; improved marketing requests; accurate ETAs; back orders/future availability/alternatives; new/clearance/popular content; m²/tile/box pricing; descriptions; intelligent search; WIZMO tracking across all orders | **1** | **MVP** | Vendure Core trade portal | Shopify B2B/customer portal with custom Orderwise integration | **High** |
| Selco | Information centre; account-manager details; live stock; full order visibility/tracking | **1** | **MVP** | Customer-specific informational portal | Shopify company/location portal with custom account views | **High** for stock/orders |
| Wickes | Resource hub; account-manager details; live stock; order tracking; dedicated catalogue/customer product descriptions | **1** | **MVP** | Customer-specific catalogue and portal | Shopify B2B catalogue plus custom account/product data | **High** |
| Merchants | Self-service documents; live stock/lead times/alternatives; order tracking/history/acknowledgements; customer pricing/product visibility; fast technical search; branch accounts/permissions; accurate self-service information | **1** | **MVP** | Merchant portal within common Vendure Core account model | Shopify Companies/Locations with custom portal functionality | **High** |
| Sales Support | Better marketing materials; one-off/saved addresses; authenticated Live Chat context; accurate OOS restock dates; improved search; hidden pricing; seniority-based access levels; delivery SMS/mobile prompts | **1** | **MVP** | Custom account and permission functionality | Shopify customer/company data plus bespoke extensions/app functionality | **Medium–High** |
| Housebuilders | Alternative products; timed order amendments; invoices; auto-generated PDFs; partial deliveries/back orders/future availability | **2** | **Phase 2** | Additional custom order/account workflows | Bespoke Shopify app/workflow extensions | **High**, particularly order amendment and fulfilment |
| Independents | Post-order amendments; reorder/saved baskets/favourites/quick SKU ordering; invoices; image-based product matching; accessory calculator | **2** | **Phase 2** | Custom Vendure Core extensions | Shopify app/theme extensions and external image/search capability | **Mixed**, high for orders/invoices, low for image matching |
| Selco | Privacy mode / hide customer pricing | **2** | **Phase 2** | Frontend permission/display mode | Custom Shopify theme/account state | No |
| Wickes | Customer-specific banner and privacy mode | **2** | **Phase 2** | CMS/customer-context functionality | Shopify customer-specific content/custom theme logic | No / Partial |
| Merchants | Auto-generated PDFs; invoices/account information; post-order amendments | **2** | **Phase 2** | Custom portal/order functionality | Custom Shopify app/account functionality | **High** |
| Sales Support | Auto-generated technical sheets; damage requests; live stockist data; add to submitted order; historical discontinued products | **2** | **Phase 2** | Custom workflows and product/account tooling | Custom Shopify app/portal workflows | **Mixed / High** |
| Independents | Extended delivery reservation window | **3** | **Optional** | Extend delivery scheduler | Custom Shopify delivery scheduling | **Potentially**, depending on Orderwise capacity/calendar data |
| Selco | Account-specific display-stand rollout pop-ups | **3** | **Optional** | Customer-targeted CMS messaging | Shopify customer/company-targeted content | No |
| Wickes | Extend InSitu visualiser to Wickes products | **3** | **Optional** | Existing integration expanded to Wickes catalogue | Existing integration expanded to Shopify catalogue | Partial |
| Wickes | Login pop-ups | **3** | **Optional** | Customer-targeted CMS messaging | Shopify customer/company-targeted theme/app content | No |
| Housebuilders | Product batch information | **4** | **Excluded / separately quoted** | Feasible subject to data availability | Custom Shopify display/data integration | **Yes, requires batch data from Orderwise** |
| Independents | Sample ordering | **4** | **Excluded / separately quoted** | Separate sample-order workflow | Custom Shopify product/order workflow | Partial / likely |
| Independents | Subscription ordering | **4** | **Excluded / separately quoted** | Recurring-order functionality requiring further design | Shopify subscription/custom B2B workflow requiring feasibility review | **High** if repeat orders must originate/process in Orderwise |

