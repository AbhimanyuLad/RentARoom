const axios = require("axios");



const getGeocode = async (state, country) => {
    const apiKey = "AIzaSyBlxS3tU1zjgL_2V11U-vPlR7wUKZoNH0Y"; // Replace with your Google API key
    const address = `${state}, ${country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    console.log(`${state}, ${country}`);
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
        return location;
      } else {
        console.error('Geocoding error:', response.data.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  };


module.exports = getGeocode;