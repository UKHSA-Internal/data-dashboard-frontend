CDD-2056 - Access our data

1. Custom Page Type
   Add new specific page type e.g. access_our_data.AccessOurDataPage

2. Custom Page Type
   Add new reusable page type e.g. tutorial_steps.TutorialStepsPage

3. Composite Page Type with new CMS components/blocks
   Build upon existing cms page option of "enable pagination" where we have a new field "pagination type" of "list" (list => 1, 2, 3) or "block" (block -> Next page: Begin)

CDD-2057 - Weather health alerts

1. Custom Page Type

Add new specific page type e.g.

- weather_health_alerts_category_list.WeatherHealthAlertsCategoryListPage
  - Content editors can only add references to child pages of this category in the body (i.e. heat and cold)
- weather_health_alerts_category.WeatherHealthAlertsCategoryPage

  - Content editors can add in the body:
    [
    WeatherHealthAlertInternalButton (hot|cold) - For the map link
    WeatherHealthAlertGeographyList (hot|cold) - For the list of geographies. This can return endpoint information for the FE e.g.
    list: /api/alert/:type
    detail: /api/alert/:type/:geography_code.
    We can then use this information to map this component to the current WHA list and links to the level 3 sub pages.
    ]

  WeatherHealthAlertGeographyList
  The

2. Composite Page Type with new CMS components/blocks

- Similar approach to above but instead of custom page types we create custom blocks/components to embed within the body of Composite Pages
  L1 parent page we could embed a "List" with "List Item" type components that accepts a name and description and an optional link field that allows references to any CMS page. The content editor would add 2 list item fields for hot and cold and a link reference to the respective child page
  L2/L3 category/detail pages could use a similar pattern to the `WeatherHealthAlertGeographyList` mentioned in the custom page type option

3. Generic Custom Page Type with all pages created in the CMS e.g. weather_health_alerts.WeatherHealthAlertsPage

- L1: same as #2
- L2: heat/cold pages created as children
- L3 all regions created as grandchildren
  FE can use the hierarchy to determine the level/depth and conditionally request and render the relevant content.
