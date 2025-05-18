import UserList from "./UserList";
import useUsersData from "../hooks/useUsersData";

const UsersContainer = () => {
  const { data, error, isLoading } = useUsersData();
  return <UserList data={data} error={error} isLoading={isLoading} />;
};
export default UsersContainer;
