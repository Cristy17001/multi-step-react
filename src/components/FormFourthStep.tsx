import {Link, useNavigate} from "react-router-dom";
import "../css/forthStep.css"
import {useEffect, useState} from "react";


export default function FormFourthStep(title: string, message: string) {
    const navigate = useNavigate();

    const data = {
        plans: [
            {name: "Arcade", price_month: "+$9/mo", price_year: "+$90/yr"},
            {name: "Advanced", price_month: "+$12/mo", price_year: "+$120/yr"},
            {name: "Pro", price_month: "+$15/mo", price_year: "+$150/yr"}
        ],

        services: [
            {serviceType: "Online service", price_month: "+$1/mo", price_year: "+$10/yr"},
            {serviceType: "Larger storage", price_month: "+$2/mo", price_year: "+$20/yr"},
            {serviceType: "Customizable Profile", price_month: "+$2/mo", price_year: "+$20/yr"},]
    };
    function price_parser(price: string) {
        return parseInt(price.match(/\d+/)?.[0] || "0");
    }

    function calculate_total() {
        let total = 0;
        if (passedData.isYearly) {
            total += price_parser(data.plans[passedData.selected].price_year);
            for (let i = 0; i < passedData.parsedExtras.length; i++) {
                if (passedData.parsedExtras[i]) {
                    total += price_parser(data.services[i].price_year);
                }
            }
        }
        else {
            total += price_parser(data.plans[passedData.selected].price_month);
            for (let i = 0; i < passedData.parsedExtras.length; i++) {
                if (passedData.parsedExtras[i]) {
                    total += price_parser(data.services[i].price_month);
                }
            }

        }
        return total;
    }

    function handleSubmit() {
        localStorage.clear();
        navigate("/5");
    }

    const [passedData, setPassedData] = useState({
        selected: 0,
        isYearly: false,
        parsedExtras: [false, false, false]
    });

// Load data if exists
    useEffect(() => {
        const selected = Number(localStorage.getItem("selected")) || 0;

        const isYearly_data = localStorage.getItem("isYearly") || "false";
        const isYearly = JSON.parse(isYearly_data);

        const storedExtras = localStorage.getItem('extras');
        const parsedExtras = storedExtras ? JSON.parse(storedExtras) : [false, false, false];

        setPassedData(prevState => ({
            ...prevState,
            selected,
            isYearly,
            parsedExtras
        }));

    }, []);


    const goBack = () => {navigate("/3");}
    return (
        <form onSubmit={handleSubmit}>
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="summary-container">
                <div className="summary">
                    <div className="main-price">
                        <div>
                            <p><b>{`${data.plans[passedData.selected].name} ${passedData.isYearly ? "(Yearly)" : "(Monthly)"}`}</b></p>
                            <Link to={"/2"}>change</Link>
                        </div>
                        <p><b className="price">{passedData.isYearly ? data.plans[passedData.selected].price_year : data.plans[passedData.selected].price_month}</b></p>
                    </div>
                    <p className="total-main-price"></p>
                    <hr></hr>

                    {passedData.parsedExtras.map((extra, index) => {
                        if (extra) {
                            return (
                                <div className="extras-price" key={index}>
                                    <p>{data.services[index].serviceType}</p>
                                    <p>
                                        <span className="extra-price">{passedData.isYearly ? data.services[index].price_year : data.services[index].price_month}</span>
                                    </p>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="total-price">
                    <p>{`Total${passedData.isYearly ? "(per year)" : "(per month)"}`}</p>
                    <p><b>{`$${String(calculate_total())}/${passedData.isYearly ? "yr":"mo"}`}</b></p>
                </div>
            </div>
            <div className="btn-container">
                <button className="back-btn" type="button" onClick={goBack}>Go Back</button>
                <button className="confirm-btn" type="submit">Confirm</button>
            </div>
        </form>
    )
}
