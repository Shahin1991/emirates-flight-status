# emirates-flight-status

This project is created for evaluation purposes.

Project uses React

Assumptions:

Currently, the API for getting flight status for Emirates is blocked by CORS. Hence, using a mock response from an actual result to show the results
A possible way to circumvent the CORS behaviour is by having a proxy service in between the client and the API. The client will call the proxy service with all the parameters. The proxy service will call the flight status API. The proxy service should be able to call the flight status API as CORS restrictions are rules enforced by browser. The proxy service can return the response received from the API to the client with the correct CORS header parameters

Application is hosted in github pages on:
https://shahin1991.github.io/emirates-flight-status/


API's used:

To get list of airports:
https://www.emirates.com/service/airports?lang=en

To get flight status for a departure and arrival destination for 3 closest days:
https://www.emirates.com/service/flight-status?departureDate=2022-03-17&origin=DXB&destination=LHR

Desktop View:

<img width="849" alt="image" src="https://user-images.githubusercontent.com/31946584/159186027-25702597-4ddd-4bb7-861f-d5b2edb8b40a.png">

Mobile View:

<img width="154" alt="image" src="https://user-images.githubusercontent.com/31946584/159186104-ee4e256e-010b-4cc9-8007-9b031dc07892.png">
