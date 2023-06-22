import desktopNavImg from "../assets/images/bg-sidebar-desktop.svg";
import mobileNavImg from "../assets/images/bg-sidebar-mobile.svg";
import steps from "../components/Steps.tsx";
import FormFourthStep from "../components/FormFourthStep.tsx";

function ForthStep() {
    return (<>
        <div className="mainCard">
            <section className="navSection">
                <img src={desktopNavImg} srcSet={`${mobileNavImg} 820w, ${desktopNavImg}`} alt="navBackImage"/>
                <nav className="stepsNav">
                    <ul>
                        {steps(4)}
                    </ul>
                </nav>
            </section>
            <section className="formSection">
                {FormFourthStep("Finishing up", "Double-check everything looks OK before confirming.")}
            </section>
        </div>

    </>);
}

export default ForthStep;