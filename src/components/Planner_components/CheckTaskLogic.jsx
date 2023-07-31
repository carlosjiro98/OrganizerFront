import React, { useState } from 'react';
import { CircleRingIcon, CircleFillIcon } from '@fluentui/react-icons-mdl2';


export default function CheckTaskLogic({initial, handleOnCheckChange, item}) {

    const [checked, setChecked] = useState(initial);

    function onCheckedChange() {
        setChecked(!checked);
        handleOnCheckChange(item, !checked);
    }

    return <>
        {checked
            ?
            <CircleFillIcon onClick={() => onCheckedChange()} style={{ height: "1.3rem", color: "#073a4b", cursor:"pointer" }} />
            :
            <CircleRingIcon onClick={() => onCheckedChange()} style={{ height: "1.3rem", color: "#073a4b", cursor:"pointer"  }} />}
    </>
}