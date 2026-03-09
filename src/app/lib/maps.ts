export function mapsLink(address: string) {
    const q = encodeURIComponent(address);
  
    // Si es iOS, mejor Apple Maps
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent);
  
    if (isIOS) {
      return `https://maps.apple.com/?q=${q}`;
    }
  
    // Android / Desktop: Google Maps
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }
  