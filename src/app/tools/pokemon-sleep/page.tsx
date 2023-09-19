'use client';

import { useSession } from "next-auth/react";

const Pokemon = () => {
  const {data: session} = useSession()
  const user = session?.user

  const test = async () => {
    const result = await fetch("/api/pokemon", {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),
    })

    await result.json().then((data) => {
      console.log(data)
    })
  }

  return (
    <>
      <div>
        <button onClick={ test }>Hello</button>
      </div>
    </>
  )
}

export default Pokemon