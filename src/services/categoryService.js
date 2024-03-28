import http from "./httpService";

export function getCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}
