import React from 'react';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import { TournamentCreationStepperStyled, TournamentCreationStepLabelStyled } from '../../style/styledTournament';
import { ColorlibStepIcon } from './StepperBullets';

function getSteps() {
    return ['Informacje o turnieju', 'Informacje o meczach', 'Lokalizacja turnieju', 'Podsumowanie'];
}

export default function VerticalStepper({ getStepContent }) {

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleSetStep = (step) => {
        setActiveStep(step);
    }

    return (
        <>
            <TournamentCreationStepperStyled activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => { handleSetStep(index) }}>
                            <TournamentCreationStepLabelStyled>
                                {label}
                            </TournamentCreationStepLabelStyled>
                        </StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                        </StepContent>
                    </Step>
                ))}
            </TournamentCreationStepperStyled>
        </>
    );
}