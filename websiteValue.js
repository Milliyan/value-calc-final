// FREE Working Version - No API Required
async function getWebsiteValue(domain) {
  try {
    // Clean the domain
    domain = domain.replace('https://', '').replace('http://', '').replace('www.', '');
    
    // Simulate calculation with basic metrics
    const websiteData = await estimateWebsiteMetrics(domain);
    const estimatedValue = calculateValue(websiteData);
    
    return {
      domain: domain,
      estimatedValue: estimatedValue,
      metrics: websiteData,
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error calculating value:', error);
    return {
      error: 'Unable to calculate value',
      domain: domain
    };
  }
}

// Estimate metrics without API (basic algorithm)
async function estimateWebsiteMetrics(domain) {
  // Basic scoring based on domain characteristics
  const domainAge = estimateDomainAge(domain);
  const domainLength = domain.length;
  const hasSSL = true; // Most sites have SSL now
  const estimatedTraffic = estimateTraffic(domain);
  const domainAuthority = estimateDomainAuthority(domain);
  
  return {
    domainAge: domainAge,
    monthlyTraffic: estimatedTraffic,
    domainAuthority: domainAuthority,
    hasSSL: hasSSL,
    domainLength: domainLength,
    extension: domain.split('.').pop()
  };
}

// Estimate domain age based on common patterns
function estimateDomainAge(domain) {
  const knownSites = {
    'google.com': 25,
    'facebook.com': 20,
    'amazon.com': 28,
    'youtube.com': 18,
    'twitter.com': 17
  };
  
  if (knownSites[domain]) {
    return knownSites[domain];
  }
  
  // Random estimate between 1-10 years for unknown sites
  return Math.floor(Math.random() * 10) + 1;
}

// Estimate traffic based on domain popularity indicators
function estimateTraffic(domain) {
  // Check if it's a known popular site
  const popularSites = {
    'google.com': 90000000000,
    'youtube.com': 30000000000,
    'facebook.com': 20000000000,
    'amazon.com': 5000000000,
    'twitter.com': 2000000000
  };
  
  if (popularSites[domain]) {
    return popularSites[domain];
  }
  
  // For unknown sites, estimate based on domain quality
  const baseTraffic = 10000;
  const randomMultiplier = Math.floor(Math.random() * 100) + 1;
  
  // Shorter domains typically get more traffic
  const lengthMultiplier = domain.length < 10 ? 10 : 1;
  
  // .com domains typically get more traffic
  const extensionMultiplier = domain.endsWith('.com') ? 5 : 1;
  
  return baseTraffic * randomMultiplier * lengthMultiplier * extensionMultiplier;
}

// Estimate domain authority
function estimateDomainAuthority(domain) {
  const knownAuthorities = {
    'google.com': 100,
    'facebook.com': 96,
    'youtube.com': 100,
    'amazon.com': 96,
    'wikipedia.org': 93
  };
  
  if (knownAuthorities[domain]) {
    return knownAuthorities[domain];
  }
  
  // Random score between 10-60 for unknown sites
  return Math.floor(Math.random() * 50) + 10;
}

// Calculate estimated value
function calculateValue(data) {
  // Basic valuation formula
  let baseValue = 0;
  
  // Traffic value: $0.01 per monthly visitor
  const trafficValue = data.monthlyTraffic * 0.01;
  
  // Domain authority bonus: $100 per DA point
  const authorityValue = data.domainAuthority * 100;
  
  // Age bonus: $500 per year
  const ageValue = data.domainAge * 500;
  
  // Domain length bonus (shorter is better)
  const lengthBonus = data.domainLength < 10 ? 5000 : 
                      data.domainLength < 15 ? 2000 : 500;
  
  // Extension bonus
  const extensionBonus = data.extension === 'com' ? 10000 :
                         data.extension === 'org' ? 5000 :
                         data.extension === 'net' ? 3000 : 1000;
  
  // Calculate total
  baseValue = trafficValue + authorityValue + ageValue + lengthBonus + extensionBonus;
  
  // Apply multiplier for very popular sites
  if (data.monthlyTraffic > 1000000) {
    baseValue *= 1.5;
  }
  if (data.monthlyTraffic > 10000000) {
    baseValue *= 2;
  }
  
  return Math.round(baseValue);
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getWebsiteValue, formatCurrency };
}
