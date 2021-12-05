import AuthenLayout from "@/components/layouts/authen";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { Button, Container, Input, TextField, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

export default function BlogDetail() {
  const { currentUser, fetcherWithToken } = useCurrentUser();

  const router = useRouter();
  const id = router.query.id;
  const [blog, setBlog] = useState({ title: "", body: "" });

  useEffect(() => {
    if (currentUser) {
      fetcherWithToken(
        `https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${id}`
      ).then((json) => {
        setBlog(json);
      });
    }
  }, [currentUser]);

  const handleOnChange = (e, type) => {
    if (type === "title") {
      setBlog({ ...blog, title: e.target.value });
    } else if (type === "body") {
      setBlog({ ...blog, body: e.target.value });
    }
  };

  const handleSubmit = () => {
    fetcherWithToken(`https://sakko-demo-api.herokuapp.com/api/v1/user/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        blog: {
          title: blog.title,
          body: blog.body,
        },
      }),
    }).then((json) => {
      router.push(`/auth/blogs/${id}`);
    });
  };

  return (
    <AuthenLayout>
      <Container>
        <Typography component="h3">Create New Blog</Typography>
        <div>
          <h3>Title</h3>
          <TextField
            type="text"
            value={blog.title}
            onChange={(e) => {
              handleOnChange(e, "title");
            }}
          />
        </div>
        <div>
          <h4>Body</h4>
          <textarea
            name="body"
            cols="30"
            value={blog.body}
            onChange={(e) => {
              handleOnChange(e, "body");
            }}
          />
        </div>
        <div>
          <Button onClick={handleSubmit}>EDIT</Button>
        </div>
      </Container>
    </AuthenLayout>
  );
}
