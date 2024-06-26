import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { useState } from "react";


interface IFormValues {
  name: string;
  lastname: string;
  phone: string;
  birthDate: string;
  dni: string;
  address: string;
  country: string;
  province: string;
  isSubscribed:boolean;
}

const initialValues = {
  name: "",
  lastname: "",
  phone: "",
  birthDate: "",
  dni: "",
  address: "",
  country: "",
  province: "",
  isSubscribed: false,
  checked: [],
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  } else if (values.name.length > 50) {
    errors.name = "El nombre debe tener como máximo 50 caracteres";
  }

  if (!values.lastname) {
    errors.lastname = "El apellido es requerido";
  } else if (values.lastname.length < 2) {
    errors.lastname = "El apellido debe tener al menos 2 caracteres";
  } else if (values.lastname.length > 50) {
    errors.lastname = "El apellido debe tener como máximo 50 caracteres";
  }

  if (!values.phone) {
    errors.phone = "El número de teléfono es requerido";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "El número de teléfono debe ser un valor numérico";
  }

  if (!values.birthDate) {
    errors.birthDate = "La fecha de nacimiento es requerida";
  } else {
    const today = new Date();
    const birthDate = new Date(values.birthDate);
    
    if (birthDate > today) {
      errors.birthDate = "La fecha de nacimiento no puede ser posterior a la fecha actual";
    } else {
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      if (age >= 100) {
        errors.birthDate = "Debes tener menos de 100 años para registrarte";
      }
    }
  }

  if (!values.dni) {
    errors.dni = "El número de documento es requerido";
  } else if (isNaN(Number(values.dni))) {
    errors.dni = "El número de documento debe ser un valor numérico";
  } else if (values.dni.toString().length !== 8) {
    errors.dni = "El número de documento debe tener 8 dígitos";
  }

  if (!values.address) {
    errors.address = "La dirección es requerida";
  }

  if (!values.country) {
    errors.country = "El país es requerido";
  }

  if (values.country === "Argentina" && !values.province) {
    errors.province = "La provincia es requerida";
  }

  return errors;
};

