import { useForm, Controller, FormProvider } from "react-hook-form";
import { useOrder } from "../../hooks/useOrder";
import { API_URL } from "../../services/api";
import {
	dishType,
	formatSeconds,
	parseValuesToNums,
} from "../../utils/orderUtils";
import {
	TextField,
	FormControl,
	FormHelperText,
	Select,
	InputLabel,
	MenuItem,
} from "@material-ui/core";
import DishTypeFields from "./DishTypeFields/DishTypeFields";
import Notification from "../Notification/Notification";
import Loader from "../../components/Loader/Loader";
import {
	Wrapper,
	Form,
	NotificationWrapper,
	StyledButton,
} from "./DishFormStyles";

const defaultConditionalValues = {
	no_of_slices: 6,
	diameter: 32.5,
	spiciness_scale: 5,
	slices_of_bread: 5,
};

const defaultInitValues = {
	name: "",
	preparation_time: "02:00:00",
	type: "",
};

const DishForm = () => {
	const methods = useForm({ defaultValues: defaultInitValues });

	const { sendOrder, setIdleOrder, isOrdering, isSubmittedOrder, orderError } =
		useOrder(API_URL);

	const { control, handleSubmit, watch, reset } = methods;

	const watchSelectedDish = watch("type");

	const submitData = async (data) => {
		const formatedData = parseValuesToNums(
			data,
			Object.keys(defaultConditionalValues),
		);
		await sendOrder(formatedData);
		reset(defaultInitValues);
	};

	return (
		<Wrapper>
			<h2>Order a dish</h2>
			<FormProvider {...methods}>
				<Form onSubmit={handleSubmit(submitData)} noValidate>
					<Controller
						name="name"
						control={control}
						rules={{ required: "Please provide dish name" }}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<TextField
								value={value}
								onChange={onChange}
								error={Boolean(error?.message)}
								label="Dish name"
								variant="outlined"
								helperText={error?.message}
							/>
						)}
					/>
					<Controller
						name="preparation_time"
						control={control}
						rules={{ required: "Please provide preparation time" }}
						render={({ field: { value, onChange } }) => (
							<TextField
								value={value}
								onChange={(e) => {
									const formatedTime = formatSeconds(e.target.value);
									onChange(formatedTime);
								}}
								label="Preparation time"
								variant="outlined"
								inputProps={{ type: "time", step: "1" }}
							/>
						)}
					/>
					<Controller
						name="type"
						control={control}
						rules={{ required: "Please select dish type" }}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<FormControl error={Boolean(error?.message)} variant="filled">
								<InputLabel id="labelSelect">Dish type</InputLabel>
								<Select
									value={value}
									onChange={onChange}
									labelId="labelSelect"
									label="Dish type"
								>
									<MenuItem value={dishType.pizza}>Pizza</MenuItem>
									<MenuItem value={dishType.soup}>Soup</MenuItem>
									<MenuItem value={dishType.sandwich}>Sandwich</MenuItem>
								</Select>
								{error?.message && (
									<FormHelperText>{error.message}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
					<DishTypeFields
						defaultValues={defaultConditionalValues}
						selectedTypeDish={watchSelectedDish}
					/>
					<StyledButton variant="contained" color="primary" type="submit">
						{isOrdering ? <Loader /> : "Send order"}
					</StyledButton>
				</Form>
			</FormProvider>
			{isSubmittedOrder && (
				<NotificationWrapper>
					<Notification
						type={orderError ? "error" : "success"}
						message={orderError ? orderError : "You successfuly ordered a dish"}
						onCloseHandler={setIdleOrder}
					/>
				</NotificationWrapper>
			)}
		</Wrapper>
	);
};

export default DishForm;
