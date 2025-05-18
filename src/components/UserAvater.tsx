const UserAvater = ({ imageURL }) => {
  return (
    <div>
      <img
        className="w-15 h-15 rounded-full object-cover"
        alt="User Avatar"
        src={imageURL}
      />
    </div>
  );
};
export default UserAvater;
