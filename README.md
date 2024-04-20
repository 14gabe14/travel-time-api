# Travel Time API

The Travel Time API is a server-side application that provides travel time information for the Travel Time Chrome Extension. It acts as an intermediary between the extension and the Google Maps Directions API, handling requests for travel time calculations and returning the necessary data.

## Features

- Handles travel time requests from the Travel Time Chrome Extension
- Communicates with the Google Maps Directions API to retrieve travel time data
- Supports driving and transit modes of transportation
- Calculates additional transit information, such as the number of transits and total walking time
- Provides a simple and intuitive API endpoint for retrieving travel time data

## Installation

1. Clone or download the API server repository.
2. Navigate to the server directory.
3. Run `npm install` to install the required dependencies.
4. Create a `config.js` file in the server directory with the following content:
   ```javascript
   module.exports = {
     API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY'
   };
   ```
   Replace `'YOUR_GOOGLE_MAPS_API_KEY'` with your actual Google Maps Directions API key.
5. Start the server by running `npm start` or `node server.js`.

## API Endpoints

### GET /api/directions

Retrieves travel time information between an origin and destination.

#### Query Parameters

- `origin` (required): The origin address or location.
- `destination` (required): The destination address or location.
- `mode` (required): The mode of transportation. Supported values: `driving`, `transit`.
- `timeOption` (optional): The time option for the travel time calculation. Supported values: `arriveBy`, `departAt`.
- `time` (optional): The desired arrival or departure time in ISO 8601 format (e.g., `2023-06-08T09:00:00Z`).

#### Response

- `duration`: The estimated travel time duration.
- `transitInfo` (transit mode only):
  - `numTransits`: The number of transit rides.
  - `totalWalkingTime`: The total walking time in seconds.

## Configuration

The API server requires a valid Google Maps Directions API key to function properly. Make sure to set up an API key and provide it in the `config.js` file.

## Dependencies

- Express.js
- Axios
- Google Maps Directions API

## License

This API server is released under the [MIT License](LICENSE).
