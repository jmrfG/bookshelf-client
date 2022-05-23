import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function BookTable() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("/get_all_books", {
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

    const columns = [
        { field: 'b_id', headerName: 'ID', width: 70, hide: true },
        { field: 'author', headerName: 'Author', width: 400 },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'status', headerName: 'Status', width: 400 },
    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={books}
                columns={columns}
                getRowId={(row) => row.b_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}
