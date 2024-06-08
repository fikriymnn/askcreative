import React from 'react'
import CompanyRegistration from '../../CompanyRegistrationCard'
import CompanyRegistrationCard from '../../CompanyRegistrationCard'
function
    FinanceServices() {
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


    const CompanyReg = [
        Card1, Card2,
    ]
    return (
        <>


            {CompanyReg}
        </>
    )
}

export default FinanceServices