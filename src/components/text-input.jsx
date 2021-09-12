import PropTypes from "prop-types";


export const TextInput = ({type = "text", onChangeValue, ...rest}) => {
    return (
        <input
        type={type}
        {...rest}
        onChange={onChangeValue}
        />
    )
}

TextInput.propType = {
    onChangeValue: PropTypes.func,
}