const FormRegisterProfileFormik = () => {
  const [country, setCountry] = useState(initialValues.country);
  const [province, setProvince] = useState(initialValues.province);
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        const combinedValues = {
          ...values,
          fullName: `${values.name} ${values.lastname}`,
          fullAddress: `${values.address} ${values.country} ${values.province}`,
        };
        localStorage.setItem(
          "registerUserProfile",
          JSON.stringify(combinedValues)
        );
        setSubmitting(false);
        window.location.href = "/auth/register/resume";
      }}
    >
      {({ errors, touched, setFieldValue, values}) => (
        <Form className="text-sm text-textParagraph flex flex-col justify-center h-5/6">
          <div className="flex flex-row justify-between w-full ">
            <div className="flex flex-col w-full pr-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Nombre
              </label>
              <div className="flex w-full">
                <Field
                  type="text"
                  name="name"
                  placeholder="Ingrese su nombre"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.name && touched.name
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.name && touched.name
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.name && touched.name ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
                <ErrorMessage
                  name="name"
                  component="span"
                />
              </div>
            </div>
            <div className="flex flex-col w-full pl-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Apellido
              </label>
              <div className="flex w-full">
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Ingrese su apellidos"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.lastname && touched.lastname
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.lastname && touched.lastname
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.lastname && touched.lastname ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
              <ErrorMessage
                name="lastname"
                component="span"
              />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-full pr-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Número telefónicos
              </label>
              <div className="flex w-full">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Ingrese numero telefonico"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.phone && touched.phone
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.phone && touched.phone
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.phone && touched.phone ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
              <ErrorMessage
                name="phone"
                component="span"
              />
              </div>
            </div>
            <div className="flex flex-col w-full pl-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Fecha de Nacimiento
              </label>
              <div className="flex w-full">
                <Field
                  type="date"
                  name="birthDate"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.birthDate && touched.birthDate
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.birthDate && touched.birthDate
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.birthDate && touched.birthDate ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
              <ErrorMessage
                name="birthDate"
                component="span"
              />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">
              Numero de documento
            </label>
            <div className="flex w-full">
              <Field
                type="text"
                name="dni"
                placeholder="Ingrese su numero de documento"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.dni && touched.dni
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.dni && touched.dni
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.dni && touched.dni ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-4 text-warning">
              <ErrorMessage
                name="dni"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-medium my-2 ">
              Domicilio
            </label>
            <div className="flex w-full">
              <Field
                type="text"
                name="address"
                placeholder="Ingrese su domicilio"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.address && touched.address
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.address && touched.address
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.address && touched.address ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-4 text-warning">
              <ErrorMessage
                name="address"
                component="span"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-full pr-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Pais
              </label>
              <div className="flex w-full">
                <Field
                  as="select"
                  name="country"
                  placeholder="Selecciona país"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                    errors.country && touched.country
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                  onChange={(e: any) => {
                    setFieldValue("country", e.target.value);
                    setCountry(e.target.value);
                  }}
                >
                  <option value="">Selecciona país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Otros paises">Otros paises</option>
                </Field>
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.country && touched.country
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.country && touched.country ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
                <ErrorMessage
                  name="country"
                  component="span"
                />
              </div>
            </div>
            <div className="flex flex-col w-full pl-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Provincia
              </label>
              <div className="flex w-full">
                <Field
                  as="select"
                  name="province"
                  placeholder="Selecciona país"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                    errors.province && touched.province
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                  disabled={country !== "Argentina"}
                  onChange={(e: any) => {
                    setFieldValue("province", e.target.value);
                    setProvince(e.target.value);
                  }}
                >
                  <option value="">Selecciona tu provincia</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Catamarca">Catamarca</option>
                  <option value="Chaco">Chaco</option>
                  <option value="Chubut">Chubut</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Corrientes">Corrientes</option>
                  <option value="Entre Ríos">Entre Ríos</option>
                  <option value="Formosa">Formosa</option>
                  <option value="Jujuy">Jujuy</option>
                  <option value="La Pampa">La Pampa</option>
                  <option value="La Rioja">La Rioja</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Misiones">Misiones</option>
                  <option value="Neuquén">Neuquén</option>
                  <option value="Río Negro">Río Negro</option>
                  <option value="Salta">Salta</option>
                  <option value="San Juan">San Juan</option>
                  <option value="San Luis">San Luis</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Santiago del Estero">
                    Santiago del Estero
                  </option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucumán">Tucumán</option>
                </Field>
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.province && touched.province
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={warningIcon.src}
                    alt="warningIcon"
                    className={`${
                      errors.province && touched.province ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
                <ErrorMessage
                  name="province"
                  component="span"
                />
              </div>
            </div>
          </div>
              <div className="flex flex-col w-full">
                <label htmlFor="isSubscribed" className="font-medium my-2 ">
                <div className="flex w-full items-center">
                <Field
                type="checkbox"
                name="isSubscribed"
                className={`mt-4 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none ${
                  errors.isSubscribed && touched.isSubscribed ? 'border-warningBorder text-warningText font-medium' : ''
                }`}
              />
                <div className="ml-10 mt-4">
                  Registrarse al newslatter
                </div>
                </div>
                </label>
                <div className="h-4 text-warning">
                <ErrorMessage name="isSubscribed" component="span" />
                </div>
            </div>
          <div className="  absolute bottom-14 right-20 w-full flex justify-end ">
            <a
              href="/auth/register"
              className="bg-secondary transition-all text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6"
            >
              Anterior
            </a>
            <button
              type="submit"
              className="bg-primary transition-all text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
              disabled={
                Object.keys(errors).length !== 0 ||
                Object.keys(touched).length === 0
              }
            >
              Siguiente
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormRegisterProfileFormik;
