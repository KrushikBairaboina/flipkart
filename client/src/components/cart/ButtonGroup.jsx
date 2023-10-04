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
    const incQua = () => {
        setCount(count + 1);
    };
    const decQua = () => {
        if (count > 1){
            setCount(count - 1);
        }
        
    };

    return(
        <Component>
            <StyledButton onClick={decQua}>-</StyledButton>
            <Button disabled>{count}</Button>
            <StyledButton onClick={incQua}>+</StyledButton>
        </Component>
    )
}
export default GroupButton;
