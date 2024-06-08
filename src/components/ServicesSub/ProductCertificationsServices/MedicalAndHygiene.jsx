import React from 'react'
import CompanyRegistration from '../../CompanyRegistrationCard'
import CompanyRegistrationCard from '../../CompanyRegistrationCard'
function MedicalAndHygiene() {
    const Card1 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"Company Registration Basic Regulation"}
            price={
                "3000-2000"
            } />
    );
    const Card2 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"dakjnlk Basic Regulation"}
            price={
                "2000-2000"
            } />
    );
    const Card3 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"Company Registration Basic Regulation Company Registration Basic RegulationCompany Registration Basic RegulationCompany Registration Basic Regulation"}
            price={
                "2000-2000"
            } />
    );
    const Card4 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"Company Registration Basic Regulation"}
            price={
                "2000-2000"
            } />
    );

    const Card5 = (

        <CompanyRegistrationCard src={"/foto.jpg"}
            title={"Company Registration Basic Regulation"}
            price={
                "2000-2000"
            } />
    );

    const CompanyReg = [
        Card1, Card2, Card3, Card4, Card5
    ]
    return (
        <>


            {CompanyReg}
        </>
    )
}

export default MedicalAndHygiene