import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Wrapper = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	row-gap: 20px;
`;

export const NotificationWrapper = styled.div`
	margin-top: 20px;
`;

export const StyledButton = styled(Button)`
	align-self: flex-end;
`;
