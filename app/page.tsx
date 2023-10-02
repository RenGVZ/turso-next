import { createClient } from "@libsql/client"

const client = createClient({
  url: process.env.NEXT_TURSO_URL as string,
  authToken: process.env.NEXT_AUTH_TOKEN as string,
})

const getUsersWithClient = async () => {
  try {
    const res = await client.execute("select * from users")
    return res
  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  const users = await getUsersWithClient()
  console.log("users", users)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Users</h1>
      {users?.rows.map((user) => (
        <div key={user?.id?.toString()}>{user?.name?.toString()}</div>
      ))}
    </main>
  )
}
