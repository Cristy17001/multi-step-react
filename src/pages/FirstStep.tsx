import '../css/App.css';
import desktopNavImg from '../assets/images/bg-sidebar-desktop.svg';
import mobileNavImg from '../assets/images/bg-sidebar-mobile.svg';

import formStep from "../components/FormFirstStep.tsx";
import steps from "../components/Steps.tsx";

export default function FirstStep() {
    return (<>
        <div className="mainCard">
            <section className="navSection">
                <img src={desktopNavImg} srcSet={`${mobileNavImg} 820w, ${desktopNavImg}`} alt="navBackImage"/>
                <nav className="stepsNav">
                    <ul>
                        {steps(1)}
                    </ul>
                </nav>
            </section>
            <section className="formSection">
                {formStep("Personal info", "Please provide your name, email address, and phone number.")}
            </section>
        </div>

    </>);
}