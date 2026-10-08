/** Slow-drifting warm light fields behind the whole page. Purely decorative. */
export default function Glowfield() {
  return (
    <div aria-hidden="true" className="glowfield">
      <span className="glow glow-a" />
      <span className="glow glow-b" />
      <span className="glow glow-c" />
    </div>
  );
}
