import { Container } from "@mui/system";
import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import Button from '@mui/material/Button';


export const RegisterBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState("");

    const postData = async () => {
        if (title !== "" && author !== "") {
            const book = { title, author, pages }
            console.log(book)
            const res = await fetch("/add_book", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book)
            })
            if (res.ok) {
                console.log("Response OK");
                setTitle("");
                setAuthor("");
            }
        }
        else {
            console.log("Good lord, this thing is taking longer than expected.")
        }
    }

    return (
        <Container>
            <Form>
                <Form.Field>
                    <Input placeholder="Book title" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Input placeholder="Book author" value={author} onChange={e => setAuthor(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Input placeholder="Number of pages" value={pages} onChange={e => setPages(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Button variant="outlined" onClick={postData}>Register</Button>
                </Form.Field>
            </Form>
        </Container>
    )

}