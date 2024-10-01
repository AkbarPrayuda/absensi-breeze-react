export const SelectBox = ({
    className = "",
    options = {},
    currentValue = "",
    onChange,
    ...props
}) => {
    return (
        <select
            {...props}
            onChange={onChange}
            defaultValue={currentValue}
            className={
                `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                className
            }
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
