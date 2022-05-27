import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

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

    const columns = [
        { field: 'b_id', headerName: 'ID', width: 70, hide: true },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'status', headerName: 'Status', width: 400, hide: true },
        { field: 'pagina', headerName: 'Pagina Atual', width: 200, renderCell: (e) => <Button variant='contained'>{e.value}</Button> },
        { field: 't_pagina', headerName: 'Total de Paginas', width: 200 },
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
