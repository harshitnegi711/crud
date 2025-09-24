
export default async function network(route, token = null, method, data = undefined) {
  // if (!method || method === "GET") {
  //   route += "?origin=" + encodeURIComponent(window.origin);
  // }

  const isFormData = data instanceof FormData;

  const headers = {
    "x-access-token": token,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const fetchParams = {
    method,
    // mode: "cors",
    credentials: "include",
    headers,
  };

  if (method !== "GET" && method !== "DELETE") {
    fetchParams["body"] = isFormData ? data : JSON.stringify(data);
  }

  try {
    const resp = await fetch(route, fetchParams);
    const respData = await resp.json();

    if (respData.statusCode !== 200) throw new Error(respData.error);
    if (!respData.success) throw new Error(respData.error);
    if (respData.data === undefined) return respData;

    return respData.data;
  } catch (err) {
    throw new Error("Error in Route: " + route + " " + err.message);
  }
}

