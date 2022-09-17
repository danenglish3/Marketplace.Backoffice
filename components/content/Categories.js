import styles from '../../styles/components/content/Categories.module.scss'
import React, { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Categories(props) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [secondTeirCategories, setSecondTeirCategories] = useState([]);
    const [thirdTeirCategories, setThirdTeirCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeMain, setActiveMain] = useState(0);
    const [activeSecondary, setActiveSecondary] = useState(0);
    const [chilldMap, setChildMap] = useState([]);

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

        if (type == 'main') {
            setActiveMain(id);
            setSecondTeirCategories(children);
        } else if (type == 'secondary') {
            setActiveSecondary(id);
            setThirdTeirCategories(children);
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

            </div>
        </div>
    )
}

function CategoriesNav(props) {
    let categories = props.categories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

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
