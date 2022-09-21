import styles from '../../styles/components/content/Products.module.scss'

import Button from '../button'
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';
import NewProductModal from '../modals/newProductModal';

export default function Products(props) {
    const [newProductModalVisible, setNewProductModalVisible] = useState(false);

    function toggleNewProductModal() {
        setNewProductModalVisible(!newProductModalVisible);
    }

    function closeModalCallback() {
        setNewProductModalVisible(false);
    }

    return (
        <div className={styles.products}>
            Products
            <Button
                innerText="Add new"
                type="primary"
                onClick={() => toggleNewProductModal()}
            />

            {newProductModalVisible && <NewProductModal 
                closeModalCallback={closeModalCallback}
            />}
        </div>
    )
}