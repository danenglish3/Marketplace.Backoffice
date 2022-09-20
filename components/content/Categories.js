import styles from '../../styles/components/content/Categories.module.scss'
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
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
    const [isInUpdateState, setIsInUpdateState] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");

    useEffect(() => {
        if (loading) {
            let cb = function (success, response) {
                if (success) {
                    setCategories(response.data);

                    let hasChildrenList = [];

                    response.data.forEach(element => {
                        if (element.parent != null) {
                            if (!hasChildrenList.includes(element.parent.id)) {
                                hasChildrenList.push(element.parent.id);
                            }
                        }
                    });

                    setChildMap(hasChildrenList);
                    setCategoriesInTable(response.data.filter((category) => category.parent == null));
                }
                setLoading(false);
            };

            apiService.categories.list(cb, props.auth.accessToken);
        }

        // let hasChildrenList = [];
        // let cat = [{"id":1,"name":"Electronics","systemName":"Electronics","parent":null},{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null},{"id":5,"name":"Plants","systemName":"Plants","parent":null},{"id":6,"name":"Indoor plants","systemName":"IndoorPlants","parent":{"id":5,"name":"Plants","systemName":"Plants","parent":null}},{"id":7,"name":"Outdoor plants","systemName":"OutdoorPlants","parent":{"id":5,"name":"Plants","systemName":"Plants","parent":null}},{"id":8,"name":"TVs","systemName":"Tvs","parent":{"id":1,"name":"Electronics","systemName":"Electronics","parent":null}},{"id":9,"name":"iPhone","systemName":"Iphone","parent":{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null}},{"id":10,"name":"Samsung","systemName":"Samsung","parent":{"id":4,"name":"Mobile phones","systemName":"MobilePhones","parent":null}}];

        // cat.forEach(element => {
        //     if (element.parent != null) {
        //         if (!hasChildrenList.includes(element.parent.id)) {
        //             hasChildrenList.push(element.parent.id);
        //         }
        //     }
        // });

        // setChildMap(hasChildrenList);
        // setCategories(cat);
        // setCategoriesInTable(cat.filter(a => {return a.parent == null }));
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
                setCategoriesInTable(categories.filter(a => {return a.parent != null && a.parent.id == activeMain}));
            }
        }

        resetAddNewCategoryForm();
        setNewCategoryIsShown(false);
        setIsInUpdateState(false);
    }

    function handleSubmit() {
        newCategory.parentId = activeIndex;
        setNewCategory(baseNewCategoryObj);

        let cb = function (success, response) {
            if (success) {
                if (newCategory.parentId != null) {
                    newCategory.parent = {
                        id: newCategory.parentId
                    }
                }

                newCategory.id = response.id;

                var joined = categories.concat(newCategory);
                setCategories(joined);
            }
        };

        if (newCategory.parentId === -1) {
            newCategory.parentId = activeMain;
        } else if (newCategory.parentId === 0) {
            newCategory.parentId = null;
        }

        apiService.categories.add(newCategory, cb, props.auth.accessToken);
    }

    function handleUpdate() {
        let cb = function (success, response) {
            if (success) {
                var joined = categories.concat(newCategory);
                setCategories(joined);
                setUpdateMessage("Update successful");
            } else {
                setUpdateMessage("Update failed");
            }
        };

        apiService.categories.update(newCategory, cb, props.auth.accessToken);
    }

    function resetAddNewCategoryForm() {
        setNewCategory(baseNewCategoryObj);
    }

    function handleDeleteCategoryClick(id) {
        if (id === 0 || id === -1) {
            return;
        }
        
        let hasNoChildren = categories.find((el, index) => el.parent != null && el.parent.id === id) == null;

        if (hasNoChildren) {
            let confirm = window.confirm("Are you sure you want to remove this?");

            if (confirm) {
                let cb = function (success, data) {
                    if (success) {
                        setCategories((state) => state.filter((category) => category.id != id));
                        setCategoriesInTable((state) => state.filter((category) => category.id != id));
                        setSecondTeirCategories((state) => state.filter((category) => category.id != id));
                    }
                };

                apiService.categories.remove(id, cb, props.auth.accessToken);
            } else {
                console.log("not deleting: " + id);
            }
        } else {
            alert("Cant delete category which still has children")
        }
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

    function handleUpdateCategoryClick(id) {
        setIsInUpdateState(true);
        resetAddNewCategoryForm();
        setNewCategoryIsShown(true);

        let category = categories.find((el) => {return el.id == id});

        setNewCategory({...newCategory, 
            ['name']: category.name, 
            ['systemName']: category.systemName,
            ['id']: id,
            ['description']: category.description ?? '',
            ['parentId']: category.parent == null ? null : category.parent.id
        });
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
                    {isInUpdateState && <Button 
                        innerText="Cancel"
                        type="primary"
                        onClick={() => {setNewCategoryIsShown(false); resetAddNewCategoryForm();}}
                    />}

                    <Button 
                        innerText="Add new"
                        type="primary"
                        disabled={isInUpdateState}
                        onClick={() => {if (isInUpdateState) return; setNewCategoryIsShown(!newCategoryIsShown); resetAddNewCategoryForm();}}
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
                            innerText={`${isInUpdateState ? "Update" : "Submit"}`}
                            type="submit"
                            onClick={isInUpdateState ? handleUpdate : handleSubmit}
                        />
                        {updateMessage != "" && <p className={styles.updateMessage}>{updateMessage}</p>}
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
                            <div style={{width: '5%', display: 'flex', gridGap: 15}} className={styles.categoryTable__rowItem}>
                                <FontAwesomeIcon className={styles.faSquare} icon={faPenToSquare} 
                                        onClick={() => {handleUpdateCategoryClick(category.id)}}
                                    />
                                <FontAwesomeIcon className={styles.faTrash} icon={faTrash} 
                                    onClick={() => {handleDeleteCategoryClick(category.id)}}
                                />
                            </div>
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
