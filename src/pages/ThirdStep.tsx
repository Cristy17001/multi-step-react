import desktopNavImg from "../assets/images/bg-sidebar-desktop.svg";
import mobileNavImg from "../assets/images/bg-sidebar-mobile.svg";
import steps from "../components/Steps.tsx";
import FormThirdStep from "../components/FormThirdStep.tsx";

function ThirdStep() {
    return (<>
        <div className="mainCard">
            <section className="navSection">
                <img src={desktopNavImg} srcSet={`${mobileNavImg} 820w, ${desktopNavImg}`} alt="navBackImage"/>
                <nav className="stepsNav">
                    <ul>
                        {steps(3)}
                    </ul>
                </nav>
            </section>
            <section className="formSection">
                {FormThirdStep("Pick add-ons", "Add-ons help enhance your gaming experience.")}
            </section>
        </div>
    </>);
}

export default ThirdStep;