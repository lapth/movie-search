// ================================================================================
// This js is for purpose to centralize all transport method GET, POST, ... into the Transporter helper.
// It will help to enrich the needed request information in one place
// ================================================================================

export async function GET(URL) {
  const fetchResults = await (await fetch(URL)).json();
  return fetchResults;
}
