export const getPrettyFileSize = (sizeInBytes) => {
  if (sizeInBytes > 1000000) return (sizeInBytes / 1000000).toFixed(2) + " MB";
  else if (sizeInBytes > 1000) return (sizeInBytes / 1000).toFixed(2) + " KB";
  else return sizeInBytes.toFixed(2) + " B";
};
