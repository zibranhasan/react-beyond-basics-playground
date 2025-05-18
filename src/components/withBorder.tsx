const withBorder = (WrappedComponent) => {
  return (props) => (
    <div className="border-2 border-purple-500 border-rounded">
      <WrappedComponent {...props} />
    </div>
  );
};
export default withBorder;
