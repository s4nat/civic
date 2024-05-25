"use client"
export default async function Page({ params }: { params: { id: string } }) {
    return <div className="mt-20">My Post: {params.id}</div>
  }