const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/.test(userAgent)) {
    return "tablet";
  }

  if (/mobile|android|iphone|ipod|windows phone/.test(userAgent)) {
    return "mobile";
  }

  return "desktop";
};

export default getDeviceType;
