export const formatLatitudeLongitude = (latitude: string, longitude: string): { formattedLat: string, formattedLng: string } => {

    const lat = parseFloat(latitude);
    const latDirection = lat >= 0 ? 'N' : 'S';
    const formattedLat = `${Math.abs(lat).toFixed(3)}˚${latDirection}`;
  

    const lng = parseFloat(longitude);
    const lngDirection = lng >= 0 ? 'E' : 'W';
    const formattedLng = `${Math.abs(lng).toFixed(3)}˚${lngDirection}`;
  
    return { formattedLat, formattedLng };
  };