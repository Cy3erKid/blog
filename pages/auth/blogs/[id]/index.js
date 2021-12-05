import AuthenLayout from "@/components/layouts/authen";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { Button, Container, Link, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

export default function BlogDetail() {
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const router = useRouter();
  const id = router.query.id;
  const [blog, setBlog] = useState({});
  useEffect(() => {
    if (currentUser) {
      fetcherWithToken(
        `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${id}`
      ).then((json) => {
        setBlog(json);
      });
    }
  }, [currentUser]);

  

  return (
    <AuthenLayout>
      <Container>
        <Link href="/auth/blogs">Blogs</Link> 
        | <Link href={ `/auth/blogs/${blog.id}/edit` }>Edit</Link> 
        | <Button variant="outlined" color="error" onClick={() => {
            fetcherWithToken(
              `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${id}`,
              {method: "DELETE"}
            ).then(() => {
              router.push(`/auth/blogs`);
            });
        }}>Delete</Button>
        <Typography component="h1" variant="h1">{blog.title}</Typography>
        <div>
          <Typography component="p" textOverflow="ellipsis">
            {blog.body}
          </Typography>
        </div>
      </Container>
    </AuthenLayout>
  );
}
