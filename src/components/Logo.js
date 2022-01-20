const Logo = (props) => (
  <img
    alt="Logo"
    src={`${process.env.PUBLIC_URL}/logo.svg`}
    {...props}
  />
);

export default Logo;
