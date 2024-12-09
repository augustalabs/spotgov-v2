/** SUCCESS STATUS */

import { Response } from "@/types";

export const STATUS_OK: Omit<Response<unknown>, "payload"> = {
  success: true,
  status: 200,
  message: "OK",
};

export const STATUS_CREATED: Omit<Response<unknown>, "payload"> = {
  success: true,
  status: 201,
  message: "Created",
};

/** ERROR STATUS */

export const STATUS_BAD_REQUEST: Omit<Response<unknown>, "payload"> = {
  success: false,
  status: 400,
  message: "Bad Request",
};

export const STATUS_UNAUTHORIZED: Omit<Response<unknown>, "payload"> = {
  success: false,
  status: 401,
  message: "Unauthorized",
};

export const STATUS_FORBIDDEN: Omit<Response<unknown>, "payload"> = {
  success: false,
  status: 403,
  message: "Forbidden",
};

export const STATUS_NOT_FOUND: Omit<Response<unknown>, "payload"> = {
  success: false,
  status: 404,
  message: "Not Found",
};

export const STATUS_INTERNAL_SERVER_ERROR: Omit<
  Response<unknown>,
  "payload"
> = {
  success: false,
  status: 500,
  message: "Internal Server Error",
};

export const STATUS_SERVICE_UNAVAILABLE: Omit<Response<unknown>, "payload"> = {
  success: false,
  status: 503,
  message: "Service Unavailable",
};
