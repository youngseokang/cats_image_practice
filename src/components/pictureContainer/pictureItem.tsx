const PictureItem = (data: pictureItemType) => {
  return (
    <div>
      this is picture <img src={data.url} />
    </div>
  );
};

export default PictureItem;
