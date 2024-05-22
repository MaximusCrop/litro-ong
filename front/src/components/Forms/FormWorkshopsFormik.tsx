import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import Swal from 'sweetalert2'
import { postWorkshops } from "../../helpers/Workshops/postWorkshops";
interface IFormValues {
  name: string;
  teacher: string;
  teacherPhone: string;
  photo: File | null;
  timeStart: string;
  duration: string;
  dateEnd: string;
  dateStart: string;
  cost: string;
  days: string[];
  description: string;
}


const initialValues: IFormValues = {
  name: "",
  teacher: "",
  teacherPhone: "",
  photo: null,
  timeStart: "",
  duration: "",
  dateEnd: "",
  dateStart: "",
  cost: "",
  days: [""],
  description: "",
}


const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};

  const trimmedDescription = values.description.trim()

  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (values.name.length < 4) {
    errors.name = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.name.length > 30) {
    errors.name = "El nombre debe tener máximo 30 caracteres";
  }

  if (!values.teacher) {
    errors.teacher = "El nombre es requerido";
  } else if (values.teacher.length < 4) {
    errors.teacher = "El nombre debe tener mínimo 4 caracteres";
  } else if (values.teacher.length > 30) {
    errors.teacher = "El nombre debe tener máximo 30 caracteres";
  }

  if (!values.teacherPhone) {
    errors.teacherPhone = "El número de teléfono es requerido";
  } else if (isNaN(Number(values.teacherPhone))) {
    errors.teacherPhone = "El número de teléfono debe ser un valor numérico";
  } else if (values.teacherPhone.toString().length !== 10) {
    errors.teacherPhone = "El número de teléfono debe tener 10 dígitos";
  }

 /* if (!values.photo) {
    errors.photo  = "La imagen es requerida";
  } else if (
    values.photo &&
    values.photo.type &&
    !values.photo.type.startsWith("image/")
  ) {
    errors.photo = "La imagen debe ser un archivo de imagen";
  }
  */

  if (!values.timeStart) {
    errors.timeStart = "El horario de inicio es requerido";
  }
  if (!values.duration) {
      errors.duration = "La duración es requerida";
  }
  if (!values.dateEnd) {
        errors.dateEnd = "La fecha de finalización es requerida";
  }
  if (!values.dateStart) {
    errors.dateStart = "La fecha de inicio es requerida";
  }
  if (!values.cost) {
    errors.cost = "El costo es requerido";
  }
  if (!values.days) {
    errors.days = "Los días de la semana son requeridos";
  }

  if (!trimmedDescription) {
    errors.description = "La descripción es requerida";
  } else if (trimmedDescription.length < 100) {
    errors.description = "La descripción debe tener mínimo 100 caracteres";
  } else if (trimmedDescription.length > 800) {
    errors.description = "La descripción debe tener máximo 800 caracteres";
  }

  return errors;
};

