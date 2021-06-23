import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Wrapper = styled.div`
	width: 300px;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;

	& > div {
		margin: 14px 0;
	}
`;

export const NotificationWrapper = styled.div`
	margin: 20px 0 0;
`;

export const StyledButton = styled(Button)`
	&& {
		margin: 10px 0 0 0;
		align-self: flex-end;
	}
`;
