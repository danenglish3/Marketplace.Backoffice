import styles from '../../styles/components/modals/NewProductModal.module.scss'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import Button from '../button';
import ImageUploading from "react-images-uploading";
import apiService from '../../utils/apiService';
import CategorySelector from '../categorySelector';

export default function NewProductModal(props) {
    let baseNewProductObj = { 'name': '', 'description': '', 'category': -1, 'condition': 0, 'price': -1 };
    const [newProduct, setNewProduct] = useState(baseNewProductObj);
    const [images, setImages] = React.useState([]);
    const [isFreeProduct, setIsFreeProduct] = useState(newProduct.category === 21);
    const [errorFields, setErrorFields] = useState([]);
    const maxNumber = 10;

    const conditionMap = {
        0: 'New',
        1: 'Like new',
        2: 'Used',
        3: 'Well used'
    }

    useEffect(() => {
        console.log(newProduct)
        console.log(images)
    }, [newProduct]);

    function closeModal() {
        
    }

    function handleNewProductFormInput(e, name) {
        let value = e.target.value;
        setNewProduct({...newProduct, [name]: value});
    }

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const categorySelectChange = (id, name) => {
        if (id === 21) {
            setNewProduct({...newProduct, 'price': 0, 'category': id});
        } else {
            setNewProduct({...newProduct, 'category': id});
        }
    }

    function validateForm() {
        let errors = [];

        if (newProduct.name == '') {
            errors.push('name');
        }

        if (newProduct.description == '') {
            errors.push('description');
        }

        if (newProduct.category == -1) {
            errors.push('category');
        }

        if (newProduct.condition < 0 || newProduct.condition > 3 ) {
            errors.push('condition');
        }

        if (!isFreeProduct && newProduct.price <= 0) {
            errors.push('price');
        }

        setErrorFields(errors);

        return errors.length === 0;
    }

    function onSubmit() {
        if (!validateForm()) {
            return;
        }

        const cb = (success, response) => {
            console.log(success)
            console.log(response)
        }

        let fileObj = [];

        images.forEach(image => {
            let newObj = {
                'data_url': image.data_url,
                'name': image.file.name,
                'size': image.file.size,
                'type': image.file.type
            };

            fileObj.push(newObj);
        });

        apiService.products.add(newProduct, fileObj, cb, props.auth.accessToken);
    }

    return (
        <div className={styles.newProductModal}>
            <div className={styles.inner}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faClose} 
                    onClick={() => {props.closeModalCallback()}}
                />
                <div className={styles.innerGroupWrapper}>
                    <div className={styles.inputWrapper}>
                        <div className={`${styles.inputGroup} ${!errorFields.includes('name') ? '' : styles.required}`} >
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                onChange={() => handleNewProductFormInput(event, 'name')} 
                                value={newProduct.name}
                            />
                        </div>
                        <div className={`${styles.inputGroup} ${!errorFields.includes('description') ? '' : styles.required}`} >
                            <label htmlFor='description'>Description</label>
                            <textarea 
                                id='description' 
                                onChange={() => handleNewProductFormInput(event, 'description')} 
                                value={newProduct.description}
                            />
                        </div>
                        <div className={`${styles.inputGroup} ${!errorFields.includes('category') ? '' : styles.required}`} >
                            <label htmlFor='category' style={{marginBottom: 10}}>Category</label>
                            <CategorySelector
                                auth={props.auth}
                                id={'category'}
                                onChange={categorySelectChange}
                            />
                        </div>
                        <div className={`${styles.inputGroup} ${!errorFields.includes('condition') ? '' : styles.required}`} >
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
                        <div className={`${styles.inputGroup} ${!errorFields.includes('price') ? '' : styles.required}`} >
                            <label htmlFor='price'>Price</label>
                            <input 
                                id='price'
                                type={'number'}
                                min={0}
                                onChange={() => handleNewProductFormInput(event, 'price')} 
                                value={newProduct.price}
                                disabled={isFreeProduct}
                            />
                        </div> 
                    </div>
                    <div className={styles.imageUploader}>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg", "jpeg", "png"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                            // write your building UI
                            <div className={styles.imageButtonWrapper}>
                                <div className={styles.mainButtons}>
                                    <button
                                        style={isDragging ? { color: "red" } : null}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Click or Drop here
                                    </button>    
                                    <button onClick={onImageRemoveAll}>Remove all images</button>
                                </div>

                                {imageList.map((image, index) => (
                                    <div key={index} className={styles.imageItem}>
                                        <img src={image.data_url} alt="" width="100" />
                                        <div className={styles.btnWrapper}>
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                    </div>
                </div>
                
                <Button
                    innerText="Submit"
                    type="submit"
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}
