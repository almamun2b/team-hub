/* eslint-disable @typescript-eslint/no-explicit-any */
export const toQueryParams = (params: Record<string, any>): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    // Convert arrays to comma-separated string
    if (Array.isArray(value)) {
      query.append(key, value.join(","));
    } else {
      query.append(key, value.toString());
    }
  });

  return query.toString();
};
