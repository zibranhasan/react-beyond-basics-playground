import UserAvater from "./UserAvater";
import withBorder from "./withBorder";

const UserWithBorder = withBorder(UserAvater);

const GameResult = () => {
  return (
    <div className="flex flex-row gap-5">
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserWithBorder
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
};
export default GameResult;
