import React, {useCallback, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import qs from 'qs';
import http from "@/Libs/Http";
import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import {Card} from "@mui/material";

export default function DataTable({url, columns, data, pageSize, rowsPerPageOptions, ...dataGridProps}) {
    const serverSide = !!url;

    const initialSortModel = dataGridProps.sortModel || columns.filter(col => {
        return typeof col.sortable === 'undefined' || col.sortable;
    }).map(col => ({
        field: col.field,
        sort: !!col.defaultSortDir ? (['asc', 'desc'].includes(col.defaultSortDir) ? col.defaultSortDir : '') : '',
    })).filter(col => !!col.sort);

    const initialFilterModel = dataGridProps.filterModel || {
        linkOperator: 'and',
        items: columns.filter(col => typeof col.filterable === 'undefined' || col.filterable)
            .map(col => ({
                id: col.field,
                columnField: col.field,
                operatorValue: 'contains',
                value: undefined,
            })),
    };

    const config = {
        ...dataGridProps,
        columns: columns.map(column => {
            if (!column.renderCell) {
                return column;
            }

            return {
                ...column,
                renderCell: (defaultParams) => {
                    const customParams = {
                        ...defaultParams,
                        reloadDataTable: () => {
                            return serverSide ? loadDataTable() : defaultParams.api.forceUpdate();
                        },
                    }

                    return column.renderCell(customParams);
                },
            };
        }),
        rows: (dataGridProps.rows || data) || [],
        rowCount: serverSide ? 0 : (dataGridProps.rows || data).length,
        page: dataGridProps.page || 0,
        pageSize: pageSize || 25,
        rowsPerPageOptions: rowsPerPageOptions || [25, 50, 75, 100],
        autoHeight: true,
        sortModel: initialSortModel,
        sortingMode: serverSide ? 'server' : 'client',
        filterModel: {
            ...initialFilterModel,
            items: [initialFilterModel.items[0]],
        },
        filterMode: serverSide ? 'server' : 'client',
        pagination: true,
        paginationMode: serverSide ? 'server' : 'client',
        loading: false,
    };

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(config.loading);

    const [currentRows, setCurrentRows] = useState(config.rows);

    const [currentRowCount, setCurrentRowCount] = useState(config.rowCount);

    const [currentPage, setCurrentPage] = useState(config.page);

    const [currentPageSize, setCurrentPageSize] = useState(config.pageSize);

    const [currentSortModel, setCurrentSortModel] = useState(config.sortModel);

    const [currentFilterModel, setCurrentFilterModel] = useState(config.filterModel);

    const updateCurrentSortModel = useCallback((newSortModel) => {
        if (newSortModel.length !== currentSortModel.length) {
            return setCurrentSortModel(newSortModel);
        } else if (JSON.stringify(newSortModel) !== JSON.stringify(currentSortModel)) {
            return setCurrentSortModel(newSortModel);
        }
    }, [currentSortModel]);

    const draw = 1;

    const loadDataTable = () => {
        setLoading(true);

        const selectColumns = config.columns.map((col, index) => {
            let search = {
                value: null,
                regex: false,
                operator: 'contains',
            };

            if (col.search) {
                search = {
                    ...search,
                    ...col.search,
                };
            } else {
                const filter = currentFilterModel.items.find(item => item.columnField === col.field);

                if (filter) {
                    search = {
                        ...filter,
                        regex: false,
                    };
                }
            }

            return {
                data: index,
                name: col.field,
                searchable: typeof col.filterable === 'undefined' ? true : col.filterable,
                orderable: typeof col.sortable === 'undefined' ? true : col.sortable,
                search: search,
            };
        });

        let queryString = qs.stringify({
            draw: draw + 1,
            columns: selectColumns,
            order: currentSortModel.map(item => ({
                dir: item.sort,
                column: selectColumns.find(col => col.name === item.field).data,
            })),
            start: currentPage * currentPageSize,
            length: currentPageSize,
            search: {
                value: null,
                regex: false,
            },
        });

        const route = url.indexOf('?') !== -1 ? `${url}&${queryString}` : `${url}?${queryString}`;
        ;
        http.get(route)
            .then(response => {
                const newRows = response.data.data.map(row => {
                    return selectColumns.reduce((obj, col) => {
                        return {
                            ...obj,
                            [col.name]: row[col.data],
                        };
                    }, {});
                });

                setCurrentRows(newRows);
                setCurrentRowCount(response.data.recordsTotal);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    };

    if (serverSide) {
        useEffect(() => {
            loadDataTable();
        }, [
            currentPage,
            currentPageSize,
            currentSortModel,
            currentFilterModel,
            columns,
        ]);
    }

    return (
        <>
            {error && (
                <DefaultErrorAlert error={error} onClose={() => setError(null)}/>
            )}

            <Card>
                <DataGrid
                    {...config}
                    loading={loading}
                    rows={currentRows}
                    rowCount={currentRowCount}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    pageSize={currentPageSize}
                    onPageSizeChange={setCurrentPageSize}
                    sortModel={currentSortModel}
                    onSortModelChange={updateCurrentSortModel}
                    filterModel={currentFilterModel}
                    onFilterModelChange={setCurrentFilterModel}
                />
            </Card>
        </>
    );
}
