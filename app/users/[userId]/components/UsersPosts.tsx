import React from "react";

type UsersPostsProps = {
  promise: Promise<Post[]>;
};

const UsersPosts: React.FC<UsersPostsProps> = async ({ promise }) => {
  const posts = await promise;

  const content = posts.map((post) => {
    return (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <br />
      </article>
    );
  });

  return content;
};

export default UsersPosts;
