import { useSearchParams } from 'react-router-dom';

const useBreadcrumbHistory = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('q')?.replace('+', ' ');
  const page = searchParams.get('page');

  return { category, searchQuery, page };
};

export default useBreadcrumbHistory;
