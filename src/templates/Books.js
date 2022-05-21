import React from "react";
import { Header, List } from "semantic-ui-react";

export const BookShelf = ({books}) => {
    return (
        <List>
            {books.map(b=>{
                return (
                <List.Item key={b.title}>
                    <Header>
                        {b.title} - {b.author}
                    </Header>
                </List.Item>
                )
            })}
        </List>
    )
}