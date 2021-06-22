import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { dishType } from "../../../utils/orderUtils";

const DishTypeFields = ({ defaultValues, selectedTypeDish }) => {
	const { control } = useFormContext();

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
									shouldUnregister
									defaultValue={defaultValues.no_of_slices}
									render={({
										field: { value, onChange },
										fieldState: { error },
									}) => (
										<TextField
											value={value ? value : ""}
											onChange={onChange}
											error={Boolean(error?.message)}
											type="number"
											variant="outlined"
											label="Num of slices"
											inputProps={{
												min: 1,
												max: 8,
											}}
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
									shouldUnregister
									defaultValue={defaultValues.diameter}
									render={({
										field: { value, onChange },
										fieldState: { error },
									}) => (
										<TextField
											value={value ? value : ""}
											onChange={onChange}
											error={Boolean(error?.message)}
											type="number"
											variant="outlined"
											label="Pizza diameter"
											inputProps={{
												min: 30,
												max: 60,
												step: "0.1",
											}}
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
								defaultValue={defaultValues.spiciness_scale}
								shouldUnregister
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<TextField
										value={value ? value : ""}
										onChange={onChange}
										error={Boolean(error?.message)}
										type="number"
										variant="outlined"
										label="Spiciness scale"
										inputProps={{
											min: 1,
											max: 10,
										}}
										helperText={
											error?.message ? error.message : "Choose scale 1-10"
										}
									/>
								)}
							/>
						);
					case dishType.sandwich:
						return (
							<Controller
								name="slices_of_bread"
								control={control}
								rules={{
									required: "Minimum 1 slice is required",
									min: { value: 1, message: "Select minimum 1 slice" },
								}}
								defaultValue={defaultValues.slices_of_bread}
								shouldUnregister
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<TextField
										value={value ? value : ""}
										onChange={onChange}
										error={Boolean(error?.message)}
										type="number"
										variant="outlined"
										label="Bread slices"
										inputProps={{
											min: 1,
										}}
										helperText={
											error?.message ? error.message : "Type num of slices"
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
	defaultValues: PropTypes.shape({
		no_of_slices: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		diameter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		spiciness_scale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		slices_of_bread: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
	selectedTypeDish: PropTypes.oneOf([
		dishType.pizza,
		dishType.sandwich,
		dishType.soup,
		"",
	]).isRequired,
};

export default DishTypeFields;
