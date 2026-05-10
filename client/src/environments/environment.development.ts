const projectMatch = window.location.pathname.match(/^(\/project\/[^/]+)/);
const projectBase = projectMatch ? projectMatch[1] : "";

export const environment = {
  production: false,
  apiUrl: window.location.origin + projectBase + "/proxy/3000"
};