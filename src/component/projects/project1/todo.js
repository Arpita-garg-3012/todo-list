import React, { useEffect, useState } from 'react'

// get the local stroge data

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");
    if (lists) {
        return JSON.parse(lists)
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false);

    const addItem = () => {
        if (!inputData) {
            alert("please write something....")
        } else if (inputData && toggleBtn) {
            setItem(
                item.map((curEle) => {
                    if (curEle.id === isEditItem) {
                        return { ...curEle, name: inputData };
                    }
                    return curEle;
                })
            )
            setInputData([]);
            setIsEditItem();
            setToggleBtn(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItem([...item, myNewInputData]);
            setInputData("");
        }
    };

    // edit item

    const editItem = (index) => {
        const item_todo_edited = item.find((curEle) => {
            return curEle.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleBtn(true);
    }

    // how to Delete item
    const deleteItem = (index) => {
        const updatedItem = item.filter((curEle) => {
            return curEle.id !== index;
        });
        setItem(updatedItem);
    };

    const removeAll = () => {
        setItem([]);
    };

    // adding Local storage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(item))
    }, [item])

    return (
        <>
            <div className="main-div">
                <div className="text-center">
                    <figure>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/000/504/617/small/Education_31-60_663.jpg" alt="This is an Image" />
                        <figcaption className="mt-3 fs-1">Add Your List Here ✌</figcaption>
                    </figure>
                    <div style={{ border: "2px solid black", width: "20%", margin: "auto" }}>
                        {/* window + . */}
                        <input style={{ padding: "10px", border: "none" }} type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="✍ Add Item" />
                        {
                            toggleBtn ? (
                                <i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={addItem}></i>
                            ) : (
                                <i className="fa-solid fa-plus" style={{ cursor: "pointer" }} onClick={addItem}></i>
                            )
                        }
                    </div>
                    {/* Show our items */}
                    {
                        item.map((curEle) => {
                            return <div key={curEle.id} className="mt-4" style={{ border: "2px solid black", backgroundColor: "pink", width: "25%", margin: "auto", textAlign: "left", padding: "4px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <h5>{curEle.name}</h5>
                                <div>
                                    <i style={{ margin: "10px", cursor: "pointer" }} className="fa-solid fa-pen-to-square" onClick={() => editItem(curEle.id)}></i>
                                    <i style={{ cursor: "pointer" }} className="fa-solid fa-trash" onClick={() => deleteItem(curEle.id)}></i>
                                </div>
                            </div>
                        })
                    }
                    <button type="button" className="btn btn-outline-warning mt-4" style={{border: "2px solid black", color: "black"}} onClick={removeAll}>Remove All</button>
                </div>
            </div>
        </>
    )
}

export default Todo

