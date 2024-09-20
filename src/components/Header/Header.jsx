import "./Header.css";

export default function Header({ children }) {
  return (
    <header className="header">
      <h1 className="title">{children}</h1>
    </header>
  );
}
