type ApiRequestOptions = {
  url: string;
  body?: any;
};

export async function get<T>({ url }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch data.");

  const data = await res.json();

  return data as T;
}

export async function post<T>({ url, body }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to post data.");

  const data = await res.json();

  return data as T;
}

export async function patch<T>({ url, body }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to patch data.");

  const data = await res.json();

  return data as T;
}

export async function put<T>({ url, body }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to put data.");

  const data = await res.json();

  return data as T;
}

export async function del<T>({ url }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to delete data.");

  const data = await res.json();

  return data as T;
}
