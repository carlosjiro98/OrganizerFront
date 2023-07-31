import React, { useState } from 'react';
import { CircleRingIcon, CircleFillIcon } from '@fluentui/react-icons-mdl2';


export default function CheckTaskLogicCard({initial, setCheckTaskStatus}) {

    const [checked, setChecked] = useState(initial);

    function onCheckedChange() {
       // console.log(checked);
        setChecked(!checked);
        setCheckTaskStatus(!checked ? 100 : 0);
    }

    return <>
        {checked
            ?
            <CircleFillIcon onClick={() => onCheckedChange()} style={{ height: "1.3rem", color: "#073a4b", cursor:"pointer" }} />
            :
            <CircleRingIcon onClick={() => onCheckedChange()} style={{ height: "1.3rem", color: "#073a4b", cursor:"pointer"  }} />}
    </>
}