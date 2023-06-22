import {ChangeEvent, useEffect, useState} from "react";
import "../css/switch.css"
import "../css/secondStep.css"
import arcade from "../assets/images/icon-arcade.svg"
import advanced from "../assets/images/icon-advanced.svg"
import pro from "../assets/images/icon-pro.svg"
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
export default function SecondForm(title: string, message: string) {

    const navigate = useNavigate();


    const saveData = () => {
        localStorage.setItem("isYearly", String(formik.values.isYearly));
        localStorage.setItem("selected", String(formik.values.selected));
    }


    // Load data if exists
    useEffect(() => {
        const selected_data = Number(localStorage.getItem("selected")) ?? 0;
        const isYearly_data = localStorage.getItem("isYearly") ?? "false";



        setSelectedCard(selected_data)
        formik.values.selected = selected_data;

        //Boolean(JSON.parse(isYearly))
        toggleSwitch(prevState => {
            const isYearly = Boolean(JSON.parse(isYearly_data));
            formik.values.isYearly = isYearly;

            const arcadePrice = isYearly ? "$90/yr" : "$9/mo";
            const advancedPrice = isYearly ? "$120/yr" : "$12/mo";
            const proPrice = isYearly ? "$150/yr" : "$15/mo";

            return {
                ...prevState,
                isYearly,
                arcadePrice,
                advancedPrice,
                proPrice
            };
        });

    }, []);

    const [pricing, toggleSwitch] = useState({
        isYearly: false,
        arcadePrice: "$9/mo",
        advancedPrice: "$12/mo",
        proPrice: "$15/mo"
    });

    const formik = useFormik({
        initialValues: {
            isYearly: false,
            selected: 0,
        },

        onSubmit: () => {
            saveData();
            navigate("/3");
        },
    });
    const goBack = () => {
        saveData();
        navigate("/");
    }


    const handleToggle = () => {
        toggleSwitch(prevState => {
            const isYearly = !prevState.isYearly;
            formik.values.isYearly = isYearly;

            const arcadePrice = isYearly ? "$90/yr" : "$9/mo";
            const advancedPrice = isYearly ? "$120/yr" : "$12/mo";
            const proPrice = isYearly ? "$150/yr" : "$15/mo";

            return {
                ...prevState,
                isYearly,
                arcadePrice,
                advancedPrice,
                proPrice
            };
        });
    };

    const [selectedCard, setSelectedCard] = useState(0);

    const handlePriceSelection = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCard(Number(event.target.value));
        formik.values.selected = Number(event.target.value);
        console.log(formik.values.selected)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>{title}</h1>
            <p>{message}</p>

            <div className="price-cards">
                <label>
                    <input className="priceSelect" type="radio" value="0" checked={selectedCard == 0} onChange={handlePriceSelection}/>
                    {PriceCard("Arcade", pricing.arcadePrice, arcade, pricing.isYearly, selectedCard == 0)}
                </label>
                <label>
                    <input className="priceSelect" type="radio" value="1" checked={selectedCard == 1} onChange={handlePriceSelection}/>
                    {PriceCard("Advanced", pricing.advancedPrice, advanced, pricing.isYearly, selectedCard == 1)}
                </label>
                <label>
                    <input className="priceSelect" type="radio" value="2" checked={selectedCard == 2} onChange={handlePriceSelection}/>
                    {PriceCard("Pro", pricing.proPrice, pro, pricing.isYearly, selectedCard == 2)}
                </label>
            </div>
            <div className="switch-card">
                <div className="switch-wrapper">
                    <p className={`${pricing.isYearly ? "" : "selected"}`}>Monthly</p>
                    <label className="switch">
                        <input type="checkbox" checked={pricing.isYearly} onChange={handleToggle}/>
                        <span className="slider"></span>
                    </label>
                    <p className={`${pricing.isYearly ? "selected" : ""}`}>Yearly</p>
                </div>
            </div>



            <div className="btn-container">
                <button className="back-btn" type="button" onClick={goBack}>Go Back</button>
                <button type="submit">Next Step</button>
            </div>
        </form>
    )
}

function PriceCard(title: string, price: string, image: string, isYearly: boolean, selected: boolean) {
    return (
        <div className={`price-card ${selected ? "selected-price" : ""}`}>
            <img src={image} alt=""/>
            <div className="title-price">
                <h2>{title}</h2>
                <p>{price}</p>
                {isYearly ? <p className="free-months">2 months free</p> : ""}
            </div>
        </div>
    )
}