const FormWorkshopsFormik = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
      console.log(values);
      postWorkshops(values)
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se agrego correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            //window.location.href = '/dashboardAdmin/workshops';
        }, 1500);
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    }}
  >
    {({ errors, touched, setFieldValue }) => (
      <Form className="text-sm text-textParagraph ">
        <div className="flex flex-col h-20">
          <label htmlFor="name" className="font-medium ">
            Nombre
          </label>
          <div className="flex w-full">
            <Field 
              type="text"
              name="name"
              placeholder="Nombre del taller"
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
          <ErrorMessage
            name="name"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20">
          <label htmlFor="teacher" className="font-medium my-2">
            Profesor/a
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="teacher"
              placeholder="Nombre del Profesor/a"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.teacher && touched.teacher
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.teacher && touched.teacher
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.teacher && touched.teacher ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="teacher"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="teacherPhone" className="font-medium my-2">
            Numero telefonico profesor/a
          </label>
          <div className="flex w-full">
            <Field
              type="number"
              name="teacherPhone"
              placeholder="Ejemplo: 1234567890"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.teacherPhone && touched.teacherPhone
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.teacherPhone && touched.teacherPhone
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.teacherPhone && touched.teacherPhone ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="teacherPhone"
            component="span"
            className="text-warning"
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20">
          <label htmlFor="timeStart" className="font-medium my-2">
            Horario de inicio
          </label>
          <div className="flex w-full">
            <Field
              type="time"
              name="timeStart"
              placeholder="HH:MM"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.timeStart && touched.timeStart
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.timeStart && touched.timeStart
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.timeStart && touched.timeStart ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="timeStart"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="duration" className="font-medium my-2">
            Duración
          </label>
          <div className="flex w-full">
            <Field
              type="text"
              name="duration"
              placeholder="Duracion del taller"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.duration && touched.duration
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.duration && touched.duration
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.duration && touched.duration ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="duration"
            component="span"
            className="text-warning"
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20">
          <label htmlFor="dateStart" className="font-medium my-2">
            Fecha de inicio
          </label>
          <div className="flex w-full">
            <Field
              type="date"
              name="dateStart"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.dateStart && touched.dateStart
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.dateStart && touched.dateStart
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.dateStart && touched.dateStart ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="dateStart"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="dateEnd" className="font-medium my-2">
            Fecha de finalización
          </label>
          <div className="flex w-full">
            <Field
              type="date"
              name="dateEnd"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.dateEnd && touched.dateEnd
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.dateEnd && touched.dateEnd
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.timeStart && touched.timeStart ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="dateEnd"
            component="span"
            className="text-warning"
          />
        </div>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col h-20">
          <label htmlFor="cost" className="font-medium my-2">
            Costo del taller
          </label>
          <div className="flex w-full">
            <Field
              type="number"
              name="cost"
              placeholder="Costo del taller"
              className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.cost && touched.cost
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.cost && touched.cost
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.cost && touched.cost ? "block" : "hidden"
                }`}
              />
            </div>
            <p>Pesos Argentinos</p>
          </div>
          <ErrorMessage
            name="cost"
            component="span"
            className="text-warning"
          />
        </div>
        <div className="flex flex-col h-20">
          <label htmlFor="days" className="font-medium my-2">
            Dias de la semana
          </label>
          <div className="flex w-full" role="group" aria-labelledby="checkbox-group">
          <label>
            <Field type="checkbox" name="days" value="Lunes"/>
            Lunes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Martes"/>
            Martes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Miercoles"/>
            Miercoles
          </label>
          <label>
            <Field type="checkbox" name="days" value="Jueves"/>
            Jueves
          </label>
          <label>
            <Field type="checkbox" name="days" value="Viernes"/>
            Viernes
          </label>
          <label>
            <Field type="checkbox" name="days" value="Sabado"/>
            Sabado
          </label>
          <label>
            <Field type="checkbox" name="days" value="Domingo"/>
            Domingo
          </label>  
          </div>
        </div>
        </div>
        {/*<div className="flex flex-col h-20 my-2">
          <label htmlFor="photo" className="font-medium my-2">
            Foto Principal
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="rounded-md border-backgroundGrey  bg-white border placeholder:text-textParagraph px-3 py-2 focus-visible:outline focus-visible:text-textTertiary"
            onChange={(event) =>
              setFieldValue(
                "photo ",
                event.currentTarget.files ? event.currentTarget.files[0] : null
              )
            }
          />
          <ErrorMessage
            name="photo"
            component="span"
            className="text-warning"
          />
          </div>*/}

        <div className=" flex flex-row gap-10">
        <div className="flex flex-col h-32  w-2/3">
          <label htmlFor="description" className="font-medium my-2">
            Descripción
          </label>
          <div className="flex w-full">
            <Field
              as="textarea"
              name="description"
              placeholder="Describe la noticia"
              className={`w-full resize-none h-20 rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                errors.description && touched.description
                  ? "border-warningBorder text-warningText font-medium"
                  : ""
              }`}
            />
            <div
              className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                errors.description && touched.description
                  ? "border-warningBorder text-warningText font-medium "
                  : ""
              }`}
            >
              <img
                src={warningIcon.src}
                alt="warningIcon"
                className={`${
                  errors.description && touched.description ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          <ErrorMessage
            name="description"
            component="span"
            className="text-warning"
          />
        </div>
        <div className=" w-1/3 flex flex-row items-center  justify-end">
          <a
            href="/dashboardAdmin/news"
            className="bg-secondary text-textSecondary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap mx-6"
          >
            Volver
          </a>
          <button
            type="submit"
            className="bg-tertiary text-textPrimary px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
            disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0}
          >
            Agregar
          </button>
        </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default FormWorkshopsFormik;
