import AuthenLayout from "@/components/layouts/authen";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useState } from "react";
import { Button, Container, Input,TextareaAutosize, Link, Table, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
export default function Blogs() {
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const router = new useRouter();

  const handleOnChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
      if(currentUser){
        fetcherWithToken(`https://sakko-demo-api.herokuapp.com/api/v1/user/blogs`,{
            method: "POST",
            body: JSON.stringify({
                blog: {
                    title,
                    body
                }
            })
        }).then((json) => {
            router.push("/auth/blogs")
        })
      }
  }

  return (
    <AuthenLayout>
      <Container>
        <Typography component="h3">Create New Blog</Typography>
        <div>
          <h3>Title</h3>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              handleOnChange(e, setTitle);
            }}
          />
        </div>
        <div>
          <h4>Body</h4>
          <TextareaAutosize
            name="body"
            cols="30"
            minRows="5"
            maxRows="10"
            value={body}
            onChange={(e) => {
              handleOnChange(e, setBody);
            }}
          ></TextareaAutosize>
        </div>
        <div>
            <Button onClick={ handleSubmit }>CREATE</Button>
        </div>
      </Container>
    </AuthenLayout>
  );
}
