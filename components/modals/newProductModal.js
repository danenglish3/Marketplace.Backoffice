import styles from '../../styles/components/modals/NewProductModal.module.scss'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import Button from '../button';
import ImageUploading from "react-images-uploading";
import apiService from '../../utils/apiService';
import CategorySelector from '../categorySelector';

export default function NewProductModal(props) {
    let baseNewProductObj = { 'title': '', 'description': '', 'condition': -1, 'price': -1 };
    const [newProduct, setNewProduct] = useState({});
    const [images, setImages] = React.useState([]);
    const maxNumber = 10;

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

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    function onSubmit() {
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
                            <label htmlFor='category' style={{marginBottom: 10}}>Category</label>
                            <CategorySelector
                                auth={props.auth}
                                id={'category'}
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
                    </div>
                    <div className={styles.imageUploader}>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
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
