const UserList = ({ isLoading, error, data }) => {
  if (isLoading && !error) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  return (
    <div>
      {data.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};
export default UserList;
