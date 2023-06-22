import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function FormStep(title: string, message: string) {
    const navigate = useNavigate();

    const saveData = () => {
        localStorage.setItem("name", formik.values.name);
        localStorage.setItem("email", formik.values.email);
        localStorage.setItem("phone", formik.values.phone);
    }

    useEffect(() => {
        formik.setFieldValue('name', localStorage.getItem('name') ?? '');
        formik.setFieldValue('email', localStorage.getItem('email') ?? '');
        formik.setFieldValue('phone', localStorage.getItem('phone') ?? '');
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("This field is required").max(30, "Too long").matches(/^[A-Za-z '-]+$/, "Only characters"),
            email: Yup.string().required("This field is required").email("Invalid email"),
            phone: Yup.string().required("This field is required").matches(/^\+(?:[0-9] ?){6,14}[0-9]$|^[0-9]{3} [0-9]{3} [0-9]{3}$/, 'Invalid phone number')
        }),

        onSubmit: () => {
            saveData();
            navigate("/2");
        },
    });

    return <form onSubmit={formik.handleSubmit}>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className={"input-field"}>
            <div className="title-error">
                <label htmlFor="name">Name</label>
                <p className="error-msg">{formik.touched.name ? formik.errors.name : ""}</p>
            </div>
            <input
                className={`${formik.touched.name && (formik.errors.name || !formik.values.name) ? "border-red" : ""}`}
                id="name" name="name" type="text" placeholder="e.g. Stephen King" value={formik.values.name}
                onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="true" required/>
        </div>
        <div className="input-field">
            <div className="title-error">
                <label htmlFor="email">Email</label>
                <p className="error-msg">{formik.touched.email ? formik.errors.email : ""}</p>
            </div>
            <input
                className={`${formik.touched.email && (formik.errors.email || !formik.values.email) ? "border-red" : ""}`}
                id="email" name="email" type="email" placeholder="e.g. stephenking@lorem.com"
                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                autoComplete="true" required/>
        </div>
        <div className="input-field">
            <div className="title-error">
                <label htmlFor="phone">Phone Number</label>
                <p className="error-msg">{formik.touched.phone ? formik.errors.phone : ""}</p>
            </div>
            <input
                className={`${formik.touched.phone && (formik.errors.phone || !formik.values.phone) ? "border-red" : ""}`}
                id="phone" name="phone" type="tel" placeholder="e.g. +1 234 567 890" value={formik.values.phone}
                onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="true" required/>
        </div>
        <div className="btn-container">
            <button type="submit">Next Step</button>
        </div>
    </form>;
}

export default FormStep;