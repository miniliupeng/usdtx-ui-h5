
export const ShowHOC = (WrappedComponent) => {
  return function ShowComponent({ open, ...props }) {
    if (!open) return null;
    return <WrappedComponent open={open} {...props} />;
  };
};
