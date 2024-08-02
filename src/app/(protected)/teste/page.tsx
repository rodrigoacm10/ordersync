import { auth } from "@/app/services/auth";

export default async function Teste() {
  const session = await auth();

  if (!session) {
    return <div>Not auth</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
