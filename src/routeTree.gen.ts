/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserImport } from './routes/_user'
import { Route as SalesImport } from './routes/_sales'
import { Route as RestaurateurImport } from './routes/_restaurateur'
import { Route as LoginImport } from './routes/_login'
import { Route as DeliveryImport } from './routes/_delivery'
import { Route as IndexImport } from './routes/index'
import { Route as ComponentsIndexImport } from './routes/components/index'
import { Route as UserUserImport } from './routes/_user/user'
import { Route as SalesSalesImport } from './routes/_sales/sales'
import { Route as SalesPassationsCommandesImport } from './routes/_sales/passationsCommandes'
import { Route as SalesClientDetailsImport } from './routes/_sales/clientDetails'
import { Route as SalesAllClientsImport } from './routes/_sales/allClients'
import { Route as SalesAcquittementsLivraisonsImport } from './routes/_sales/acquittementsLivraisons'
import { Route as SalesAcceptationsLivraisonsImport } from './routes/_sales/acceptationsLivraisons'
import { Route as SalesAcceptationsCommandesImport } from './routes/_sales/acceptationsCommandes'
import { Route as RestaurateurRestaurateurImport } from './routes/_restaurateur/restaurateur'
import { Route as RestaurateurRestaurantOfferingsImport } from './routes/_restaurateur/restaurantOfferings'
import { Route as RestaurateurRestaurantManagerImport } from './routes/_restaurateur/restaurant-manager'
import { Route as RestaurateurProductManagerImport } from './routes/_restaurateur/product-manager'
import { Route as RestaurateurMenuManagerImport } from './routes/_restaurateur/menu-manager'
import { Route as RestaurateurCreateEditProductImport } from './routes/_restaurateur/create-edit-product'
import { Route as RestaurateurCommandMonitoringImport } from './routes/_restaurateur/commandMonitoring'
import { Route as LoginSignupImport } from './routes/_login/signup'
import { Route as LoginLoginImport } from './routes/_login/login'
import { Route as DeliveryDeliveryImport } from './routes/_delivery/delivery'
import { Route as DeliveryDeliveriesHistoryImport } from './routes/_delivery/deliveries-history'
import { Route as DeliveryDeliveriesImport } from './routes/_delivery/deliveries'
import { Route as UserRestaurantIdImport } from './routes/_user/restaurant.$id'

// Create/Update Routes

const UserRoute = UserImport.update({
  id: '/_user',
  getParentRoute: () => rootRoute,
} as any)

const SalesRoute = SalesImport.update({
  id: '/_sales',
  getParentRoute: () => rootRoute,
} as any)

const RestaurateurRoute = RestaurateurImport.update({
  id: '/_restaurateur',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/_login',
  getParentRoute: () => rootRoute,
} as any)

