import {useNavigate} from "react-router-dom";
import "../css/thirdStep.css"
import "../css/checkBox.css"
import {useFormik} from "formik";
import {ChangeEvent, useEffect, useState} from "react";



export default function FormThirdStep(title: string, message: string) {
    const [selected, updateSelected] = useState([false, false, false]);

    const navigate = useNavigate();
    const saveData = () => {
        localStorage.setItem("extras", JSON.stringify(selected));
    }

    const [isYearly, setIsYearly] = useState(false);

    useEffect(() => {
        console.log("new page")
        const storedExtras = localStorage.getItem('extras');
        const parsedExtras = storedExtras ? JSON.parse(storedExtras) : [false, false, false];
        updateSelected(parsedExtras);

        const isYearly = localStorage.getItem("isYearly") ?? "false";
        setIsYearly(Boolean(JSON.parse(isYearly)));
        console.log(isYearly);

    }, []);

    const formik = useFormik({
        initialValues: {
            selected: selected,
        },

        onSubmit: () => {
            saveData();
            navigate("/4");
        },
    });
    const goBack = () => {
        saveData();
        navigate("/2");
    }

    const handlePriceSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.value);
        const updatedSelected = [...selected];
        updatedSelected[index] = !updatedSelected[index];
        updateSelected(updatedSelected);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="extra-cards">
                {ExtraCard("Online service", "Access to multiplayer games", isYearly ? "+$10/yr" : "+$1/mo", "0")}
                {ExtraCard("Larger storage", "Extra 1TB of cloud save", isYearly ? "+$20/yr" : "+$2/mo", "1")}
                {ExtraCard("Customizable Profile", "Custom theme on your profile", isYearly ? "+$20/yr" : "+$2/mo", "2")}
            </div>
            <div className="btn-container">
                <button className="back-btn" type="button" onClick={goBack}>Go Back</button>
                <button type="submit">Next Step</button>
            </div>
        </form>
    )

    function ExtraCard(title: string, description: string, price: string, id: string) {
        return (
            <div className={`extra-card ${selected[Number(id)] ? "selected-add-ons" : ""}`}>
                <div className="wrap-checkbox">
                    <input id = {id} value={id} type="checkbox" onChange={handlePriceSelection} checked={selected[Number(id)]}/>
                    <label htmlFor = {id}></label>
                    <div className="name-title">
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <p className="price">{price}</p>
            </div>
        );
    }
}