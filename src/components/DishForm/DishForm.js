import { useForm, Controller, FormProvider } from "react-hook-form";
import {
	TextField,
	FormControl,
	FormHelperText,
	Select,
	InputLabel,
	MenuItem,
	Button,
} from "@material-ui/core";
import { dishType } from "../../utils/dishUtils";
import DishTypeFields from "./DishTypeFields/DishTypeFields";
import { Form } from "./DishFormStyles";

const defaultValues = {
	name: "",
	preparation_time: "00:00:00",
	type: "",
};

const DishForm = () => {
	const methods = useForm({ defaultValues });
	const { control, handleSubmit, watch } = methods;
	const watchSelectedDish = watch("type");

	const submitData = (data) => {
		console.log(data);
	};
	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(submitData)}>
				<Controller
					name="name"
					control={control}
					rules={{ required: "Please provide dish name" }}
					render={({ field, fieldState: { error } }) => (
						<TextField
							error={Boolean(error?.message)}
							label="Dish name"
							variant="outlined"
							helperText={error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name="preparation_time"
					control={control}
					rules={{ required: "Please provide preparation time" }}
					render={({ field: { value, onChange } }) => (
						<TextField
							label="Preparation time"
							variant="outlined"
							onChange={onChange}
							inputProps={{ type: "time", step: "1", value }}
						/>
					)}
				/>
				<Controller
					name="type"
					control={control}
					rules={{ required: "Please select dish type" }}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<FormControl error={Boolean(error?.message)} variant="filled">
							<InputLabel id="labelSelect">Dish type</InputLabel>
							<Select
								labelId="labelSelect"
								value={value}
								onChange={onChange}
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
				<DishTypeFields selectedTypeDish={watchSelectedDish} />
				<Button variant="contained" color="primary" type="submit">
					Order dish
				</Button>
			</Form>
		</FormProvider>
	);
};

export default DishForm;
