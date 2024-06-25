import React, {useEffect, useState} from 'react';
import DefaultPage from '@/Layouts/Components/DefaultPage.jsx';
import Header from '@/Layouts/Components/Header/Header';
import RegistrationNavBar from '@/Layouts/Components/RegistrationNavBar/RegistrationNavBar';
import '@/Utils/css/style.module.css';
import {DataGrid} from "@mui/x-data-grid";
import {Link} from '@inertiajs/react';
import {Button} from "@mui/material";
import Create from "@/Components/ButtonAction/Create.jsx";

const defaultFilter = {
    name: null,
    comission: null,
    document: null,
    document_type: null,
    address: null,
    bank_data: null,
    afiliated_observation: null,
};

const columns = [
    {
        field: 'name',
        headerName: 'Nome',
        flex: 2,
        renderCell: ({row}) => (
            <Link href={route('affiliates.edit', [row.id])}>{row.name}</Link>
        )
    },
    {
        field: 'comission',
        headerName: 'Comissão',
        flex: 1,
        renderCell: ({row}) => `${row.comission}%`,
    },
    {
        field: 'document',
        headerName: 'Documento',
        flex: 1,
    },
    {
        field: 'document_type',
        headerName: 'Tipo de Documento',
        flex: 1,
    },
    {
        field: 'address',
        headerName: 'Endereço',
        flex: 2,
    },
    {
        field: 'bank_data',
        headerName: 'Dados Bancários',
        flex: 2,
        renderCell: ({row}) => `${row.bank_data.bank_name} - ${row.bank_data.account_number}`,
    },
    {
        field: 'afiliated_observation',
        headerName: 'Observações',
        flex: 2,
    },
];
const List = ({affiliates}) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [customColumns, setCustomColumns] = useState(columns);
    const [filter, setFilter] = useState({...defaultFilter});

    useEffect(() => {
        const newColumns = customColumns.map(column => {
            if (typeof filter[column.field] === 'undefined') {
                return {...column};
            }

            const searchValue = filter[column.field];

            return {
                ...column,
                search: {
                    value: searchValue === null ? 'null' : searchValue,
                    regex: false,
                    operator: searchValue === null ? 'isEmpty' : (column.search?.operator || 'equals'),
                },
            };
        });

        setCustomColumns(newColumns);
    }, [filter]);

    return (
        <DefaultPage
            actions={[
                <Create route={route('affiliates.create')}
                        label='Cadastrar Novo Afiliado'/>,
            ]}
        >
            <div className="page-layout cadastro">
                <Header/>
                <RegistrationNavBar/>

                <DataGrid
                    rows={affiliates}
                    columns={customColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                />
                <div className="btns-container">
                    <Button type="submit" className="button" variant="contained" disableElevation>
                        Cadastrar Novo Afiliado</Button>
                </div>
            </div>
        </DefaultPage>
    );

}

export default List;
