import { useQuery } from 'react-query';

import ApiEndPoint from '../config/endPoints';
import queryKeys from '../config/queryKeys';
import api from '../config/api';

async function fetchRepo({ queryKey }) {
  const [, term, page] = queryKey;

  const response = await api.get(ApiEndPoint.SEARCH_REPO(term, page));

  return response;
}

async function fetchContributors({ queryKey }) {
  const [, fullName, page] = queryKey;

  const response = await api.get(
    ApiEndPoint.FETCH_CONTRIBUTORS(fullName, page)
  );

  return response;
}

export const useFetchRepos = (term, page, ...props) =>
  useQuery([queryKeys.repo, term, page], fetchRepo, ...props);

export const useFetchContributors = (fullName, page, ...props) =>
  useQuery(
    [queryKeys.contributors, fullName, page],
    fetchContributors,
    ...props
  );
