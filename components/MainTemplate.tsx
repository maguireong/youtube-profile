export function MainTemplate() {
  return (
    <main className="flex">
      <SidePanel />
      <section className="flex flex-col">
        <TopBar />
      </section>
    </main>
  );
}

function SidePanel() {
  return <div>side panel</div>;
}

function TopBar() {
  return <div>top bar</div>;
}
