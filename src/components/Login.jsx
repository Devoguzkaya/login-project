import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  //email ve password doğrulama regexleri
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Geçerli bir email giriniz.",
      }));
    }
    //validasyon işlemi
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)
          ? ""
          : "Parola en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/success");
    console.log("Form submitted:", form);
  };

  return (
    <div className="main">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && (
            <p
              style={{
                color: "red",
                fontSize: "0.8rem",
                whiteSpace: "normal",
                wordWrap: "break-word",
                maxWidth: "300px",
                maxHeight: "2em",
              }}
            >
              {errors.password}
            </p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="terms">
            <Input
              type="checkbox"
              name="terms"
              id="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <span> I agree to terms of service and privacy policy</span>
          </Label>
        </FormGroup>

        <FormGroup className="text-center p-4">
          <Button
            className="btn"
            color="primary"
            disabled={!form.terms || errors.email || errors.password}
            type="submit"
          >
            Sign In
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}
