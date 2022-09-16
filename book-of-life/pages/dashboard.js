import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabaseClient from "../utils/supabaseClient";
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Dashboard() {

const router=useRouter();
const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function signout() {
    const { error } = await supabaseClient.auth.signOut()
    router.push('/')
  }

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ content: " " })
  const { content } = post;
  useEffect(() => {
    fetchPosts()
    
  }, [])

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from('posts')
      .select().eq('userId', User.id)
    setPosts(data)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  const User = supabaseClient.auth.user()
  return (
    <>
      <div className={styles.dashboard_container}>
        Dashboard
        {/* <Button variant="contained">{User.user_metadata.full_name}</Button> */}
        <Button variant="contained" onClick={signout}>Signout</Button>
        <Link href='/create'><Button variant="contained">Create POST</Button></Link>
        <div className={styles.posts_container}>
          {posts.map(post => (
            <div key={post.id} onClick={handleOpen} style={{ backgroundColor: getRandomColor(), width: "400px", padding: "10px", borderRadius: "5px", border: "1px solid", boxShadow: "5px 10px #888888" }}>
              <h3>{post.created_at.substring(0, 10)} </h3>
              <p>{post.content} </p>
             
            </div>
           
          ))}
        
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}