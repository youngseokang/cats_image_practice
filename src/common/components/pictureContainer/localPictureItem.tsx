function LocalPictureItem(props: localPictureItemProps) {
  const { data, downloadLocalCatImage } = props;
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.url} width={400} height={300} />
      <button onClick={() => downloadLocalCatImage(data.name)}>DOWNLOAD</button>
    </div>
  );
}
export default LocalPictureItem;
