import React, { useState, useContext } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";

export const Form = () => {
  interface Form {
    login: string;
    email: string;
    password: string | number;
    number: number;
  }

  const personInfo = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState<Form[]>([
    {
      login: "",
      email: "",
      password: "",
      number: 1,
    },
  ]);

  const reg = /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i;

  const validate = (form: Form, checked: boolean) => {
    if (!form.email) {
      return "adres e-mail jest wymagany";
    } else if (reg.test(form.email)) {
      return "nieprawidłowy format adresu e-mail";
    } else if (form.number < 9) {
      return "nieprawidłowy numer telefonu";
    } else if (checked === false) {
      return "wymagana akceptacja regulaminu";
    }

    return null;
  };

  console.log(form);

  const info = personInfo.map((info) => [
    info.name,
    info.vehicles,
    info.created,
  ]);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const error = validate(form, checked);

    try {
      await fetch("https://example/.", {
        method: "POST",
        body: JSON.stringify([form, info]),
      });
      console.log("sended");
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      <div className='form-header'>
        <button className='main-page'>
          <Link to='/' className='link-form'>
            Strona Głowna
          </Link>
        </button>
        <p>formularz rejestracyjny</p>
        <div className='line'></div>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <span>Login:</span>
        <input
          type='text'
          className='input'
          name='login'
          onChange={updateForm}
        />
        <span>Password:</span>
        <input
          type='password'
          className='input'
          name='password'
          required
          onChange={updateForm}
        />
        <span>E-mail:</span>
        <input
          type='email'
          className='input'
          name='email'
          required
          onChange={updateForm}
        />
        <span>Numer Telefonu:</span>
        <input
          type='tel'
          className='input'
          name='number'
          required
          onChange={updateForm}
        />
        <div className='checkbox'>
          <input
            type='checkbox'
            name='checkbox'
            id='checkbox'
            required
            checked={checked}
            onChange={updateCheckbox}
          />
          <label htmlFor='checkbox'>akceptuje regulamin</label>
        </div>
        <input type='submit' value='Zapisz' className='submit' />
      </form>
    </div>
  );
};
