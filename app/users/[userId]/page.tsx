import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import UsersPosts from "./components/UsersPosts";

import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import GetAllUsers from "@/lib/getAllUsers";

type UserPageProps = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({ params: { userId } }: UserPageProps) => {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: user.name,
    description: `This is page of ${user.name}`,
  };
};

const UserPage: React.FC<UserPageProps> = async ({ params: { userId } }) => {
  const userData: Promise<User> = getUser(userId);
  const postsData: Promise<Post[]> = getUserPosts(userId);

  const user = await userData;
  if (!user) notFound();

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UsersPosts promise={postsData} />
      </Suspense>
    </>
  );
};
export default UserPage;

export const generateStaticParams = async () => {
  const usersData: Promise<User[]> = GetAllUsers();
  const users = await usersData;

  return users.map((user) => ({
    userId: user.id.toString(),
  }));
};