const DeliveryRoute = DeliveryImport.update({
  id: '/_delivery',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ComponentsIndexRoute = ComponentsIndexImport.update({
  path: '/components/',
  getParentRoute: () => rootRoute,
} as any)

const UserUserRoute = UserUserImport.update({
  path: '/user',
  getParentRoute: () => UserRoute,
} as any)

const SalesSalesRoute = SalesSalesImport.update({
  path: '/sales',
  getParentRoute: () => SalesRoute,
} as any)

const SalesPassationsCommandesRoute = SalesPassationsCommandesImport.update({
  path: '/passationsCommandes',
  getParentRoute: () => SalesRoute,
} as any)

const SalesClientDetailsRoute = SalesClientDetailsImport.update({
  path: '/clientDetails',
  getParentRoute: () => SalesRoute,
} as any)

const SalesAllClientsRoute = SalesAllClientsImport.update({
  path: '/allClients',
  getParentRoute: () => SalesRoute,
} as any)

const SalesAcquittementsLivraisonsRoute =
  SalesAcquittementsLivraisonsImport.update({
    path: '/acquittementsLivraisons',
    getParentRoute: () => SalesRoute,
  } as any)

const SalesAcceptationsLivraisonsRoute =
  SalesAcceptationsLivraisonsImport.update({
    path: '/acceptationsLivraisons',
    getParentRoute: () => SalesRoute,
  } as any)

const SalesAcceptationsCommandesRoute = SalesAcceptationsCommandesImport.update(
  {
    path: '/acceptationsCommandes',
    getParentRoute: () => SalesRoute,
  } as any,
)

const RestaurateurRestaurateurRoute = RestaurateurRestaurateurImport.update({
  path: '/restaurateur',
  getParentRoute: () => RestaurateurRoute,
} as any)

const RestaurateurRestaurantOfferingsRoute =
  RestaurateurRestaurantOfferingsImport.update({
    path: '/restaurantOfferings',
    getParentRoute: () => RestaurateurRoute,
  } as any)

const RestaurateurRestaurantManagerRoute =
  RestaurateurRestaurantManagerImport.update({
    path: '/restaurant-manager',
    getParentRoute: () => RestaurateurRoute,
  } as any)

const RestaurateurProductManagerRoute = RestaurateurProductManagerImport.update(
  {
    path: '/product-manager',
    getParentRoute: () => RestaurateurRoute,
  } as any,
)

const RestaurateurMenuManagerRoute = RestaurateurMenuManagerImport.update({
  path: '/menu-manager',
  getParentRoute: () => RestaurateurRoute,
} as any)

const RestaurateurCreateEditProductRoute =
  RestaurateurCreateEditProductImport.update({
    path: '/create-edit-product',
    getParentRoute: () => RestaurateurRoute,
  } as any)

const RestaurateurCommandMonitoringRoute =
  RestaurateurCommandMonitoringImport.update({
    path: '/commandMonitoring',
    getParentRoute: () => RestaurateurRoute,
  } as any)

const LoginSignupRoute = LoginSignupImport.update({
  path: '/signup',
  getParentRoute: () => LoginRoute,
} as any)

const LoginLoginRoute = LoginLoginImport.update({
  path: '/login',
  getParentRoute: () => LoginRoute,
} as any)

const DeliveryDeliveryRoute = DeliveryDeliveryImport.update({
  path: '/delivery',
  getParentRoute: () => DeliveryRoute,
} as any)

const DeliveryDeliveriesHistoryRoute = DeliveryDeliveriesHistoryImport.update({
  path: '/deliveries-history',
  getParentRoute: () => DeliveryRoute,
} as any)

const DeliveryDeliveriesRoute = DeliveryDeliveriesImport.update({
  path: '/deliveries',
  getParentRoute: () => DeliveryRoute,
} as any)

const UserRestaurantIdRoute = UserRestaurantIdImport.update({
  path: '/restaurant/$id',
  getParentRoute: () => UserRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_delivery': {
      id: '/_delivery'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DeliveryImport
      parentRoute: typeof rootRoute
    }
    '/_login': {
      id: '/_login'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_restaurateur': {
      id: '/_restaurateur'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof RestaurateurImport
      parentRoute: typeof rootRoute
    }
    '/_sales': {
      id: '/_sales'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof SalesImport
      parentRoute: typeof rootRoute
    }
    '/_user': {
      id: '/_user'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/_delivery/deliveries': {
      id: '/_delivery/deliveries'
      path: '/deliveries'
      fullPath: '/deliveries'
      preLoaderRoute: typeof DeliveryDeliveriesImport
      parentRoute: typeof DeliveryImport
    }
    '/_delivery/deliveries-history': {
      id: '/_delivery/deliveries-history'
      path: '/deliveries-history'
      fullPath: '/deliveries-history'
      preLoaderRoute: typeof DeliveryDeliveriesHistoryImport
      parentRoute: typeof DeliveryImport
    }
    '/_delivery/delivery': {
      id: '/_delivery/delivery'
      path: '/delivery'
      fullPath: '/delivery'
      preLoaderRoute: typeof DeliveryDeliveryImport
      parentRoute: typeof DeliveryImport
    }
    '/_login/login': {
      id: '/_login/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLoginImport
      parentRoute: typeof LoginImport
    }
    '/_login/signup': {
      id: '/_login/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof LoginSignupImport
      parentRoute: typeof LoginImport
    }
    '/_restaurateur/commandMonitoring': {
      id: '/_restaurateur/commandMonitoring'
      path: '/commandMonitoring'
      fullPath: '/commandMonitoring'
      preLoaderRoute: typeof RestaurateurCommandMonitoringImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/create-edit-product': {
      id: '/_restaurateur/create-edit-product'
      path: '/create-edit-product'
      fullPath: '/create-edit-product'
      preLoaderRoute: typeof RestaurateurCreateEditProductImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/menu-manager': {
      id: '/_restaurateur/menu-manager'
      path: '/menu-manager'
      fullPath: '/menu-manager'
      preLoaderRoute: typeof RestaurateurMenuManagerImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/product-manager': {
      id: '/_restaurateur/product-manager'
      path: '/product-manager'
      fullPath: '/product-manager'
      preLoaderRoute: typeof RestaurateurProductManagerImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/restaurant-manager': {
      id: '/_restaurateur/restaurant-manager'
      path: '/restaurant-manager'
      fullPath: '/restaurant-manager'
      preLoaderRoute: typeof RestaurateurRestaurantManagerImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/restaurantOfferings': {
      id: '/_restaurateur/restaurantOfferings'
      path: '/restaurantOfferings'
      fullPath: '/restaurantOfferings'
      preLoaderRoute: typeof RestaurateurRestaurantOfferingsImport
      parentRoute: typeof RestaurateurImport
    }
    '/_restaurateur/restaurateur': {
      id: '/_restaurateur/restaurateur'
      path: '/restaurateur'
      fullPath: '/restaurateur'
      preLoaderRoute: typeof RestaurateurRestaurateurImport
      parentRoute: typeof RestaurateurImport
    }
    '/_sales/acceptationsCommandes': {
      id: '/_sales/acceptationsCommandes'
      path: '/acceptationsCommandes'
      fullPath: '/acceptationsCommandes'
      preLoaderRoute: typeof SalesAcceptationsCommandesImport
      parentRoute: typeof SalesImport
    }
    '/_sales/acceptationsLivraisons': {
      id: '/_sales/acceptationsLivraisons'
      path: '/acceptationsLivraisons'
      fullPath: '/acceptationsLivraisons'
      preLoaderRoute: typeof SalesAcceptationsLivraisonsImport
      parentRoute: typeof SalesImport
    }
    '/_sales/acquittementsLivraisons': {
      id: '/_sales/acquittementsLivraisons'
      path: '/acquittementsLivraisons'
      fullPath: '/acquittementsLivraisons'
      preLoaderRoute: typeof SalesAcquittementsLivraisonsImport
      parentRoute: typeof SalesImport
    }
    '/_sales/allClients': {
      id: '/_sales/allClients'
      path: '/allClients'
      fullPath: '/allClients'
      preLoaderRoute: typeof SalesAllClientsImport
      parentRoute: typeof SalesImport
    }
    '/_sales/clientDetails': {
      id: '/_sales/clientDetails'
      path: '/clientDetails'
      fullPath: '/clientDetails'
      preLoaderRoute: typeof SalesClientDetailsImport
      parentRoute: typeof SalesImport
    }
    '/_sales/passationsCommandes': {
      id: '/_sales/passationsCommandes'
      path: '/passationsCommandes'
      fullPath: '/passationsCommandes'
      preLoaderRoute: typeof SalesPassationsCommandesImport
      parentRoute: typeof SalesImport
    }
    '/_sales/sales': {
      id: '/_sales/sales'
      path: '/sales'
      fullPath: '/sales'
      preLoaderRoute: typeof SalesSalesImport
      parentRoute: typeof SalesImport
    }
    '/_user/user': {
      id: '/_user/user'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserUserImport
      parentRoute: typeof UserImport
    }
    '/components/': {
      id: '/components/'
      path: '/components'
      fullPath: '/components'
      preLoaderRoute: typeof ComponentsIndexImport
      parentRoute: typeof rootRoute
    }
    '/_user/restaurant/$id': {
      id: '/_user/restaurant/$id'
      path: '/restaurant/$id'
      fullPath: '/restaurant/$id'
      preLoaderRoute: typeof UserRestaurantIdImport
      parentRoute: typeof UserImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  DeliveryRoute: DeliveryRoute.addChildren({
    DeliveryDeliveriesRoute,
    DeliveryDeliveriesHistoryRoute,
    DeliveryDeliveryRoute,
  }),
  LoginRoute: LoginRoute.addChildren({ LoginLoginRoute, LoginSignupRoute }),
  RestaurateurRoute: RestaurateurRoute.addChildren({
    RestaurateurCommandMonitoringRoute,
    RestaurateurCreateEditProductRoute,
    RestaurateurMenuManagerRoute,
    RestaurateurProductManagerRoute,
    RestaurateurRestaurantManagerRoute,
    RestaurateurRestaurantOfferingsRoute,
    RestaurateurRestaurateurRoute,
  }),
  SalesRoute: SalesRoute.addChildren({
    SalesAcceptationsCommandesRoute,
    SalesAcceptationsLivraisonsRoute,
    SalesAcquittementsLivraisonsRoute,
    SalesAllClientsRoute,
    SalesClientDetailsRoute,
    SalesPassationsCommandesRoute,
    SalesSalesRoute,
  }),
  UserRoute: UserRoute.addChildren({ UserUserRoute, UserRestaurantIdRoute }),
  ComponentsIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_delivery",
        "/_login",
        "/_restaurateur",
        "/_sales",
        "/_user",
        "/components/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_delivery": {
      "filePath": "_delivery.tsx",
      "children": [
        "/_delivery/deliveries",
        "/_delivery/deliveries-history",
        "/_delivery/delivery"
      ]
    },
    "/_login": {
      "filePath": "_login.tsx",
      "children": [
        "/_login/login",
        "/_login/signup"
      ]
    },
    "/_restaurateur": {
      "filePath": "_restaurateur.tsx",
      "children": [
        "/_restaurateur/commandMonitoring",
        "/_restaurateur/create-edit-product",
        "/_restaurateur/menu-manager",
        "/_restaurateur/product-manager",
        "/_restaurateur/restaurant-manager",
        "/_restaurateur/restaurantOfferings",
        "/_restaurateur/restaurateur"
      ]
    },
    "/_sales": {
      "filePath": "_sales.tsx",
      "children": [
        "/_sales/acceptationsCommandes",
        "/_sales/acceptationsLivraisons",
        "/_sales/acquittementsLivraisons",
        "/_sales/allClients",
        "/_sales/clientDetails",
        "/_sales/passationsCommandes",
        "/_sales/sales"
      ]
    },
    "/_user": {
      "filePath": "_user.tsx",
      "children": [
        "/_user/user",
        "/_user/restaurant/$id"
      ]
    },
    "/_delivery/deliveries": {
      "filePath": "_delivery/deliveries.tsx",
      "parent": "/_delivery"
    },
    "/_delivery/deliveries-history": {
      "filePath": "_delivery/deliveries-history.tsx",
      "parent": "/_delivery"
    },
    "/_delivery/delivery": {
      "filePath": "_delivery/delivery.tsx",
      "parent": "/_delivery"
    },
    "/_login/login": {
      "filePath": "_login/login.tsx",
      "parent": "/_login"
    },
    "/_login/signup": {
      "filePath": "_login/signup.tsx",
      "parent": "/_login"
    },
    "/_restaurateur/commandMonitoring": {
      "filePath": "_restaurateur/commandMonitoring.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/create-edit-product": {
      "filePath": "_restaurateur/create-edit-product.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/menu-manager": {
      "filePath": "_restaurateur/menu-manager.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/product-manager": {
      "filePath": "_restaurateur/product-manager.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/restaurant-manager": {
      "filePath": "_restaurateur/restaurant-manager.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/restaurantOfferings": {
      "filePath": "_restaurateur/restaurantOfferings.tsx",
      "parent": "/_restaurateur"
    },
    "/_restaurateur/restaurateur": {
      "filePath": "_restaurateur/restaurateur.tsx",
      "parent": "/_restaurateur"
    },
    "/_sales/acceptationsCommandes": {
      "filePath": "_sales/acceptationsCommandes.tsx",
      "parent": "/_sales"
    },
    "/_sales/acceptationsLivraisons": {
      "filePath": "_sales/acceptationsLivraisons.tsx",
      "parent": "/_sales"
    },
    "/_sales/acquittementsLivraisons": {
      "filePath": "_sales/acquittementsLivraisons.tsx",
      "parent": "/_sales"
    },
    "/_sales/allClients": {
      "filePath": "_sales/allClients.tsx",
      "parent": "/_sales"
    },
    "/_sales/clientDetails": {
      "filePath": "_sales/clientDetails.tsx",
      "parent": "/_sales"
    },
    "/_sales/passationsCommandes": {
      "filePath": "_sales/passationsCommandes.tsx",
      "parent": "/_sales"
    },
    "/_sales/sales": {
      "filePath": "_sales/sales.tsx",
      "parent": "/_sales"
    },
    "/_user/user": {
      "filePath": "_user/user.tsx",
      "parent": "/_user"
    },
    "/components/": {
      "filePath": "components/index.tsx"
    },
    "/_user/restaurant/$id": {
      "filePath": "_user/restaurant.$id.tsx",
      "parent": "/_user"
    }
  }
}
ROUTE_MANIFEST_END */
