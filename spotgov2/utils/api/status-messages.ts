/** SUCCESS STATUS */

export const STATUS_OK = {
  success: true,
  status: 200,
  message: "OK",
};

export const STATUS_CREATED = {
  success: true,
  status: 201,
  message: "Created",
};

export const STATUS_NO_CONTENT = {
  success: true,
  status: 204,
  message: "No Content",
};

/** ERROR STATUS */

export const STATUS_BAD_REQUEST = {
  success: false,
  status: 400,
  message: "Bad Request",
};

export const STATUS_UNAUTHORIZED = {
  success: false,
  status: 401,
  message: "Unauthorized",
};

export const STATUS_FORBIDDEN = {
  success: false,
  status: 403,
  message: "Forbidden",
};

export const STATUS_NOT_FOUND = {
  success: false,
  status: 404,
  message: "Not Found",
};

export const STATUS_INTERNAL_SERVER_ERROR = {
  success: false,
  status: 500,
  message: "Internal Server Error",
};

export const STATUS_SERVICE_UNAVAILABLE = {
  success: false,
  status: 503,
  message: "Service Unavailable",
};
