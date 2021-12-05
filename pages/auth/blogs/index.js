import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AuthenLayout from "@/components/layouts/authen";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { Container, CssBaseline, Link, Table, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Head } from "next/document";
export default function Blogs() {
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetcherWithToken(
        "https://sakko-demo-api.herokuapp.com/api/v1/user/blogs"
      ).then((json) => {
        setBlogs(json);
      });
    }
  }, [currentUser]);
  return (
    <AuthenLayout>
      <Container>
        <Typography component="h3">It's Blogs.</Typography>
        <Link href="/auth/blogs/new">New</Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Body</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell component="th" scope="row">
                    <Link href={`/auth/blogs/${item.id}`}>{item.title}</Link>
                  </TableCell>
                  <TableCell align="left">
                    <Box component="div" sx={{ textOverflow: "ellipsis" }}>
                      {item.body}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{item.created_at}</TableCell>
                  <TableCell align="right">{item.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </AuthenLayout>
  );
}
