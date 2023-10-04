
import {Button,ButtonGroup,styled } from "@mui/material"
import { useState } from "react";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;
const StyledButton = styled(Button)`
    border-radius: 50%;
`;
const GroupButton = () => {
    const [ count, setCount ] = useState(1);
    const incQuantity = () => {
        setCount(count + 1);
    };
    const decQuantity = () => {
        if (count > 1){
            setCount(count - 1);
        }
        
    };

    return(
        <Component>
            <StyledButton onClick={decQuantity}>-</StyledButton>
            <Button disabled>{count}</Button>
            <StyledButton onClick={incQuantity}>+</StyledButton>
        </Component>
    )
}
export default GroupButton;