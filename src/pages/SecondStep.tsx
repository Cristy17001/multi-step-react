import desktopNavImg from "../assets/images/bg-sidebar-desktop.svg";
import mobileNavImg from "../assets/images/bg-sidebar-mobile.svg";
import steps from "../components/Steps.tsx";
import SecondForm from "../components/FormSecondStep.tsx";

function SecondStep() {
    return (<>
        <div className="mainCard">
            <section className="navSection">
                <img src={desktopNavImg} srcSet={`${mobileNavImg} 820w, ${desktopNavImg}`} alt="navBackImage"/>
                <nav className="stepsNav">
                    <ul>
                        {steps(2)}
                    </ul>
                </nav>
            </section>
            <section className="formSection">
                {SecondForm("Select your plan", "You have the option of monthly or yearly billing.")}
            </section>
        </div>

    </>);
}

export default SecondStep;