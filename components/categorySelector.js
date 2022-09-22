import apiService from '../utils/apiService';
import React, { useState, useEffect } from 'react';
import styles from '../styles/components/CategorySelector.module.scss';

export default function CategorySelector(props) {
    const [categories, setCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryInputVal, setCategoryInputVal] = useState("");

    useEffect(() => {
        let cb = function (success, response) {
            if (success) {
                let categoryMap = [];

                // Top level categories
                response.data.filter((cat) => cat.parent == null).forEach(el => {
                    categoryMap.push({'name': el.name, 'id': el.id, 'children': []});
                });

                // Secondary level categories
                response.data.filter((cat) => cat.parent != null && cat.parent.parent == null).forEach(el => {
                    let parent = categoryMap.find((existing) => {return existing.id == el.parent.id});
                    parent.children.push({'name': el.name, 'id': el.id, 'children': []});
                });

                // Third level categories
                response.data.filter((cat) => cat.parent != null && cat.parent.parent != null).forEach(el => {
                    let topParent = categoryMap.find((existing) => {return existing.id == el.parent.parent.id});
                    let parent = topParent.children.find((parent) => {return parent.id == el.parent.id});
                    parent.children.push({'name': el.name, 'id': el.id});
                });

                setCategories(categoryMap);
                console.log(categoryMap)
            }    
        };

        apiService.categories.list(cb, props.auth.accessToken);
    }, []);

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    function handleSelect(id, name) {
        setCategoryInputVal(name);
        toggleDropdown();
    }

    return (
        <div className={styles.categorySelector}>
            <div className={styles.categorySelectorInput} onClick={() => {toggleDropdown()}}>{categoryInputVal}</div>
            {showDropdown && <div className={styles.categorySelectorDropdown}>
                {categories.map((item) => {
                    if (item.children.length > 0) {
                        return <div key={`cat-row-nest-wrap-${item.id}`} >
                            <div key={`cat-row-${item.id}`} className={styles.categoryHeader}><div>{item.name}</div></div>
                            <div key={`cat-row-nest-${item.id}`}  style={{paddingLeft: 10}}>
                                <NestedCategories 
                                    categories={item.children}
                                    handleSelect={handleSelect}
                                />
                            </div>
                        </div>
                    } else {
                        return <a onClick={() => handleSelect(item.id, item.name)} key={`cat-row-${item.id}`} className={styles.categoryItem}><div>{item.name}</div></a>
                    }
                })}
            </div>}
        </div>
    )
}

function NestedCategories(props) {
    return (
        <div>
            {props.categories.map((item) => {
                if (item.children != null && item.children.length > 0) {
                    return <div key={`cat-row-nest-wrap-${item.id}`}>
                        <div key={`cat-row-${item.id}`} className={styles.categoryHeader}><div>{item.name}</div></div>
                        <div key={`cat-row-nest-${item.id}`} style={{paddingLeft: 20}}>
                            <NestedCategories 
                                categories={item.children}
                                handleSelect={props.handleSelect}
                            />
                        </div>
                    </div>
                } else {
                    return <a onClick={() => props.handleSelect(item.id, item.name)} key={`cat-row-${item.id}`} className={styles.categoryItem}><div>{item.name}</div></a>
                }
            })}
        </div>
    )
}