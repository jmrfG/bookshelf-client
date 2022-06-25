import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookTableEspera() {
    const [books, setBooks] = useState([])
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(5);

    const columns = [
        { field: 'b_id', headerName: 'ID', width: 70, hide: true },
        { field: 'author', headerName: 'Author', width: 200, editable: true },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'status', headerName: 'Status', width: 400, hide: true },
        {
            field: 'page', headerName: 'Pagina Atual', width: 200, editable: true
        },
        { field: 'total_pages', headerName: 'Total de Paginas', width: 200, editable: true },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <Button
                        onClick={() => {
                            const IDS = selectionModel;
                            const selectedIDs = new Set(selectionModel);
                            // you can call an API to delete the selected IDs
                            // and get the latest results after the deletion
                            // then call setRows() to update the data locally here
                            deleteBooks(IDS);
                            setBooks((r) => r.filter((x) => !selectedIDs.has(x.b_id)));
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                );
            }
        }
    ];

    const deleteBooks = async (params) => {
        const id = params;
        const res = await fetch("/delete_book", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        })
        if (res.ok) {
            console.log("Response OK");
        } else {
            console.log("It took me 2 hours to do this.")
        }
    }

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
        <div style={{ height: "750px", width: "100%" }}>
            <DataGrid
                rows={books}
                columns={columns}
                pageSize={pageSize}
                getRowId={(row) => row.b_id}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={(props, event) => {
                    updateBook(props);
                }}
                onSelectionModelChange={(id) => {
                    setSelectionModel(id);
                }}
            />
        </div>
    );
}