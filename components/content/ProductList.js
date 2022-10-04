import apiService from '../../utils/apiService';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styles from '../../styles/components/content/Products.module.scss'
import Button from '../button';
import constants from '../../utils/constants';

export default function ProductList(props) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [offset, setOffSet] = useState(0);
	const [pageSize, setPageSize] = useState(50);
	const [emailSearchTerm, setEmailSearchTerm] = useState("");

    function formatDataForRows(list) {
        let elements = [];

        list.forEach(el => {
            elements.push({
                'id': el.id,
                'name': el.name,
                'description': el.description,
                'price': el.price,
                'condition': constants.conditionMap[el.condition],
                'status': constants.productStatus[el.statusDetail?.productStatus ?? -1],
                'photos': el.photos
            });    
        });

        setRows(elements);
    }

    function createRequestBodyObj() {
        let obj = {
            'offSet': offset,
            'pageSize': pageSize,
        }

        if (emailSearchTerm != "") {
            obj.userEmail = emailSearchTerm;
        }

        return obj; 
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
                setData(...data, response.data);
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
            {
                name: 'Condition',
                selector: row => row.condition
            },
            {
                name: 'Status',
                selector: row => row.status
            }
        ])
	}, []);

    function inputChange(e, input) {
        setEmailSearchTerm(e.target.value);
    }

    function submitSearch() {
		fetchProducts();	
        fetchProductsListCount();	
    }

    function handleInputKeyDown(e) {
        if (e.key === 'Enter') {
            submitSearch();
        }
    }

    return (
        <div>
            <div className={styles.tableSearch}>
                <label>Email: </label>
                <input 
                    onChange={() => inputChange(event, 'email')}
                    onKeyDown={() => handleInputKeyDown(event)}
                />

                <Button 
                    innerText="Search"
                    type="submit"
                    onClick={submitSearch}
                />
            </div>

            <DataTable
                title="Products"
                progressPending={loading}
                columns={columns}
                data={rows}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                highlightOnHover
                pointerOnHover
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
            />            
        </div>
    )
}

const ExpandedComponent = ({ data }) => 
    <div className={styles.photoRow}>{data.photos.map((photo) => {
        return <img key={photo.id} src={process.env.NEXT_PUBLIC_ASSET_BASE_URL + photo.guid}></img>})}
    </div>