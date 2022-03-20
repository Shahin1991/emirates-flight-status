# emirates-flight-status

This project is created for evaluation purposes.

Project uses React

Assumptions:

Currently, the API for getting flight status for Emirates is blocked by CORS. Hence, using a mock response from an actual result to show the results
A possible way to circumvent the CORS behaviour is by having a proxy service in between the client and the API. The client will call the proxy service with all the parameters. The proxy service will call the flight status API. The proxy service should be able to call the flight status API as CORS restrictions are rules enforced by browser. The proxy service can return the response received from the API to the client with the correct CORS header parameters



