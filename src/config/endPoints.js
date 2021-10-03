const ApiEndPoint = Object.freeze({
  BASE_URL: 'https://api.github.com/',
  SEARCH_REPO: (term, page = 1) => `search/repositories?q=${term}&page=${page}`,
  FETCH_CONTRIBUTORS: (fullName, page) => `repos/${fullName}/contributors`,
});

export default ApiEndPoint;
