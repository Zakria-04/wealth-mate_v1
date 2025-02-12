import axios, { AxiosError } from "axios";

const MAIN_DOMAIN = "http://localhost:8080";

const appFetch = async (
  route: string,
  method: "GET" | "POST",
  body?: Record<string, unknown>
) => {
  try {
    const dataRequest = await axios({
      method: method,
      url: MAIN_DOMAIN + route,
      data: method !== "GET" ? body : null,
    });

    return dataRequest.data;
  } catch (error: unknown) {
    const serverError =
      error instanceof AxiosError
        ? error.response?.data
        : "An unexpected error occurred";

    throw new Error(JSON.stringify(serverError));
  }
};

export default appFetch;
