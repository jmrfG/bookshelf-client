import { Container } from "@mui/system";
import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";


export const RegisterBook = ({ onUpdate }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const postData = async () => {
        if (title !== "" && author !== "") {
            const book = { title, author }
            const res = await fetch("/add_book", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book)
            })
            if (res.ok) {
                console.log("Response OK");
                onUpdate(book);
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
                    <Button onClick={postData}>Register</Button>
                </Form.Field>
            </Form>
        </Container>

    )

}