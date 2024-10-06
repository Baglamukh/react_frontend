/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/_sitemap` | `/aarti` | `/about` | `/ankdasa` | `/astroData` | `/astroTables` | `/bhajan` | `/birthDetail` | `/cart` | `/chalisa` | `/chat` | `/color` | `/custom` | `/fact` | `/gun` | `/home` | `/joke` | `/jyotish` | `/kaudi` | `/mantra` | `/meme` | `/message` | `/mytext` | `/nadiData` | `/numberdetails` | `/numbirth` | `/numerology` | `/numpy` | `/panchang` | `/path` | `/payn` | `/person` | `/prediction` | `/product` | `/puratan` | `/quotes` | `/rudraksha` | `/sadhna` | `/sankalp` | `/sapna` | `/services` | `/shiksha` | `/shopping` | `/story` | `/tarot` | `/today` | `/todayprediction` | `/todaytaro` | `/vastu` | `/vastuprediction` | `/vastuservices` | `/viewfloor` | `/viewproduct` | `/voicechat` | `/yantra`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
