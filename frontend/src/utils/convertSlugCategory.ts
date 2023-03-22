export const getSlugCategory = (category: string): string => {
  return category.split(' ').join('-').replace('&', 'and').toLocaleLowerCase();
};

export const getFriendlyCategoryString = (category: string): string => {
  return category.replace(/-/g, ' ').replace(' and ', ' & ');
};
