const AmPmToggleSwitch = ({ isAm, onChangeIsAm, name }) => {
  return (
    <ul className="flex flex-col text-xs font-semibold md:flex-row ">
      <li className="h-full">
        <input
          type="radio"
          id={`${name}-am`}
          name={name}
          value="am"
          className="peer hidden"
          defaultChecked={isAm}
          onChange={() => onChangeIsAm(true)}
          required
        />
        <label
          htmlFor={`${name}-am`}
          className="py-auto inline-flex h-full w-full cursor-pointer items-center justify-between border border-gray-200 bg-white px-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-white"
        >
          <div className="select-none">AM</div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id={`${name}-pm`}
          name={name}
          value="pm"
          className="peer hidden"
          defaultChecked={!isAm}
          onChange={() => onChangeIsAm(false)}
        />
        <label
          htmlFor={`${name}-pm`}
          className="py-auto inline-flex h-full w-full cursor-pointer items-center justify-between rounded-br-md border border-gray-200 bg-white px-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-white"
        >
          <div className="select-none">PM</div>
        </label>
      </li>
    </ul>
  );
};

export default AmPmToggleSwitch;
