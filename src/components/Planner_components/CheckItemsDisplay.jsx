import { useState, useEffect } from "react";
import CheckTaskLogic from "./CheckTaskLogic";

export default function CheckItemsDisplay ({initialItems, getActualCheckList}) {
    const [items, setItems] =useState(null);
    const [itemTitle, setItemTitle] = useState("");

    //change initial items checklist fromat
    useEffect(() => {
        
        for(const key in initialItems) {
            if(initialItems.hasOwnProperty(key)) {
                delete initialItems[key]["lastModifiedBy"];
                delete initialItems[key]["lastModifiedDateTime"];
                delete initialItems[key]["orderHint"];                    ;
            }
        }
        //console.log(initialItems);
        setItems(initialItems);
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        getActualCheckList(items);
        //console.log(items);
        // eslint-disable-next-line
      }, [items]);

    function handleOnAdd (e) {
        e.preventDefault();
        const newId = Date.now().toString().slice(-5);
        setItems((prevItems) => ({
            ...prevItems,
            [newId]: {
              "@odata.type": "#microsoft.graph.plannerChecklistItem",
              title: itemTitle,
              isChecked: false,
            },
          }));
        setItemTitle("");
    }

    function handleOnCheckChange(itemID, value) {
        setItems((prev) => {
            let x = {...prev}
            x[itemID].isChecked = value;
            return x;
        })
    }

    return (
        <div >

            {/* Mapping items --------------------------------------- */}
            <div className="CheckItemsDisplay_container">
                {items 
                ? 
                Object.keys(items).map(itemID => (

                    <div className="checkList_card" key={itemID}>
                        <CheckTaskLogic handleOnCheckChange={handleOnCheckChange} initial={items[itemID].isChecked} item={itemID}/>
                        <p className="itemName">
                            {items[itemID].title}
                        </p>
                    </div>

                ))
                :
                <div className="checkList_card">
                    <span className="itemName">
                        Add items to the check list ...
                    </span>
                </div>
                }
            </div>

            {/* Input + btn ADD --------------------------------------- */}
            <div className="algo" >
                <input className="createItemInput" type="text" onChange={(e)=> setItemTitle(e.target.value)} value={itemTitle} placeholder='add checklist item' />
                <button  onClick={handleOnAdd}>Add</button>
            </div>

        </div>
    )
}

/*
{
        1: {
            name: "Add items to the check list ...",
            checked: false
        },
        2: {
            name: "Aver si funciona",
            checked: true
        }
    }
*/