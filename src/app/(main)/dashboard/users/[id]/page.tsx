"use client";

import { useParams } from "next/navigation";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex place-items-center justify-center p-20">
      <p>User ID: {id}</p>
    </div>
  );
};

export default UserPage;
