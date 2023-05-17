/**
 *
 * @param {number} currentPage
 * @param {number} totalPages
 */
export const paginate = (currentPage, totalPages) => {
  const numberOfPagesInMiddle = 4;
  const maximumLengthOfConsecutivePagesFromEdges = numberOfPagesInMiddle / 2;
  let startPage =
    currentPage < maximumLengthOfConsecutivePagesFromEdges + 1
      ? 1
      : currentPage - maximumLengthOfConsecutivePagesFromEdges;

  let endPage = numberOfPagesInMiddle + startPage;
  endPage = totalPages < endPage ? totalPages : endPage;

  const diff = startPage - endPage + numberOfPagesInMiddle;
  startPage -= startPage - diff > 0 ? diff : 0;

  // -1 means signals that the indexes are jumping
  const indexes = [];
  if (startPage > 1) indexes.push(1);
  if (
    startPage > 1 &&
    currentPage > numberOfPagesInMiddle
  )
    indexes.push(-1);
  for (let i = startPage; i <= endPage; i++) indexes.push(i);
  if (endPage < totalPages - 1) indexes.push(-1);
  if (endPage < totalPages) indexes.push(totalPages);

  return {
    currentPage,
    totalPages,
    startPage,
    endPage,
    diff,
    indexes: [...indexes],
  };
};
