import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: 'b_id', headerName: 'ID', width: 70, hide: true },
    { field: 'author', headerName: 'Author', width: 200, editable: true },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'status', headerName: 'Status', width: 400, hide: true },
    {
        field: 'page', headerName: 'Pagina Atual', width: 200, editable: true
    },
    { field: 'total_pages', headerName: 'Total de Paginas', width: 200 },
];

export default function BookTableEspera() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("/get_all_books_em_espera", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res =>
                res.json()
                    .then(data => {
                        console.log(data);
                        setBooks(data);
                    }));
    }, []);

    const updateBook = async (params) => {
        const id = params.id;
        const field = params.field;
        const new_value = params.value;
        const new_book = [id, field, new_value]

        const res = await fetch("/update_book", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_book)
        })
        if (res.ok) {
            console.log("Response OK");
        } else {
            console.log("It took me 2 hours to do this.")
        }
    }

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={books}
                columns={columns}
                pageSize={5}
                getRowId={(row) => row.b_id}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={(props, event) => {
                    updateBook(props);
                }}
            />
        </div>
    );
}