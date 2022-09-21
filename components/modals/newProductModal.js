import styles from '../../styles/components/modals/NewProductModal.module.scss'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import Button from '../button';

export default function NewProductModal(props) {
    let baseNewProductObj = { 'title': '', 'description': '', 'condition': -1, 'price': -1 };
    const [newProduct, setNewProduct] = useState({});

    let conditionMap = {
        0: 'New',
        1: 'Like new',
        2: 'Used',
        3: 'Well used'
    }

    useEffect(() => {
        console.log(newProduct)
    }, [newProduct]);

    function handleNewProductFormInput(e, name) {
        let value = e.target.value;
        setNewProduct({...newProduct, [name]: value});
    }

    return (
        <div className={styles.newProductModal}>
            <div className={styles.inner}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faClose} 
                    onClick={() => {props.closeModalCallback()}}
                />
                
                <div className={styles.inputGroup}>
                    <label htmlFor='title'>Title</label>
                    <input 
                        id='title' 
                        onChange={() => handleNewProductFormInput(event, 'name')} 
                        value={newProduct.name}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        id='description' 
                        onChange={() => handleNewProductFormInput(event, 'description')} 
                        value={newProduct.description}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='condition'>Condition</label>
                    <select 
                        id='condition' 
                        onChange={() => handleNewProductFormInput(event, 'condition')} 
                        value={newProduct.condition}
                    >
                        <option value={0}>{conditionMap[0]}</option>
                        <option value={1}>{conditionMap[1]}</option>
                        <option value={2}>{conditionMap[2]}</option>
                        <option value={3}>{conditionMap[3]}</option>
                    </select>
                </div>                
                <div className={styles.inputGroup}>
                    <label htmlFor='price'>Price</label>
                    <input 
                        id='price'
                        type={'number'}
                        min={0}
                        onChange={() => handleNewProductFormInput(event, 'price')} 
                        value={newProduct.price}
                    />
                </div>
                <Button
                    innerText="Submit"
                    type="submit"
                />
            </div>
        </div>
    )
}