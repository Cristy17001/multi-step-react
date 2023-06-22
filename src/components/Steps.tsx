export default function steps(selected: number) {
    const steps = ["Your info", "Select plan", "Add-ons", "Summary"];

    return (<>
        {steps.map((step, index) => (<li key={index}>
            <span className={selected === index + 1 ? "stepSelected" : "stepNormal"}>{index + 1}</span>
            <div className="step-name">
                <p>{`STEP ${index + 1}`}</p>
                <h2>{step}</h2>
            </div>
        </li>))}
    </>);
}
