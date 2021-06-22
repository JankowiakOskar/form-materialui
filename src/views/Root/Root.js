import DishForm from "../../components/DishForm/DishForm";
import { Wrapper } from "./RootStyles";

const Root = () => {
	return (
		<div className="App">
			<Wrapper>
				<DishForm />
			</Wrapper>
		</div>
	);
};

export default Root;
