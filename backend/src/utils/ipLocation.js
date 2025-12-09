import axios from "axios";

export async function geoLookup(ip) {
  if (ip.startsWith("10.") || ip.startsWith("192.168") || ip.startsWith("172.")) {
    return { country: "Private Network", lat: null, lon: null };
  }

  try {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`);
    return { 
      country: res.data.country_name,
      lat: res.data.latitude,
      lon: res.data.longitude
    };
  } catch {
    return { country: "Unknown", lat: null, lon: null };
  }
}
