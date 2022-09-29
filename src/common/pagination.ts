export const pageQuery = (route: string, page: number) =>
  `${route}${page === 1 ? '' : `?page=${page}`}`;
