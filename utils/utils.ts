const formatDate = (timestamp: Date) => {
  let date = new Date(timestamp);
  return date.toDateString();
};

enum PhotoSize {
  l = "l",
  m = "m",
  s = "s",
}

const convertPhotoToSmall = (file: String, size: PhotoSize = PhotoSize.s) => {
  let str = file.split(".webp");
  return str[0] + "@" + size + ".webp";
};

export { formatDate, convertPhotoToSmall };
