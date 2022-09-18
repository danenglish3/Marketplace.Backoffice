import styles from '../../styles/components/content/Categories.module.scss'
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../button';
import { Input, stringify } from 'postcss';

export default function Categories(props) {
    let baseNewCategoryObj = { 'name': '', 'systemName': '', 'description': '', 'parentId': 0 };

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [secondTeirCategories, setSecondTeirCategories] = useState([]);
    const [thirdTeirCategories, setThirdTeirCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeMain, setActiveMain] = useState(0);
    const [activeSecondary, setActiveSecondary] = useState(0);
    const [chilldMap, setChildMap] = useState([]);
    const [newCategory, setNewCategory] = useState(baseNewCategoryObj);
    const [newCategoryIsShown, setNewCategoryIsShown] = useState(false);
    const [categoriesInTable, setCategoriesInTable] = useState([]);

    useEffect(() => {
        let hasChildrenList = [];
        let cat = [{"id":1,"name":"Electronics","systemName":"Electronics","parent":null},{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null},{"id":5,"name":"Plants","systemName":"Plants","parent":null},{"id":6,"name":"Indoor plants","systemName":"IndoorPlants","parent":{"id":5,"name":"Plants","systemName":"Plants","parent":null}},{"id":7,"name":"Outdoor plants","systemName":"OutdoorPlants","parent":{"id":5,"name":"Plants","systemName":"Plants","parent":null}},{"id":8,"name":"TVs","systemName":"Tvs","parent":{"id":1,"name":"Electronics","systemName":"Electronics","parent":null}},{"id":9,"name":"iPhone","systemName":"Iphone","parent":{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null}},{"id":10,"name":"Samsung","systemName":"Samsung","parent":{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null}}];

        cat.forEach(element => {
            if (element.parent != null) {
                if (!hasChildrenList.includes(element.parent.id)) {
                    hasChildrenList.push(element.parent.id);
                }
            }
        });

        setChildMap(hasChildrenList);
        setCategories(cat);
        setCategoriesInTable(cat.filter(a => {return a.parent == null }));

        // if (loading) {
        //     let cb = function (success, response) {
        //         if (success) {
        //             setCategories(response.data)
        //         }
        //         setLoading(false);
        //     };

        //     apiService.categories.list(cb, props.auth.accessToken);
        // }
    }, []);

    function categorySelection(id, type) {
        let children = categories.filter(a => {return a.parent != null && a.parent.id == id });
        setActiveIndex(id);
        setCategoriesInTable(children);
        
        if (type == 'main') {
            setActiveMain(id);
            setSecondTeirCategories(children);

            if (id === 0) {
                setCategoriesInTable( categories.filter(a => {return a.parent == null}));
            } else {
                setActiveIndex(-1);
            }
        } else if (type == 'secondary') {
            setActiveSecondary(id);
            setThirdTeirCategories(children);

            if (id === -1) {
                setCategoriesInTable( categories.filter(a => {return a.parent != null && a.parent.id == activeMain}));
            }
        }
    }

    function handleSubmit() {
        newCategory.parentId = activeIndex;
        
        console.log(newCategory)
        setNewCategory(baseNewCategoryObj);
    }

    function resetAddNewCategoryForm() {
        setNewCategory(baseNewCategoryObj);
    }

    function handleNewCategoryFormInput(e, param) {
        let value = e.target.value;

        if (param === 'name') {
            let split = value.split(' ');
            let formattedSystemName = '';

            split.forEach((val, index) => {
                if (index == 0) {
                    formattedSystemName += val.charAt(0).toLowerCase() + val.slice(1);
                } else {
                    formattedSystemName += val.charAt(0).toUpperCase() + val.slice(1);
                }
            });

            setNewCategory({...newCategory, ['name']: value, ['systemName']: formattedSystemName});
        } else {
            setNewCategory({...newCategory, ['description']: value});
        }
    }

    return (
        <div className={styles.categories}>
            <CategoriesNav
                classStyle='main'
                onClick={categorySelection} 
                categories={categories.filter(a => {return a.parent == null})}
                ai={activeIndex}
                activeMainIndex={activeMain}
                hasChildMap={chilldMap}
            />
            {secondTeirCategories.length > 0 && <CategoriesNav
                classStyle='secondary'
                onClick={categorySelection} 
                categories={secondTeirCategories}
                ai={activeIndex}
                activeSecondaryIndex={activeMain}
                hasChildMap={chilldMap}
            />}
            <div className={styles.main}>
                <div style={{paddingBottom: 50, display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                        innerText="Delete"
                        type="danger"
                        onClick={() => {console.log('going to remove: ' + activeIndex)}}
                    />
                    <Button 
                        innerText="Add new"
                        type="primary"
                        onClick={() => {setNewCategoryIsShown(!newCategoryIsShown); resetAddNewCategoryForm();}}
                    />
                </div>
                {newCategoryIsShown && <div className={styles.newCategoryForm}>
                    <div className={styles.newCategoryForm__nameRow}>
                        <div className={styles.newCategoryForm__inputGroup}>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                onChange={() => handleNewCategoryFormInput(event, 'name')} 
                                value={newCategory.name}
                            />
                        </div>
                        <div className={styles.newCategoryForm__inputGroup}>
                            <label htmlFor='systemName'>System Name</label>
                            <input 
                                id='systemName' 
                                disabled={true} 
                                value={newCategory.systemName}
                            />
                        </div>                        
                    </div>
                    <div className={styles.newCategoryForm__inputGroup}>
                        <label htmlFor='description'>Description</label>
                        <input 
                            id='description' 
                            onChange={() => handleNewCategoryFormInput(event, 'description')}
                            value={newCategory.description}
                        />
                    </div>
                    <div>
                        <Button 
                            innerText="Submit"
                            type="submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>}
                <div className={styles.categoryTable}>
                    <div className={styles.categoryTable__header}>
                        <span style={{width: '40%'}} className={styles.categoryTable__headerItem}>Name</span>
                        <span style={{width: '45%'}} className={styles.categoryTable__headerItem}>Description</span>
                        <span style={{width: '10%'}} className={styles.categoryTable__headerItem}>Sort Order</span>
                    </div>
                    {categoriesInTable.map((category, index) => {
                        return <div className={styles.categoryTable__row}
                            key={`row-${category.id}`}
                        >
                            <div style={{width: '40%'}} className={styles.categoryTable__rowItem}>{category.name}</div>
                            <div style={{width: '45%'}} className={styles.categoryTable__rowItem}>{category.description}</div>
                            <div style={{width: '10%'}} className={styles.categoryTable__rowItem}>{index}</div>
                            <div style={{width: '5%'}} className={styles.categoryTable__rowItem}><FontAwesomeIcon className={styles.icon} icon={faTrash}/></div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

function CategoriesNav(props) {
    let categories = props.categories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    const typeMap = {
        'main': styles.main,
        'secondary': styles.secondary,
        'third': styles.third
    }

    return (
        <div key={props.activeIndex} className={`${styles.nav}`}>
            <ul>
                {props.classStyle === 'main' && 
                    <li><a onClick={() => props.onClick(0, props.classStyle)} className={props.ai == 0 ? styles.active : ''}>All</a></li>}
                {props.classStyle === 'secondary' && 
                    <li><a onClick={() => props.onClick(-1, props.classStyle)} className={props.ai == -1 ? styles.active : ''}>All</a></li>}
                    {categories.map((item) => {
                        let hasChild = props.hasChildMap.includes(item.id);

                        return <li key={`cat-0-${item.id}`}>
                            <a onClick={() => props.onClick(item.id, props.classStyle)} 
                                className={`${item.id == props.ai || 
                                        props.activeMainIndex != 0 && props.activeMainIndex == item.id ||
                                        props.activeSecondaryIndex != 0 && props.activeSecondaryIndex == item.id
                                        ? styles.active : ''
                                    }`}>
                                <span>{item.name}</span>
                                <FontAwesomeIcon className={styles.icon} icon={hasChild ? faPlus : faMinus}/>
                        </a></li>
                    })}
            </ul>
        </div>
    )
}
