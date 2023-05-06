# Currency Convertor App

This is the result of evaluation task for a Full-Stack Developer position.

App consists of
- Currency Convertor
- Today's rates
- Historical rates

## Overview

The result is an application, consisting of **Node.js, Express.js, PostgresQL, Redis** backend services
and **React** client app with **Material UI** library.

All services are **containerized** with optimized image size,
meaning they can be run with **Docker** with ease, and images will take minimal space.\
However, for production use, orchestration services (like kubernetes) should be used.

Architecture follows **Domain Drive Design**, as all code is separated by domain model.

Backend service makes use of **MVC** approach, while UI is **MVVM** with react hooks.

All services are made with **Standard JS (not TypeScript) with functional approach**
as per requirements by evaluator. I would personally use TypeScript instead.

Client app utilizes **Adaptive** and **Responsive** design, allowing for smooth UX
on all devices.

App utilizes an **external service** [FreeCurrencyApi.com](http://freecurrencyapi.com)
as a source for data for currency rates.
Data is fetched periodically with **job queue** schedule.
Free external API has **strict limit for requests**, that's why we have to **cache**
all data in our db.

Task was completed in 8 days. Process of task completion can be seen from commit history.

## Demo
Demo is available [here](http://45.8.248.99).

**Credentials:**\
user\
12345


## Development
### How to run
1. Set up **ENV** variables as per **./app/.env.development** 
2. Run docker compose
### ```docker compose up```
**OR**

2. You can manually run individual services using
### ```npm start```

### What is yet to be done (TODO)
- write lots of tests!
- production deploy with kubernetes
- linting
- use TypeScript instead
- better error handling (network errors, offline app usage, toasts)
- databases auto-clean up
- standalone auth service, for proper auth token refresh, reaction for password change
- proper unique design (i.e. company logo, favicon, ui-kit)

### Limitations
- All amounts should be rounded for 0.05 steps (floored) - this one **cannot be done
properly**, since user can type both source amount and target amount. This way he will
get different results for same amounts. Which is a bad UX.
- Have to cache yearly amount of rates in DB, because of limits in external API.
- Low amount of time given, led to lack of tests
- Requirement for **AED** currencies being always on top of the list, - **is not doable**,
because there is **no AED rates provided** by freecurrency.com. I've used EUR instead of it.
- App calculates any rate, using USD as a base rate. Due to higher precision in storage (6 digits), 
it allows us to store less data, and still have precise (4 digits) rates on UI. This also allows us
to cache data once for all rates, instead of requesting it each time (and potentially hitting limits).
BUT one might say, that rates are less precise, that directly from external api.

### Additional requirements 
- All rates should be rounded for four decimal places. 
- All amounts should be rounded in 0.05 steps (floored) for two decimal places. 
- The user should login with Username & Password before he can interact with the
  server. 
- The app should not call the currency API directly. It should call a NodeJS service that
  will hold the API Key to make the currency requests on the app behalf. All calls (except login) should be authenticated
- All rates should be rounded for four decimal places.
- Preferred authentication method is JWT
- If user is not authenticated. He’s not allowed to access the converter screen
- The default amount of source currency is 1000.00
- User can change the source and target currencies, the change of the above should
  immediately reflect on target amount
- Today’s rates will be displayed for 5 predefined currencies (EUR, GBP, CAD, MXN and JPY) related to the selected source currency.
- If one of the above currencies is selected as the source currency USD will be used instead of it.
- User can select four different time frames to show historical data:
  - Last month
  - Last 3 month
  - Last 6 month
  - Last 12 month