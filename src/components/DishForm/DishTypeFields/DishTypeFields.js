import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { dishType } from "../../../utils/dishUtils";

const DishTypeFields = ({ selectedTypeDish }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	console.log(errors);
	return (
		<>
			{(() => {
				switch (selectedTypeDish) {
					case dishType.pizza:
						return (
							<>
								<Controller
									name="no_of_slices"
									control={control}
									rules={{
										required: "Provide num of slices",
										min: { value: 1, message: "Select minimum 1 slice" },
										max: { value: 8, message: "Max num of slices is 8" },
									}}
									defaultValue={6}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											error={Boolean(error?.message)}
											type="number"
											variant="outlined"
											label="Num of slices"
											inputProps={{ min: 0 }}
											helperText={error?.message ? error.message : "1-8"}
										/>
									)}
								/>
								<Controller
									name="diameter"
									control={control}
									rules={{
										required: "Type diameter of your pizza",
										min: {
											value: 30,
											message: "Your selected size is to small",
										},
										max: {
											value: 60,
											message: `We can't prepare as big pizza`,
										},
									}}
									defaultValue={30}
									render={({ field, fieldState: { error } }) => (
										<TextField
											{...field}
											error={Boolean(error?.message)}
											type="number"
											variant="outlined"
											label="Pizza diameter"
											helperText={
												error?.message
													? error?.message
													: "Available diameters 30-60"
											}
										/>
									)}
								/>
							</>
						);
					case dishType.soup:
						return (
							<Controller
								name="spiciness_scale"
								control={control}
								rules={{
									required: "Select scale from 1 to 10",
									min: { value: 1, message: "Our scale starts from 1" },
									max: { value: 10, message: "Max soup spiciness scale is 10" },
								}}
								defaultValue={1}
								render={({ field, fieldState: { error } }) => (
									<TextField
										{...field}
										error={Boolean(error?.message)}
										type="number"
										variant="outlined"
										label="Spiciness scale"
										inputProps={{ min: 1, max: 10 }}
										helperText={
											error?.message ? error.message : "Choose scale 1-10"
										}
									/>
								)}
							/>
						);
					default:
						return null;
				}
			})()}
		</>
	);
};

DishTypeFields.propTypes = {
	selectedTypeDish: PropTypes.oneOf([
		dishType.pizza,
		dishType.sandwich,
		dishType.soup,
		"",
	]),
};

export default DishTypeFields;
