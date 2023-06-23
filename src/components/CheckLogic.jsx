import React, { useState } from 'react';
import { CheckboxCompositeReversedIcon, CheckboxIcon } from '@fluentui/react-icons-mdl2';
import { updateToDo } from '../helpers/organizerApi';
export default function CheckLogic({ data }) {

    const [checked, setChecked] = useState(data.isComplete);

    function onCheckedChange() {

        setChecked(!checked);
        updateToDo({
            id: data.id,
            name: data.name,
            isComplete: !checked,
        });
        /*console.log(checked);*/
    }

    return <>
        {checked
            ?
            <CheckboxCompositeReversedIcon onClick={() => onCheckedChange()} style={{ height: "2rem", color: "#073a4b" }} />
            :
            <CheckboxIcon onClick={() => onCheckedChange()} style={{ height: "2rem", color: "#073a4b" }} />}
    </>
}