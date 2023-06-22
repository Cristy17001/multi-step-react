import desktopNavImg from "../assets/images/bg-sidebar-desktop.svg";
import mobileNavImg from "../assets/images/bg-sidebar-mobile.svg";
import thankYouIcon from "../assets/images/icon-thank-you.svg";

import steps from "../components/Steps.tsx";
import '../css/App.css';
import '../css/fifthStep.css';


function FifthStep() {
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
                <form className="fifthForm">
                    <img src={thankYouIcon} alt="thank you"/>
                    <h1>Thank you!</h1>
                    <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                </form>
            </section>
        </div>

    </>);
}

export default FifthStep;