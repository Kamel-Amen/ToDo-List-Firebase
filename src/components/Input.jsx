/* eslint-disable react/prop-types */
// import React from 'react'

const Input = ({
  inputType,
  placeholder,
  styles,
  aos,
  duration,
  delay,
  handleChange,
}) => {
  return (
    <input
      type={inputType}
      id={inputType}
      name={inputType}
      placeholder={placeholder}
      className={styles}
      data-aos={aos}
      data-aos-duration={duration}
      data-aos-delay={delay}
      onChange={handleChange}
      required
    />
  );
};

export default Input;

/*
          <input
            onChange={(e) => setEmail(e.target.value)}
          />

*/
