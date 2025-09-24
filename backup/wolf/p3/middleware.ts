// pages/api/middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let cachedRewrites = null;
let cacheTimestamp = 0; // Initialize timestamp to 0

const CACHE_EXPIRATION_TIME = 60 * 1000; // 60 seconds in milliseconds

async function fetchRewrites() {
  const currentTime = Date.now();

  // Check if the cached data is still valid (within the expiration time)
  if (cachedRewrites !== null && currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
    return cachedRewrites;
  }

  const response = await fetch(`${process.env.API_DOMAIN}/api/v1/aliaslink`, {
    method: 'POST',
    headers: process.env.API_HEADER,
  });

  if (!response.ok) {
    console.log('Failed to fetch data from API route');
    return [];
  }

  const data = await response.json();
  const AliasData = data.data?.list || [];
  const rewrites = AliasData.map(item => ({
    source: item.alias,
    destination: getDestination(item.link,item.global,item.alias),
    global: item.global,
  }));

  // Cache the fetched data and update the timestamp
  cachedRewrites = rewrites;
  cacheTimestamp = currentTime;
  
  return rewrites;
}

export async function middleware(request: NextRequest) {
  const rewrites = await fetchRewrites();
  for (const rewrite of rewrites) {
    if (request.nextUrl.pathname === rewrite.source) {
      const rewrittenUrl = new URL(rewrite.destination, request.url);
      
      // if(rewrite.global)
      //  return NextResponse.redirect(rewrittenUrl);
      return NextResponse.rewrite(rewrittenUrl);
    }
  }
  // If no rewriting is required, return null to allow the request to continue as usual
  return null;
}
function getDestination(url,isglobal,alis){
   if(isglobal == 0){
    const lastSlashIndex = url.lastIndexOf('/');
    const modifiedUrl = url.substring(0, lastSlashIndex) + "_{isAlias}__{"+alis.replaceAll('/','@')+"}_/" + url.substring(lastSlashIndex + 1);
    return modifiedUrl;
   }
   return url;
}