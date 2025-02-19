import axios, { AxiosError } from "axios";

const MAIN_DOMAIN = "http://localhost:8080";

// user log-in
const loginUser = (body: {
  userName: string;
  email?: string;
  password: string;
}) => {
  const route = "/login-user";
  return appFetch(route, "POST", body);
};

const getAuthenticationToken = (token: string) => {
  const route = "/protected-route";
  return appFetch(route, "GET", undefined, {
    Authorization: `Bearer ${token}`,
  });
};

const createNewTransaction = (body: {
  name: string;
  category: string;
  wallet: string;
  sum: number;
}) => {
  const route = "/create-transaction";
  return appFetch(route, "POST", body);
};

const getAllTransactions = (token: string) => {
  const route = "/transactions";
  return appFetch(
    route,
    "GET",
    { token },
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// fetching function
const appFetch = async (
  route: string,
  method: "GET" | "POST",
  body?: Record<string, unknown>,
  headers?: Record<string, string>
) => {
  try {
    const dataRequest = await axios({
      method: method,
      url: MAIN_DOMAIN + route,
      data: method !== "GET" ? body : undefined,
      headers,
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

export {
  loginUser,
  getAuthenticationToken,
  createNewTransaction,
  getAllTransactions,
};
