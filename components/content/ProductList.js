import apiService from '../../utils/apiService';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function ProductList(props) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [offset, setOffSet] = useState(0);
	const [pageSize, setPageSize] = useState(50);

    function formatDataForRows(list) {
        let elements = [];

        list.forEach(el => {
            elements.push({
                'id': el.id,
                'name': el.name,
                'description': el.description,
                'price': el.price
            });    
        });

        setRows(elements);
    }

    function createRequestBodyObj() {
        return {
            'offSet': offset,
            'pageSize': pageSize,
            'userId': 18
        }
    }

    const fetchProductsListCount = async () => {
        let cb = function (success, response) {
            if (success) {
                setTotalRows(response.data);
            } else {

            }
        }

        apiService.products.getListLength(cb, createRequestBodyObj(), props.auth.accessToken);
    };

    const fetchProducts = async () => {
        setLoading(true);

        let cb = function (success, response) {
            if (success) {
                formatDataForRows(response.data);
            } else {

            }

            setLoading(false);
        }

        apiService.products.list(cb, createRequestBodyObj(), props.auth.accessToken);
    };

    useEffect(() => {
		fetchProducts();	
        fetchProductsListCount();	

        setColumns([    
            {
                name: 'Name',
                selector: row => row.name,
            },
            {
                name: 'Description',
                selector: row => row.description,
            },
            {
                name: 'Price',
                selector: row => row.price,
            },
        ])
	}, []);

    return (
        <DataTable
            title="Products"
            progressPending={loading}
            columns={columns}
            data={rows}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
        />
    )
}