import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import GetAllUsers from "@/lib/getAllUsers";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage: React.FC = async () => {
  const usersData: Promise<User[]> = GetAllUsers();

  const users = await usersData;

  const content = (
    <section>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <br />
      {users.map((user) => {
        return (
          <>
            <p key={user.id}>
              <Link key={user.id} href={`/users/${user.id}`}>
                {user.name}
              </Link>
            </p>
            <br />
          </>
        );
      })}
    </section>
  );

  return content;
};
export default UsersPage;
